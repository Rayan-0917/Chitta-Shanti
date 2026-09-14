import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import CandidateDashboardPage from "./pages/candidate/CandidateDashboardPage";
import ProfilePage from "./pages/candidate/ProfilePage";

import CommanderDashboardPage from "./pages/commander/CommanderDashboardPage";
import MedicalOfficerDashboardPage from "./pages/medical/MedicalOfficerDashboardPage";

import RoleRoute from "./routes/RoleRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/candidate",
    element: (
      <RoleRoute allowedRole="candidate">
        <CandidateDashboardPage />
      </RoleRoute>
    ),
  },

  {
    path: "/candidate/profile",
    element: (
      <RoleRoute allowedRole="candidate">
        <ProfilePage />
      </RoleRoute>
    ),
  },

  {
    path: "/commander",
    element: (
      <RoleRoute allowedRole="commander">
        <CommanderDashboardPage />
      </RoleRoute>
    ),
  },

  {
    path: "/medical",
    element: (
      <RoleRoute allowedRole="medical_officer">
        <MedicalOfficerDashboardPage />
      </RoleRoute>
    ),
  },
]);