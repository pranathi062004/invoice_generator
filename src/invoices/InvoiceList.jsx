import { useEffect, useState } from "react";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import jsPDF from "jspdf";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchInvoices = async () => {
    const q = query(
      collection(db, "invoices"),
      where("userId", "==", auth.currentUser.uid)
    );
    const snapshot = await getDocs(q);
    setInvoices(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const markPaid = async (id) => {
    await updateDoc(doc(db, "invoices", id), { status: "paid" });
    fetchInvoices();
  };

  const downloadPDF = (inv) => {
    const pdf = new jsPDF();
    pdf.text("Invoice", 20, 20);
    pdf.text(`Client: ${inv.clientName}`, 20, 40);
    pdf.text(`Status: ${inv.status}`, 20, 50);
    pdf.text(`Total: ₹${inv.total}`, 20, 60);

    let y = 80;
    inv.items.forEach((it, i) => {
      pdf.text(
        `${i + 1}. ${it.description} - ${it.quantity} x ₹${it.price}`,
        20,
        y
      );
      y += 10;
    });

    pdf.save(`invoice-${inv.id}.pdf`);
  };

  const visibleInvoices =
    filter === "all"
      ? invoices
      : invoices.filter(i => i.status === filter);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Invoices</h2>
          <Link to="/invoices/new" className="bg-blue-600 text-white px-4 py-2 rounded">
            Create Invoice
          </Link>
        </div>

        {/* FILTER */}
        <select
          className="border p-2 rounded mb-4"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
        </select>

        <div className="space-y-4">
          {visibleInvoices.map(inv => (
            <div key={inv.id} className="bg-white p-4 rounded shadow flex justify-between">
              <div>
                <p className="font-semibold">{inv.clientName}</p>
                <p className="text-sm text-gray-500">
                  ₹{inv.total} • {inv.status}
                </p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => downloadPDF(inv)}
                  className="bg-gray-700 text-white px-3 py-1 rounded"
                >
                  PDF
                </button>

                {inv.status !== "paid" && (
                  <button
                    onClick={() => markPaid(inv.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Mark Paid
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
