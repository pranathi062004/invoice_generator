import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="p-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h2>

        <p className="text-gray-600 mt-2">
          Manage your clients and invoices from here.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* CLIENTS CARD */}
          <div
            onClick={() => navigate("/clients")}
            className="bg-white p-6 rounded shadow cursor-pointer hover:shadow-lg hover:bg-gray-50 transition"
          >
            <h3 className="font-semibold text-lg">Clients</h3>
            <p className="text-gray-500 mt-1">
              Add and manage your clients.
            </p>
          </div>

          {/* INVOICES CARD */}
          <div
            onClick={() => navigate("/invoices")}
            className="bg-white p-6 rounded shadow cursor-pointer hover:shadow-lg hover:bg-gray-50 transition"
          >
            <h3 className="font-semibold text-lg">Invoices</h3>
            <p className="text-gray-500 mt-1">
              Create, send, and track invoices.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
