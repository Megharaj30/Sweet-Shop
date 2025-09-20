import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AdminPanel() {
  const { user } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [editingSweet, setEditingSweet] = useState(null);
  const [form, setForm] = useState({ name: "", category: "", price: "", quantity: "" });
  const [newSweet, setNewSweet] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sweets", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setSweets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Add new sweet
  const handleAddSweet = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/sweets", newSweet, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setNewSweet({ name: "", category: "", price: "", quantity: "", description: "", image: "" });
      fetchInventory();
    } catch (err) {
      alert(err.response?.data?.message || "Add Sweet failed");
    }
  };

  // ✅ Edit sweet
  const handleEditClick = (sweet) => {
    setEditingSweet(sweet._id);
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/sweets/${id}`,
        { ...form },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setEditingSweet(null);
      fetchInventory();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  // ✅ Delete sweet
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/sweets/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      fetchInventory();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* ✅ Add Sweet Form */}
      <form
        onSubmit={handleAddSweet}
        className="bg-white shadow-md rounded-lg p-4 mb-6 space-y-3"
      >
        <h2 className="text-xl font-semibold mb-2">Add New Sweet</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newSweet.name}
            onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={newSweet.category}
            onChange={(e) => setNewSweet({ ...newSweet, category: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newSweet.price}
            onChange={(e) => setNewSweet({ ...newSweet, price: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newSweet.quantity}
            onChange={(e) => setNewSweet({ ...newSweet, quantity: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newSweet.image}
            onChange={(e) => setNewSweet({ ...newSweet, image: e.target.value })}
            className="border p-2 rounded col-span-2"
          />
          <textarea
            placeholder="Description"
            value={newSweet.description}
            onChange={(e) => setNewSweet({ ...newSweet, description: e.target.value })}
            className="border p-2 rounded col-span-2"
          />
        </div>
        <button
          type="submit"
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Sweet
        </button>
      </form>

      {/* ✅ Inventory Table */}
      <table className="w-full border-collapse bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Quantity</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sweets.map((sweet) => (
            <tr key={sweet._id} className="border-b hover:bg-gray-50">
              {editingSweet === sweet._id ? (
                <>
                  <td className="p-3">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleUpdate(sweet._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingSweet(null)}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-3">{sweet.name}</td>
                  <td className="p-3">{sweet.category}</td>
                  <td className="p-3">₹{sweet.price}</td>
                  <td className="p-3">{sweet.quantity}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEditClick(sweet)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sweet._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
