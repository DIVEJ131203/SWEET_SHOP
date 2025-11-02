import { useCart } from '../context/CartContext';

const CartIcon = ({ onClick }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors"
      title="Shopping Cart"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
};

export default CartIcon;