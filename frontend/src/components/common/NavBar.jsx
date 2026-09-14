import {
  ClipboardList,
  LogOut,
  ShieldCheck,
  UserRound,
  Users,
  HeartHandshake,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getCurrentUser } from "../../api/authApi";
import {
  clearAuthData,
  getAuthToken,
} from "../../utils/authToken";

import logo from "../../assets/images/logo.png";


const NAVIGATION = {
  candidate: [
    {
      label: "New Assessment",
      path: "/candidate",
      icon: ClipboardList,
    },
    {
      label: "History",
      path: "/candidate/history",
      icon: ClipboardList,
    },
    {
      label: "Profile",
      path: "/candidate/profile",
      icon: UserRound,
    },
  ],

  commander: [
    {
      label: "Command Centre",
      path: "/commander",
      icon: ShieldCheck,
    },
    {
      label: "Personnel",
      path: "/commander/personnel",
      icon: Users,
    },
    {
      label: "Profile",
      path: "/commander/profile",
      icon: UserRound,
    },
  ],

  medical_officer: [
    {
      label: "Medical Dashboard",
      path: "/medical",
      icon: ShieldCheck,
    },
    {
      label: "Welfare",
      path: "/medical/welfare",
      icon: HeartHandshake,
    },
    {
      label: "Profile",
      path: "/medical/profile",
      icon: UserRound,
    },
  ],
};


export default function Navbar({
  role = "candidate",
  userName = "User",
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentUserName, setCurrentUserName] =
    useState(userName);

  useEffect(() => {
    async function loadCurrentUser() {
      try {
        const token = getAuthToken();

        if (!token) {
          return;
        }

        const user = await getCurrentUser(token);

        setCurrentUserName(user.full_name);
      } catch (err) {
        console.error(
          "Failed to load navbar user:",
          err
        );
      }
    }

    loadCurrentUser();
  }, [userName]);

  const navigation =
    NAVIGATION[role] || NAVIGATION.candidate;


const handleLogout = () => {
  clearAuthData();
  navigate("/login", { replace: true });
};


  return (
    <aside
      className="
        fixed
        left-0
        top-0
        z-50
        flex
        h-screen
        w-[265px]
        flex-col
        border-r
        border-[#efd6df]
        bg-[#fff4f7]
      "
    >
      {/* ==========================================
          Logo
      ========================================== */}
      <div className="px-5 pt-5">
        <div className="flex justify-center">
          <div
            className="
              flex
              h-[90px]
              w-[90px]
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border
              border-[#f0d6df]
              bg-white
              p-2
              shadow-[0_4px_15px_rgba(118,36,63,0.06)]
            "
          >
            <img
              src={logo}
              alt="Chitta Shanti Logo"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>


      {/* Divider */}
      <div className="mx-3 mt-6 h-px bg-[#efdce3]" />


      {/* ==========================================
          Navigation
      ========================================== */}
      <nav className="mt-5 space-y-3 px-3">
        {navigation.map((item) => {
          const Icon = item.icon;

          const isActive =
            location.pathname === item.path ||
            (
              item.path !== "/commander" &&
              location.pathname.startsWith(`${item.path}/`)
            );

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={`
                group
                flex
                w-full
                items-center
                gap-4
                rounded-2xl
                px-5
                py-4
                text-left
                transition-all
                duration-200

                ${
                  isActive
                    ? `
                      bg-[#d12b63]
                      text-white
                      shadow-[0_5px_12px_rgba(209,43,99,0.20)]
                    `
                    : `
                      bg-[#f8dce6]
                      text-[#76243f]
                      hover:bg-[#f4cedb]
                    `
                }
              `}
            >
              <Icon
                size={23}
                strokeWidth={2}
                className={`
                  shrink-0
                  transition-colors

                  ${
                    isActive
                      ? "text-white"
                      : "text-[#76243f]"
                  }
                `}
              />

              <span className="flex-1 text-sm font-semibold sm:text-base">
                {item.label}
              </span>

            
              
            </button>
          );
        })}
      </nav>


      {/* ==========================================
          User area
      ========================================== */}
      <div className="mt-auto border-t border-[#efdce3] px-3 pb-4 pt-5">
        <div className="flex items-center gap-3 px-2">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#d12b63]
              text-sm
              font-bold
              text-white
              shadow-[0_4px_10px_rgba(209,43,99,0.20)]
            "
          >
            {getInitials(currentUserName)}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#172033]">
              {currentUserName}
            </p>

            <p className="mt-0.5 text-xs text-[#858b97]">
              {getRoleLabel(role)}
            </p>
          </div>
        </div>


        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="
            mt-4
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[#efd6df]
            bg-white
            px-4
            py-3
            text-sm
            font-semibold
            text-[#8d3152]
            shadow-sm
            transition
            hover:bg-[#fff8fa]
            active:scale-[0.99]
          "
        >
          <LogOut size={18} />

          Log Out
        </button>
      </div>
    </aside>
  );
}


/* =====================================================
   Helpers
===================================================== */

function getInitials(name) {
  if (!name) {
    return "CS";
  }

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}


function getRoleLabel(role) {
  switch (role) {
    case "commander":
      return "Commander";

    case "medical_officer":
      return "Medical Officer";

    case "candidate":
    default:
      return "Candidate";
  }
}