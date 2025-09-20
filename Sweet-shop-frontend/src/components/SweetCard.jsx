const SweetCard = ({ sweet, onAction, actionLabel }) => {
  return (
    <div className="border p-4 rounded shadow bg-white text-center">
      <img
        src={sweet.image}
        alt={sweet.name}
        className="h-32 w-full object-cover rounded"
      />
      <h3 className="font-bold mt-2 text-lg">{sweet.name}</h3>
      <p className="text-gray-600">{sweet.category}</p>
      <p className="text-pink-600 font-semibold">₹{sweet.price}</p>
      <p>Stock: {sweet.quantity}</p>
      {onAction && (
        <button
          onClick={() => onAction(sweet._id)}
          className="mt-3 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default SweetCard;
