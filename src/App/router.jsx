import { Routes, Route } from "react-router-dom";

/* Auth */
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import ProtectedRoute from "../auth/ProtectedRoute";

/* Pages */
import Dashboard from "./Dashboard";

/* Clients */
import ClientsList from "../clients/ClientsList";
import AddClient from "../clients/AddClient";

/* Invoices */
import InvoiceList from "../invoices/InvoiceList";
import CreateInvoice from "../invoices/CreateInvoice";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/clients"
        element={
          <ProtectedRoute>
            <ClientsList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/clients/new"
        element={
          <ProtectedRoute>
            <AddClient />
          </ProtectedRoute>
        }
      />

      <Route
        path="/invoices"
        element={
          <ProtectedRoute>
            <InvoiceList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/invoices/new"
        element={
          <ProtectedRoute>
            <CreateInvoice />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
