import mongoose from 'mongoose';

const sweetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a sweet name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Chocolate', 'Gummies', 'Lollipops', 'Fudge', 'Hard Candy', 'Cookies', 'Cakes', 'Ice Cream', 'Other']
  },
  quantity: {
    type: Number,
    required: [true, 'Please add quantity in stock'],
    min: [0, 'Quantity cannot be negative'],
    default: 0
  },
  emoji: {
    type: String,
    default: '🍬'
  },
  imageUrl: {
    type: String,
    default: ''
  },
  imageFromUrl: {
    type: String,
    default: ''
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  averageRating: {
    type: Number,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search
sweetSchema.index({ name: 'text', description: 'text' });

export default mongoose.model('Sweet', sweetSchema);