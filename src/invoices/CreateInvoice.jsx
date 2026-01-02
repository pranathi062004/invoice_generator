import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CreateInvoice() {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("draft");
  const [items, setItems] = useState([
    { description: "", quantity: "", price: "" }
  ]);

  const navigate = useNavigate();

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

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: "", price: "" }]);
  };

  const removeItem = (index) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.price) || 0;
    return sum + qty * price;
  }, 0);

  const saveInvoice = async () => {
    if (!clientId) return alert("Select a client");

    const client = clients.find(c => c.id === clientId);

    await addDoc(collection(db, "invoices"), {
      clientId,
      clientName: client.name,
      items,
      subtotal,
      total: subtotal,
      status,
      userId: auth.currentUser.uid,
      createdAt: new Date()
    });

    navigate("/invoices");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Create Invoice</h2>

        {/* CLIENT */}
        <select
          className="border p-2 rounded w-full mb-4"
          value={clientId}
          onChange={e => setClientId(e.target.value)}
        >
          <option value="">Select Client</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {/* STATUS */}
        <select
          className="border p-2 rounded w-full mb-6"
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
        </select>

        {/* ITEMS */}
        <h3 className="font-semibold mb-2">Line Items</h3>

        {items.map((item, i) => (
          <div key={i} className="flex gap-2 mb-2 items-center">
            <input
              className="border p-2 flex-1 rounded"
              placeholder="Item description"
              value={item.description}
              onChange={e => updateItem(i, "description", e.target.value)}
            />

            <input
              className="border p-2 w-20 rounded"
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={e => updateItem(i, "quantity", e.target.value)}
            />

            <input
              className="border p-2 w-24 rounded"
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={e => updateItem(i, "price", e.target.value)}
            />

            <button
              onClick={() => removeItem(i)}
              className="text-red-500 font-bold px-2"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={addItem}
          className="text-blue-600 text-sm mt-2"
        >
          + Add Item
        </button>

        <p className="mt-6 text-lg font-semibold">
          Subtotal: ₹{subtotal}
        </p>

        <button
          onClick={saveInvoice}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Invoice
        </button>
      </div>
    </>
  );
}
