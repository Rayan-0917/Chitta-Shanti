import {
  BadgeCheck,
  Building2,
  Check,
  Info,
  LockKeyhole,
  Pencil,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import Navbar from "../../components/common/Navbar";

const DEMO_PROFILE = {
  username: "CPF-2291",
  fullName: "Calm Seeker",
  role: "Candidate",
  unitId: "4th Battalion, CRPF",
  rank: "Head Constable",

  // These are currently demo values because
  // the backend profile endpoint is not connected yet.
  assessmentsTaken: 2,
  currentStatus: "Fit for Duty",
  memberSince: "Jan 2026",
  lastCheckIn: "Sept 10",
};

export default function ProfilePage({
  profile = DEMO_PROFILE,
}) {
  const initials = getInitials(profile.fullName);

  return (
    <div className="min-h-screen bg-[#fff5f8]">
      <Navbar />

      <main
        className="
          min-h-screen
          ml-[265px]
          px-5
          py-8
          sm:px-8
          lg:px-12
          xl:px-14
        "
      >
        <div className="mx-auto w-full max-w-[1100px]">
          {/* =========================================
              Page Header
          ========================================= */}
          <div className="mb-7 text-center">
            <div className="flex items-center justify-center gap-3">
              <UserRound
                size={27}
                strokeWidth={2}
                className="text-[#d12b63]"
              />

              <h1
                className="
                  text-3xl
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-[#172033]
                  sm:text-4xl
                "
              >
                Profile
              </h1>
            </div>

            <p className="mt-3 text-sm text-[#858b97] sm:text-base">
              Your account, unit details & privacy controls
            </p>
          </div>

          {/* =========================================
              Profile Identity Card
          ========================================= */}
          <section
            className="
              rounded-[28px]
              border
              border-[#f0d2de]
              bg-gradient-to-r
              from-[#fde8ef]
              to-[#fff1f5]
              p-5
              shadow-[0_10px_30px_rgba(118,36,63,0.06)]
              sm:p-7
            "
          >
            {/* Top row */}
            <div className="flex items-center justify-between gap-4">
              {/* Demo account badge */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#f0dce3]
                  bg-white
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-[#a52252]
                  shadow-sm
                "
              >
                <Info size={14} />
                Demo Account
              </div>

              {/* Edit Profile */}
              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-[#a52252]
                  shadow-sm
                  transition
                  hover:bg-[#fff8fa]
                  active:scale-[0.98]
                "
              >
                <Pencil size={15} />
                Edit Profile
              </button>
            </div>

            {/* Identity */}
            <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center">
              {/* Avatar */}
              <div
                className="
                  relative
                  flex
                  h-[104px]
                  w-[104px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border-[4px]
                  border-white
                  bg-gradient-to-br
                  from-[#df6389]
                  to-[#c51f59]
                  text-3xl
                  font-semibold
                  text-white
                  shadow-[0_5px_15px_rgba(197,31,89,0.18)]
                "
              >
                {initials}

                {/* Online indicator */}
                <span
                  className="
                    absolute
                    bottom-1
                    right-1
                    h-6
                    w-6
                    rounded-full
                    border-[3px]
                    border-white
                    bg-[#5b9b5b]
                  "
                />
              </div>

              {/* Identity information */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-semibold text-[#172033] sm:text-3xl">
                    {profile.fullName}
                  </h2>

                  <span
                    className="
                      rounded-full
                      bg-[#d12b63]
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-white
                    "
                  >
                    {profile.role}
                  </span>
                </div>

                <p className="mt-2 text-sm text-[#68758a]">
                  Personnel ID:{" "}
                  <span className="font-semibold text-[#3b4658]">
                    {profile.username}
                  </span>{" "}
                  <span className="text-[#9da0a8]">
                    · identity masked for privacy
                  </span>
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <ProfilePill
                    icon={Building2}
                    text={profile.unitId}
                  />

                  <ProfilePill
                    icon={BadgeCheck}
                    text={profile.rank}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* =========================================
              Statistics
          ========================================= */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Assessments Taken"
              value={profile.assessmentsTaken}
            />

            <StatCard
              label="Current Status"
              value={profile.currentStatus}
              status
            />

            <StatCard
              label="Member Since"
              value={profile.memberSince}
            />

            <StatCard
              label="Last Check-In"
              value={profile.lastCheckIn}
            />
          </div>

          {/* =========================================
              Lower Information Cards
          ========================================= */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Account Details */}
            <AccountDetails profile={profile} />

            {/* Privacy & Data Control */}
            <PrivacyCard />
          </div>
        </div>
      </main>
    </div>
  );
}


/* =====================================================
   Profile Pill
===================================================== */

function ProfilePill({ icon: Icon, text }) {
  return (
    <div
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        bg-white
        px-3
        py-2
        text-xs
        font-medium
        text-[#68758a]
        shadow-sm
      "
    >
      <Icon
        size={14}
        strokeWidth={2}
        className="text-[#68758a]"
      />

      {text}
    </div>
  );
}


/* =====================================================
   Statistics Card
===================================================== */

function StatCard({
  label,
  value,
  status = false,
}) {
  return (
    <div
      className="
        min-h-[90px]
        rounded-2xl
        border
        border-[#f0dce3]
        bg-white
        px-5
        py-4
        shadow-[0_5px_18px_rgba(118,36,63,0.04)]
      "
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9da0a8]">
        {label}
      </p>

      {status ? (
        <div className="mt-2 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#5b9b5b]" />

          <p className="text-lg font-semibold text-[#477a47]">
            {value}
          </p>
        </div>
      ) : (
        <p className="mt-2 text-2xl font-semibold text-[#172033]">
          {value}
        </p>
      )}
    </div>
  );
}


/* =====================================================
   Account Details
===================================================== */

function AccountDetails({ profile }) {
  return (
    <section
      className="
        rounded-[26px]
        border
        border-[#f0dce3]
        bg-white
        p-6
        shadow-[0_8px_25px_rgba(118,36,63,0.05)]
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-[#fff0f4]
          "
        >
          <UserRound
            size={21}
            className="text-[#d12b63]"
          />
        </div>

        <h2 className="text-lg font-semibold text-[#172033]">
          Account Details
        </h2>
      </div>

      <div className="mt-5 divide-y divide-[#f1e6ea]">
        <DetailRow
          label="Username"
          value={profile.username}
        />

        <DetailRow
          label="Full Name"
          value={profile.fullName}
        />

        <DetailRow
          label="Rank / Designation"
          value={profile.rank}
        />

        <DetailRow
          label="Role"
          value={profile.role}
        />

        <DetailRow
          label="Unit ID"
          value={profile.unitId}
        />

        {/* Password intentionally omitted */}
        <div className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-2">
            <LockKeyhole
              size={16}
              className="text-[#9da0a8]"
            />

            <span className="text-sm text-[#858b97]">
              Password
            </span>
          </div>

          <span className="text-sm font-medium text-[#858b97]">
            ••••••••
          </span>
        </div>
      </div>
    </section>
  );
}


/* =====================================================
   Privacy Card
===================================================== */

function PrivacyCard() {
  return (
    <section
      className="
        rounded-[26px]
        border
        border-[#f0dce3]
        bg-white
        p-6
        shadow-[0_8px_25px_rgba(118,36,63,0.05)]
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-[#edf7ee]
          "
        >
          <LockKeyhole
            size={21}
            className="text-[#5c9561]"
          />
        </div>

        <h2 className="text-lg font-semibold text-[#172033]">
          Privacy & Data Control
        </h2>
      </div>

      <div className="mt-5 space-y-4">
        <PrivacyItem>
          Commanders only see a{" "}
          <strong className="font-semibold text-[#68758a]">
            "Fit for Duty"
          </strong>{" "}
          or{" "}
          <strong className="font-semibold text-[#68758a]">
            "Mandatory Rest"
          </strong>{" "}
          tag against an anonymized ID — never your raw score.
        </PrivacyItem>

        <PrivacyItem>
          Medical officers can access detailed assessment information
          only as part of the standard welfare protocol.
        </PrivacyItem>

        <PrivacyItem>
          Your recorded responses and assessment information are
          handled according to your unit's privacy controls.
        </PrivacyItem>
      </div>
    </section>
  );
}


/* =====================================================
   Privacy Item
===================================================== */

function PrivacyItem({ children }) {
  return (
    <div className="flex items-start gap-3">
      <Check
        size={17}
        strokeWidth={2.5}
        className="mt-0.5 shrink-0 text-[#68758a]"
      />

      <p className="text-sm leading-6 text-[#68758a]">
        {children}
      </p>
    </div>
  );
}


/* =====================================================
   Detail Row
===================================================== */

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-5 py-4">
      <span className="text-sm text-[#9da0a8]">
        {label}
      </span>

      <span className="text-right text-sm font-semibold text-[#3b4658]">
        {value}
      </span>
    </div>
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