import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CandidateDashboardPage from "./pages/candidate/CandidateDashboardPage";
import ProfilePage from "./pages/candidate/ProfilePage";
import CommanderDashboardPage from "./pages/commander/CommanderDashboardPage";
import MedicalOfficerDashboardPage from "./pages/medical/MedicalOfficerDashboardPage";

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
    element: <CandidateDashboardPage />,
  },
  {
  path: "/candidate/profile",
  element: <ProfilePage />,
},
{
  path: "/commander",
  element: <CommanderDashboardPage />,
},
{
  path: "/medical",
  element: <MedicalOfficerDashboardPage />,
},
]);