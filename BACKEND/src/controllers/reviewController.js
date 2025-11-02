import Review from '../models/Review.js';
import Sweet from '../models/Sweet.js';

export const createReview = async (req, res) => {
  try {
    const { sweet, rating, comment } = req.body;
    const sweetId = sweet;

    const sweetDoc = await Sweet.findById(sweetId);
    if (!sweetDoc) {
      return res.status(404).json({ 
        success: false, 
        message: 'Sweet not found' 
      });
    }

    // Check if user already reviewed this sweet
    const existingReview = await Review.findOne({ 
      user: req.user.id, 
      sweet: sweetId 
    });

    if (existingReview) {
      return res.status(400).json({ 
        success: false, 
        message: 'You have already reviewed this sweet' 
      });
    }

    const review = await Review.create({
      user: req.user.id,
      sweet: sweetId,
      rating,
      comment
    });

    // Update sweet rating
    await updateSweetRating(sweetId);

    await review.populate('user', 'name');

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { sweetId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ sweet: sweetId, isApproved: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name');

    const total = await Review.countDocuments({ sweet: sweetId, isApproved: true });

    res.status(200).json({
      success: true,
      data: reviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findOne({ _id: id, user: req.user.id });
    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: 'Review not found' 
      });
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();

    // Update sweet rating
    await updateSweetRating(review.sweet);

    await review.populate('user', 'name');

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findOne({ _id: id, user: req.user.id });
    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: 'Review not found' 
      });
    }

    const sweetId = review.sweet;
    await Review.findByIdAndDelete(id);

    // Update sweet rating
    await updateSweetRating(sweetId);

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Helper function to update sweet rating
const updateSweetRating = async (sweetId) => {
  const reviews = await Review.find({ sweet: sweetId, isApproved: true });
  
  if (reviews.length === 0) {
    await Sweet.findByIdAndUpdate(sweetId, {
      averageRating: 0,
      reviewCount: 0
    });
    return;
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  await Sweet.findByIdAndUpdate(sweetId, {
    averageRating: Math.round(averageRating * 10) / 10,
    reviewCount: reviews.length
  });
};

// Admin functions
export const getAllReviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name email')
      .populate('sweet', 'name');

    const total = await Review.countDocuments();

    res.status(200).json({
      success: true,
      data: reviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const approveReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;

    const review = await Review.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true }
    ).populate('user', 'name').populate('sweet', 'name');

    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: 'Review not found' 
      });
    }

    // Update sweet rating if approved/disapproved
    await updateSweetRating(review.sweet._id);

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};