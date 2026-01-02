import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AddClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "clients"), {
      name,
      email,
      phone,
      address,
      userId: auth.currentUser.uid,
      createdAt: new Date()
    });
    navigate("/clients");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Add Client</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="w-full border p-2 rounded" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="w-full border p-2 rounded" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
          <input className="w-full border p-2 rounded" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save Client
          </button>
        </form>
      </div>
    </>
  );
}
