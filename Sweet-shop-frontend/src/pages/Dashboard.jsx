import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [cart, setCart] = useState([]); // for bill section

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    const res = await axios.get("http://localhost:5000/api/sweets", {
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    setSweets(res.data);
  };

  const handlePurchase = async (sweet) => {
    try {
      await axios.post(
        "http://localhost:5000/api/inventory/purchase",
        { sweetId: sweet._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );

      // Add to bill/cart
      setCart((prev) => {
        const existing = prev.find((item) => item._id === sweet._id);
        if (existing) {
          return prev.map((item) =>
            item._id === sweet._id
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        }
        return [...prev, { ...sweet, qty: 1 }];
      });

      fetchSweets(); // refresh inventory
    } catch (err) {
      alert(err.response?.data?.message || "Error purchasing sweet");
    }
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="p-6 space-y-10">
      {/* Sweets Table */}
      <div>
        <h1 className="text-3xl font-bold mb-4">Available Sweets</h1>
        <table className="w-full border-collapse bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {sweets.map((sweet) => (
              <tr key={sweet._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{sweet.name}</td>
                <td className="p-3">{sweet.category}</td>
                <td className="p-3">₹{sweet.price}</td>
                <td className="p-3">
                  {sweet.quantity > 0 ? sweet.quantity : "Out of Stock"}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handlePurchase(sweet)}
                    disabled={sweet.quantity <= 0}
                    className={`px-4 py-1 rounded text-white ${
                      sweet.quantity <= 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    Buy
                  </button>
                </td>
              </tr>
            ))}
            {sweets.length === 0 && (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No sweets available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bill Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Bill</h2>
        {cart.length === 0 ? (
          <p>No items purchased yet.</p>
        ) : (
          <div className="bg-white p-4 rounded shadow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Item</th>
                  <th className="p-2 text-left">Qty</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">₹{item.price}</td>
                    <td className="p-2">₹{item.price * item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-right font-bold mt-3">
              Grand Total: ₹{totalAmount}
            </p>
          </div>
        )}
      </div>

      {/* Note Section */}
      <div className="bg-yellow-100 p-4 rounded shadow">
        <h3 className="font-bold">Note:</h3>
        <p className="text-sm text-gray-700">
          - Once purchased, items cannot be returned.<br />
          - Please ensure availability before ordering in bulk.<br />
          - For any queries, contact our support team.
        </p>
      </div>
    </div>
  );
}
