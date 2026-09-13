import { useState } from "react";
import { LockKeyhole, LogIn, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export default function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    /*
     * Backend authentication will be connected here.
     *
     * Do not invent an API endpoint until the actual
     * backend authentication contract is confirmed.
     */
    console.log("Login submitted:", {
      username,
      password,
    });
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

        {/* Login button */}
        <div className="flex justify-center pt-3">
          <button
            type="submit"
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
              sm:w-2/3
            "
          >
            <span>Login</span>

            <LogIn
              size={19}
              strokeWidth={2}
            />
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