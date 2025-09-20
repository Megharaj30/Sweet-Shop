import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-lg">
        Sweet Shop
      </Link>

      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}

        {user && user.role === "customer" && (
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        )}

        {user && user.role === "admin" && (
          <Link to="/admin" className="hover:underline">
            Admin Panel
          </Link>
        )}

        {user && (
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
