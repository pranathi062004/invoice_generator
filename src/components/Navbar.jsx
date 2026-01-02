import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Invoice Generator</h1>

      <div className="space-x-6">
        <Link to="/dashboard" className="hover:text-gray-300">
          Dashboard
        </Link>
        <Link to="/clients" className="hover:text-gray-300">
          Clients
        </Link>
        <Link to="/invoices" className="hover:text-gray-300">
          Invoices
        </Link>
        <button
          onClick={logout}
          className="text-red-400 hover:text-red-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
