import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login.jsx";
import { AuthProvider } from "./AuthContext.jsx";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then((reg) => {
      console.log("Service worker registered:", reg);

      // 🔁 Auto-refresh on new SW version
      reg.onupdatefound = () => {
        const newWorker = reg.installing;
        newWorker.onstatechange = () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            window.location.reload();
          }
        };
      };
    });
  });
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
