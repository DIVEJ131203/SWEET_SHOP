import { useState } from 'react';

const AddSweetModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Chocolate',
    emoji: '🍬',
    imageUrl: '',
    stock: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['Chocolate', 'Gummies', 'Lollipops', 'Fudge', 'Hard Candy', 'Cookies', 'Cakes', 'Ice Cream', 'Other'];
  const emojis = ['🍬', '🍭', '🍫', '🧁', '🍪', '🎂', '🍰', '🍩', '🍯', '🍮'];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData({ ...formData, imageUrl: '' }); // Clear URL when file is selected
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('price', parseFloat(formData.price));
      submitData.append('category', formData.category);
      submitData.append('emoji', formData.emoji);
      submitData.append('quantity', parseInt(formData.stock));
      
      if (selectedFile) {
        submitData.append('image', selectedFile);
      } else if (formData.imageUrl) {
        submitData.append('imageFromUrl', formData.imageUrl);
      }

      const token = localStorage.getItem('sweetShopToken');
      const response = await fetch('http://localhost:5000/api/sweets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      });

      if (response.ok) {
        onSuccess(); // This should trigger fetchSweets in Dashboard
        onClose();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create sweet');
      }
    } catch (error) {
      console.error('Add sweet error:', error);
      alert(error.message || 'Failed to add sweet');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Sweet</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Emoji</label>
            <div className="grid grid-cols-5 gap-2 mb-2">
              {emojis.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({...formData, emoji})}
                  className={`p-2 text-2xl border rounded-lg hover:bg-gray-100 ${
                    formData.emoji === emoji ? 'border-purple-500 bg-purple-50' : ''
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image (Optional)</label>
            
            {/* File Upload */}
            <div className="mb-3">
              <label className="block text-xs text-gray-600 mb-1">Upload Image File</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* URL Input */}
            <div className="mb-3">
              <label className="block text-xs text-gray-600 mb-1">Or Enter Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                disabled={selectedFile !== null}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
              />
            </div>

            {/* Image Preview */}
            {(imagePreview || formData.imageUrl) && (
              <div className="mt-2">
                <img
                  src={imagePreview || formData.imageUrl}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg border"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setImagePreview('');
                    setFormData({ ...formData, imageUrl: '' });
                  }}
                  className="ml-2 text-xs text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Sweet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSweetModal;