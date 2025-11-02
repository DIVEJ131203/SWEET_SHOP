import mongoose from 'mongoose';
import request from 'supertest';
import Sweet from '../models/Sweet.js';
import User from '../models/User.js';
import server from '../server.js';

describe('Sweet Endpoints', () => {
  let adminToken;
  let userToken;
  let sweetId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Create admin user
    const adminRes = await request(server)
      .post('/api/auth/register')
      .send({
        name: 'Admin User',
        email: 'admin@test.com',
        password: 'admin123',
        role: 'admin'
      });
    adminToken = adminRes.body.data.token;

    // Create regular user
    const userRes = await request(server)
      .post('/api/auth/register')
      .send({
        name: 'Regular User',
        email: 'user@test.com',
        password: 'user123',
        role: 'user'
      });
    userToken = userRes.body.data.token;
  });

  afterAll(async () => {
    await Sweet.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
    server.close();
  });

  describe('POST /api/sweets', () => {
    it('should create a sweet as admin', async () => {
      const res = await request(server)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Chocolate Bar',
          category: 'Chocolate',
          price: 2.99,
          quantity: 50,
          description: 'Delicious chocolate'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Chocolate Bar');
      sweetId = res.body.data._id;
    });

    it('should create sweet as regular user', async () => {
      const res = await request(server)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Gummy Bears',
          category: 'Gummies',
          price: 1.99,
          quantity: 100,
          description: 'Delicious gummy bears'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
    });
  });

  describe('GET /api/sweets', () => {
    it('should get all sweets', async () => {
      const res = await request(server)
        .get('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /api/sweets/search', () => {
    it('should search sweets by name', async () => {
      const res = await request(server)
        .get('/api/sweets/search?name=Chocolate')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('PUT /api/sweets/:id', () => {
    it('should update sweet as admin', async () => {
      const res = await request(server)
        .put(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          price: 3.99
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.price).toBe(3.99);
    });
  });

  describe('POST /api/sweets/:id/purchase', () => {
    it('should purchase a sweet', async () => {
      const res = await request(server)
        .post(`/api/sweets/${sweetId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.quantity).toBe(49);
    });

    it('should not purchase out of stock sweet', async () => {
      // Set quantity to 0
      await Sweet.findByIdAndUpdate(sweetId, { quantity: 0 });

      const res = await request(server)
        .post(`/api/sweets/${sweetId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/sweets/:id/restock', () => {
    it('should restock sweet as admin', async () => {
      const res = await request(server)
        .post(`/api/sweets/${sweetId}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ quantity: 25 });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.quantity).toBe(25);
    });

    it('should not restock as regular user', async () => {
      const res = await request(server)
        .post(`/api/sweets/${sweetId}/restock`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 10 });

      expect(res.statusCode).toBe(403);
      expect(res.body.success).toBe(false);
    });
  });

  describe('DELETE /api/sweets/:id', () => {
    it('should delete sweet as admin', async () => {
      const res = await request(server)
        .delete(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should not delete sweet created by another user', async () => {
      // Create another sweet with admin as seller
      const adminUser = await User.findOne({ email: 'admin@test.com' });
      const sweet = await Sweet.create({
        name: 'Test Sweet',
        category: 'Other',
        price: 1.99,
        quantity: 10,
        description: 'Test sweet',
        seller: adminUser._id
      });

      const res = await request(server)
        .delete(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toBe(403);
      expect(res.body.success).toBe(false);
    });
  });
});
