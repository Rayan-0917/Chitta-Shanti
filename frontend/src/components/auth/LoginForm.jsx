import { useState } from "react";
import { LockKeyhole, LogIn, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../api/authApi";
import { saveAuthData } from "../../utils/authToken";
import logo from "../../assets/images/logo.png";

export default function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleSubmit = async (event) => {
  event.preventDefault();

  setError("");

  try {
    setLoading(true);

    const authData = await loginUser(
      username.trim(),
      password
    );

    saveAuthData(authData);

    switch (authData.role) {
      case "candidate":
        navigate("/candidate", { replace: true });
        break;

      case "commander":
        navigate("/commander", { replace: true });
        break;

      case "medical_officer":
        navigate("/medical", { replace: true });
        break;

      default:
        throw new Error(
          "Your account has an unrecognized role."
        );
    }
  } catch (err) {
    console.error("Login failed:", err);

    setError(
      err?.message ||
        "Unable to log in. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className="
        w-full
        max-w-md
        rounded-3xl
        border
        border-pink-100
        bg-white/85
        p-8
        shadow-xl
        shadow-[#ce2d5d]/5
        backdrop-blur-md
        transition-all
        sm:p-10
      "
    >
      {/* Logo */}
      <div className="flex flex-col items-center justify-center text-center">
        <div
          className="
            mb-5
            flex
            h-24
            w-24
            items-center
            justify-center
            overflow-hidden
            rounded-full
            border
            border-pink-100
            bg-white
            p-2
            shadow-md
            ring-4
            ring-pink-50
            sm:h-28
            sm:w-28
          "
        >
          <img
            src={logo}
            alt="Chitta Shanti Logo"
            className="
              h-full
              w-full
              object-contain
              transition-transform
              duration-300
              hover:scale-105
            "
          />
        </div>

        <h1
          className="
            text-2xl
            font-extrabold
            tracking-tight
            text-slate-900
            sm:text-3xl
          "
          style={{
            fontFamily: "var(--font-display)",
          }}
        >
          Welcome back
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        {/* Username */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div
            className="
              flex
              shrink-0
              items-center
              gap-1.5
              rounded-xl
              border
              border-pink-100
              bg-pink-50/80
              px-3.5
              py-3
              text-xs
              font-semibold
              text-slate-700
              shadow-sm
              sm:w-32
              sm:text-sm
            "
          >
            <UserRound
              size={17}
              strokeWidth={2}
              className="text-[#b8204c]"
            />

            <span>Username</span>
          </div>

          <div className="relative flex-1">
            <input
  type="text"
  value={username}
  onChange={(event) =>
    setUsername(event.target.value)
  }
  placeholder="Enter Service ID / Username"
  autoComplete="username"
  required
  disabled={loading}
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50/70
                px-4
                py-3
                text-sm
                font-medium
                text-slate-800
                outline-none
                transition
                placeholder:text-slate-400
                hover:bg-slate-50
                focus:border-[#ce2d5d]
                focus:bg-white
                focus:ring-2
                focus:ring-[#ce2d5d]/20
              "
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div
            className="
              flex
              shrink-0
              items-center
              gap-1.5
              rounded-xl
              border
              border-pink-100
              bg-pink-50/80
              px-3.5
              py-3
              text-xs
              font-semibold
              text-slate-700
              shadow-sm
              sm:w-32
              sm:text-sm
            "
          >
            <LockKeyhole
              size={17}
              strokeWidth={2}
              className="text-[#b8204c]"
            />

            <span>Password</span>
          </div>

          <div className="relative flex-1">
            <input
  type="password"
  value={password}
  onChange={(event) =>
    setPassword(event.target.value)
  }
  placeholder="Enter your password"
  autoComplete="current-password"
  required
  disabled={loading}
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50/70
                px-4
                py-3
                text-sm
                font-medium
                text-slate-800
                outline-none
                transition
                placeholder:text-slate-400
                hover:bg-slate-50
                focus:border-[#ce2d5d]
                focus:bg-white
                focus:ring-2
                focus:ring-[#ce2d5d]/20
              "
            />
          </div>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end px-1 pt-1">
          <button
            type="button"
            className="
              text-xs
              font-semibold
              text-[#b8204c]
              transition
              hover:text-[#9b163d]
              hover:underline
              sm:text-sm
            "
            onClick={() => {
              /*
               * Forgot-password flow has not yet been
               * specified in the backend context.
               */
              console.log("Forgot password clicked");
            }}
          >
            Forgot Password?
          </button>
        </div>
        {error && (
  <div
    className="
      rounded-xl
      border
      border-[#f0cfd8]
      bg-[#fff1f4]
      px-4
      py-3
    "
  >
    <p className="text-sm leading-5 text-[#7d2947]">
      {error}
    </p>
  </div>
)}
        {/* Login button */}
        <div className="flex justify-center pt-3">
          <button
  type="submit"
  disabled={loading}
  className="
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-full
    bg-[#ce2d5d]
    px-8
    py-3.5
    text-base
    font-bold
    text-white
    shadow-lg
    shadow-[#ce2d5d]/30
    transition
    duration-200
    hover:bg-[#b8204c]
    active:scale-[0.99]
    disabled:cursor-not-allowed
    disabled:opacity-60
    sm:w-2/3
  "
>
            {loading ? (
  <>
    <span>Logging in...</span>

    <span
      className="
        h-4
        w-4
        animate-spin
        rounded-full
        border-2
        border-white/40
        border-t-white
      "
    />
  </>
) : (
  <>
    <span>Login</span>

    <LogIn
      size={19}
      strokeWidth={2}
    />
  </>
)}
          </button>
        </div>
      </form>

      {/* Register */}
      <div
        className="
          mt-8
          border-t
          border-slate-100
          pt-6
          text-center
          text-xs
          text-slate-500
          sm:text-sm
        "
      >
        New to Chitta Shanti?

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="
            ml-1
            font-bold
            text-[#b8204c]
            transition
            hover:text-[#9b163d]
            hover:underline
          "
        >
          Register ID
        </button>
      </div>
    </div>
  );
}