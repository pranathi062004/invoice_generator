import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ClientsList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const q = query(
        collection(db, "clients"),
        where("userId", "==", auth.currentUser.uid)
      );
      const snapshot = await getDocs(q);
      setClients(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    fetchClients();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Clients</h2>
          <Link to="/clients/new" className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Client
          </Link>
        </div>

        <div className="space-y-4">
          {clients.map(c => (
            <div key={c.id} className="bg-white p-4 rounded shadow">
              <p className="font-semibold">{c.name}</p>
              <p className="text-sm text-gray-500">{c.email}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
