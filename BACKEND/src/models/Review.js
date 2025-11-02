import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sweet',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 500
  },
  isApproved: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Ensure one review per user per sweet
reviewSchema.index({ user: 1, sweet: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);