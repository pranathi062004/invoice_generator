import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // 🔄 Still checking auth
  if (user === undefined) {
    return <p>Loading...</p>;
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/" />;
  }

  // ✅ Logged in
  return children;
}
