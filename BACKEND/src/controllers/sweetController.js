import fs from 'fs';
import path from 'path';
import Sweet from '../models/Sweet.js';

// Get all sweets
export const getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find()
      .populate('seller', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: sweets.length,
      data: sweets
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Search sweets with filters
export const searchSweets = async (req, res) => {
  try {
    const { 
      name, 
      category, 
      minPrice, 
      maxPrice, 
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    // Build query
    let query = {};
    
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    
    if (category) {
      query.category = category;
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Build sort object
    const sortObj = {};
    sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const sweets = await Sweet.find(query)
      .populate('seller', 'name email')
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum);

    const total = await Sweet.countDocuments(query);
    const pages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      count: sweets.length,
      data: sweets,
      pagination: {
        page: pageNum,
        pages,
        total,
        limit: limitNum
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get sweet by ID
export const getSweetById = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id)
      .populate('seller', 'name email');
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }
    res.status(200).json({
      success: true,
      data: sweet
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get my products (seller's products)
export const getMyProducts = async (req, res) => {
  try {
    const sweets = await Sweet.find({ seller: req.user.id })
      .populate('seller', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: sweets.length,
      data: sweets
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Create sweet
export const createSweet = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('User:', req.user);
    
    const sweetData = {
      ...req.body,
      seller: req.user.id
    };

    // Handle image upload or URL
    if (req.file) {
      sweetData.imageUrl = `/uploads/sweets/${req.file.filename}`;
      sweetData.imageFromUrl = ''; // Clear URL if file uploaded
    } else if (req.body.imageFromUrl) {
      sweetData.imageFromUrl = req.body.imageFromUrl;
      sweetData.imageUrl = ''; // Clear file path if URL provided
    }

    const sweet = await Sweet.create(sweetData);
    const populatedSweet = await Sweet.findById(sweet._id).populate('seller', 'name email');
    
    res.status(201).json({
      success: true,
      data: populatedSweet
    });
  } catch (error) {
    console.error('Create sweet error:', error);
    // Clean up uploaded file if sweet creation fails
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update sweet
export const updateSweet = async (req, res) => {
  try {
    const existingSweet = await Sweet.findById(req.params.id);
    
    if (!existingSweet) {
      return res.status(404).json({ 
        success: false, 
        message: 'Sweet not found' 
      });
    }

    // Check ownership
    if (existingSweet.seller.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'You can only edit sweets that you created' 
      });
    }

    const updateData = { ...req.body };

    // Handle image upload or URL
    if (req.file) {
      // Delete old image if exists
      if (existingSweet.imageUrl) {
        const oldImagePath = path.join(process.cwd(), 'uploads', 'sweets', path.basename(existingSweet.imageUrl));
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error('Error deleting old image:', err);
        });
      }
      updateData.imageUrl = `/uploads/sweets/${req.file.filename}`;
      updateData.imageFromUrl = ''; // Clear URL when file uploaded
      updateData.emoji = ''; // Clear emoji when image is uploaded
    } else if (req.body.imageFromUrl) {
      // Delete old uploaded image if switching to URL
      if (existingSweet.imageUrl) {
        const oldImagePath = path.join(process.cwd(), 'uploads', 'sweets', path.basename(existingSweet.imageUrl));
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error('Error deleting old image:', err);
        });
      }
      updateData.imageFromUrl = req.body.imageFromUrl;
      updateData.imageUrl = ''; // Clear file path when URL provided
      updateData.emoji = ''; // Clear emoji when image URL is provided
    }

    // Handle emoji selection (remove image)
    if (req.body.removeImage === 'true') {
      if (existingSweet.imageUrl) {
        const oldImagePath = path.join(process.cwd(), 'uploads', 'sweets', path.basename(existingSweet.imageUrl));
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error('Error deleting old image:', err);
        });
      }
      updateData.imageUrl = '';
      updateData.imageFromUrl = '';
    }

    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('seller', 'name email');

    res.status(200).json({
      success: true,
      data: sweet
    });
  } catch (error) {
    // Clean up uploaded file if update fails
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Delete sweet
export const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    
    if (!sweet) {
      return res.status(404).json({ 
        success: false, 
        message: 'Sweet not found' 
      });
    }

    // Check ownership
    if (sweet.seller.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'You can only delete sweets that you created' 
      });
    }

    // Delete image file if exists
    if (sweet.imageUrl) {
      const imagePath = path.join(process.cwd(), 'uploads', 'sweets', path.basename(sweet.imageUrl));
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting image:', err);
      });
    }

    await Sweet.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Sweet deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Purchase sweet (decrease quantity)
export const purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    
    if (!sweet) {
      return res.status(404).json({ 
        success: false, 
        message: 'Sweet not found' 
      });
    }

    if (sweet.quantity <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Sweet is out of stock' 
      });
    }

    // Decrease quantity by 1
    sweet.quantity -= 1;
    await sweet.save();

    const updatedSweet = await Sweet.findById(sweet._id).populate('seller', 'name email');
    
    res.status(200).json({
      success: true,
      message: 'Sweet purchased successfully',
      data: updatedSweet
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Restock sweet (Admin only)
export const restockSweet = async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid quantity' 
      });
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Only admins can restock sweets' 
      });
    }

    const sweet = await Sweet.findById(req.params.id);
    
    if (!sweet) {
      return res.status(404).json({ 
        success: false, 
        message: 'Sweet not found' 
      });
    }

    // Add to existing quantity (restock adds to current stock)
    sweet.quantity += parseInt(quantity);
    await sweet.save();

    const updatedSweet = await Sweet.findById(sweet._id).populate('seller', 'name email');
    
    res.status(200).json({
      success: true,
      message: 'Sweet restocked successfully',
      data: updatedSweet
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get low stock items (Admin only)
export const getLowStockItems = async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 10;
    
    const lowStockItems = await Sweet.find({ 
      quantity: { $lte: threshold } 
    })
    .populate('seller', 'name email')
    .sort({ quantity: 1 }); // Sort by quantity ascending (lowest first)

    res.status(200).json({
      success: true,
      count: lowStockItems.length,
      data: lowStockItems
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};