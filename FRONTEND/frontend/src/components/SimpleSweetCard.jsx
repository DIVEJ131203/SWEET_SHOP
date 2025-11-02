
const SimpleSweetCard = ({ sweet, isAdmin, onPurchase, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="text-6xl text-center mb-4">{sweet.image}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{sweet.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{sweet.category}</p>
      {sweet.description && (
        <p className="text-sm text-gray-500 mb-3">{sweet.description}</p>
      )}
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-purple-600">${sweet.price}</span>
        <span className={`px-3 py-1 rounded-full text-sm ${
          sweet.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          Stock: {sweet.quantity}
        </span>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => onPurchase(sweet._id)}
          disabled={sweet.quantity === 0}
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
        </button>

        {isAdmin && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(sweet)}
              className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(sweet._id)}
              className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleSweetCard;