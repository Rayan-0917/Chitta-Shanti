import { Navigate } from "react-router-dom";

export default function RoleRoute({ allowedRole, children }) {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    switch (role) {
      case "candidate":
        return <Navigate to="/candidate" replace />;

      case "commander":
        return <Navigate to="/commander" replace />;

      case "medical_officer":
        return <Navigate to="/medical" replace />;

      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
}