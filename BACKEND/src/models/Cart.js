import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  sweet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Sweet',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  price: {
    type: Number,
    required: true
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  totalAmount: {
    type: Number,
    default: 0
  },
  totalItems: {
    type: Number,
    default: 0
  },
  coupon: {
    code: String,
    discount: Number
  }
}, {
  timestamps: true
});

// Calculate totals before saving
cartSchema.pre('save', function(next) {
  this.totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
  this.totalAmount = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  next();
});

export default mongoose.model('Cart', cartSchema);