import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  RefreshCw,
  ShieldCheck,
  Users,
} from "lucide-react";

import Navbar from "../../components/common/Navbar";


/*
 * IMPORTANT:
 * The backend endpoint is:
 *
 * GET /api/assessment/commander/roster
 *
 * It requires:
 *
 * Authorization: Bearer <JWT>
 *
 * The API returns only:
 * {
 *   total_evaluated,
 *   roster: [
 *     {
 *       candidate_id,
 *       readiness_tag
 *     }
 *   ]
 * }
 *
 * We are keeping the API URL configurable so that you can
 * change it when your FastAPI server URL is finalized.
 */
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";


export default function CommanderDashboardPage() {
  const [roster, setRoster] = useState([]);
  const [totalEvaluated, setTotalEvaluated] = useState(0);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");


  /*
   * Fetch commander roster
   */
  const fetchRoster = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      /*
       * We intentionally read the token from localStorage here.
       *
       * If your Login implementation later stores the token under
       * a different key, change "access_token" in this one place.
       */
      const token = localStorage.getItem("access_token");

      if (!token) {
        throw new Error(
          "Authentication token not found. Please log in again."
        );
      }

      const response = await fetch(
        `${API_BASE_URL}/api/assessment/commander/roster`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail || "Unable to load personnel roster."
        );
      }

      setRoster(Array.isArray(data.roster) ? data.roster : []);
      setTotalEvaluated(data.total_evaluated ?? 0);
    } catch (err) {
      console.error("Commander roster error:", err);

      setError(
        err?.message ||
          "Something went wrong while loading the roster."
      );

      setRoster([]);
      setTotalEvaluated(0);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  /*
   * Initial API request
   */
  useEffect(() => {
    fetchRoster();
  }, []);


  /*
   * Calculate dashboard statistics from the actual roster.
   */
  const statistics = useMemo(() => {
    const fitForDuty = roster.filter(
      (person) =>
        person.readiness_tag === "Fit for Duty"
    ).length;

    const mandatoryRest = roster.filter(
      (person) =>
        person.readiness_tag === "Mandatory Rest Required"
    ).length;

    return {
      fitForDuty,
      mandatoryRest,
    };
  }, [roster]);


  return (
    <div className="min-h-screen bg-[#fff5f8]">
      <Navbar role="commander" />

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
        <div className="mx-auto w-full max-w-[1120px]">

          {/* ==========================================
              Header
          ========================================== */}
          <div
            className="
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={23}
                  strokeWidth={2}
                  className="text-[#d12b63]"
                />

                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.13em]
                    text-[#c42a5e]
                  "
                >
                  Command Centre
                </p>
              </div>

              <h1
                className="
                  mt-2
                  text-3xl
                  font-semibold
                  tracking-tight
                  text-[#172033]
                  sm:text-4xl
                "
              >
                Command Overview
              </h1>

              <p
                className="
                  mt-2
                  max-w-2xl
                  text-sm
                  leading-6
                  text-[#858b97]
                  sm:text-base
                "
              >
                Monitor personnel readiness across your unit
                while preserving individual assessment privacy.
              </p>
            </div>

            {/* Refresh */}
            <button
              type="button"
              onClick={() => fetchRoster(true)}
              disabled={refreshing || loading}
              className="
                inline-flex
                min-h-[44px]
                items-center
                justify-center
                gap-2
                self-start
                rounded-xl
                border
                border-[#efd6df]
                bg-white
                px-4
                text-sm
                font-semibold
                text-[#a52252]
                shadow-sm
                transition
                hover:bg-[#fff8fa]
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:self-auto
              "
            >
              <RefreshCw
                size={17}
                className={refreshing ? "animate-spin" : ""}
              />

              Refresh
            </button>
          </div>


          {/* ==========================================
              Error
          ========================================== */}
          {error && (
            <div
              className="
                mt-6
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-[#f0cfd8]
                bg-[#fff1f4]
                px-5
                py-4
              "
            >
              <AlertTriangle
                size={20}
                className="mt-0.5 shrink-0 text-[#c51f59]"
              />

              <div>
                <p className="text-sm font-semibold text-[#7d2947]">
                  Unable to load roster
                </p>

                <p className="mt-1 text-sm leading-5 text-[#858b97]">
                  {error}
                </p>
              </div>
            </div>
          )}


          {/* ==========================================
              Statistics
          ========================================== */}
          <section
            className="
              mt-7
              grid
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            <OverviewCard
              icon={Users}
              label="Personnel Evaluated"
              value={loading ? "—" : totalEvaluated}
            />

            <OverviewCard
              icon={CheckCircle2}
              label="Fit for Duty"
              value={loading ? "—" : statistics.fitForDuty}
              variant="success"
            />

            <OverviewCard
              icon={AlertTriangle}
              label="Mandatory Rest"
              value={loading ? "—" : statistics.mandatoryRest}
              variant="warning"
            />
          </section>


          {/* ==========================================
              Readiness Summary
          ========================================== */}
          <section
            className="
              mt-6
              rounded-[28px]
              border
              border-[#efd6df]
              bg-white
              p-6
              shadow-[0_10px_30px_rgba(118,36,63,0.05)]
              sm:p-7
            "
          >
            <div
              className="
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#fff0f4]
                    "
                  >
                    <ClipboardList
                      size={22}
                      className="text-[#d12b63]"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-[#172033]">
                      Personnel Readiness
                    </h2>

                    <p className="mt-0.5 text-sm text-[#858b97]">
                      Latest available readiness status
                    </p>
                  </div>
                </div>
              </div>

              {!loading && (
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    self-start
                    rounded-full
                    bg-[#fff8fa]
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-[#858b97]
                  "
                >
                  <span className="h-2 w-2 rounded-full bg-[#5b9b5b]" />

                  {totalEvaluated} evaluated
                </span>
              )}
            </div>


            {/* ======================================
                Loading
            ====================================== */}
            {loading ? (
              <LoadingRoster />
            ) : roster.length === 0 ? (
              <EmptyRoster />
            ) : (
              <RosterTable roster={roster} />
            )}
          </section>


          {/* ==========================================
              Privacy Notice
          ========================================== */}
          <section
            className="
              mt-6
              rounded-2xl
              border
              border-[#efd6df]
              bg-[#fff8fa]
              px-5
              py-5
            "
          >
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-[#68758a]"
              />

              <div>
                <p className="text-sm font-semibold text-[#3b4658]">
                  Privacy-protected command view
                </p>

                <p className="mt-1 text-sm leading-6 text-[#858b97]">
                  This view only displays anonymized personnel IDs and
                  readiness tags. Individual stress probabilities,
                  physiological measurements, and assessment reasoning
                  are not exposed to commanders.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}


/* =====================================================
   Overview Card
===================================================== */

function OverviewCard({
  icon: Icon,
  label,
  value,
  variant = "default",
}) {
  const iconClasses = {
    default: "bg-[#fff0f4] text-[#d12b63]",
    success: "bg-[#edf7ee] text-[#5b9560]",
    warning: "bg-[#fff6df] text-[#d18a13]",
  };

  const valueClasses = {
    default: "text-[#172033]",
    success: "text-[#477a47]",
    warning: "text-[#b4770c]",
  };

  return (
    <div
      className="
        rounded-2xl
        border
        border-[#efd6df]
        bg-white
        p-5
        shadow-[0_7px_22px_rgba(118,36,63,0.04)]
      "
    >
      <div className="flex items-center gap-3">
        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            ${iconClasses[variant]}
          `}
        >
          <Icon size={22} />
        </div>

        <div>
          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-wide
              text-[#9da0a8]
            "
          >
            {label}
          </p>

          <p
            className={`
              mt-1
              text-2xl
              font-semibold
              ${valueClasses[variant]}
            `}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}


/* =====================================================
   Roster Table
===================================================== */

function RosterTable({ roster }) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-[#f0dce3]">
      {/* Desktop header */}
      <div
        className="
          hidden
          grid-cols-[1fr_220px]
          border-b
          border-[#f0dce3]
          bg-[#fff8fa]
          px-5
          py-3
          sm:grid
        "
      >
        <span
          className="
            text-[11px]
            font-bold
            uppercase
            tracking-wide
            text-[#9da0a8]
          "
        >
          Anonymous Personnel ID
        </span>

        <span
          className="
            text-[11px]
            font-bold
            uppercase
            tracking-wide
            text-[#9da0a8]
          "
        >
          Readiness
        </span>
      </div>

      <div className="divide-y divide-[#f0e5e9]">
        {roster.map((person, index) => (
          <RosterRow
            key={`${person.candidate_id}-${index}`}
            person={person}
          />
        ))}
      </div>
    </div>
  );
}


/* =====================================================
   Roster Row
===================================================== */

function RosterRow({ person }) {
  const needsRest =
    person.readiness_tag ===
    "Mandatory Rest Required";

  return (
    <div
      className="
        grid
        gap-3
        bg-white
        px-5
        py-4
        transition
        hover:bg-[#fffafb]
        sm:grid-cols-[1fr_220px]
        sm:items-center
      "
    >
      {/* Candidate */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9da0a8] sm:hidden">
          Anonymous Personnel ID
        </p>

        <p className="mt-1 font-mono text-sm font-medium text-[#3b4658] sm:mt-0">
          {person.candidate_id}
        </p>
      </div>

      {/* Readiness */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9da0a8] sm:hidden">
          Readiness
        </p>

        <div className="mt-1 sm:mt-0">
          <ReadinessBadge
            needsRest={needsRest}
            text={person.readiness_tag}
          />
        </div>
      </div>
    </div>
  );
}


/* =====================================================
   Readiness Badge
===================================================== */

function ReadinessBadge({
  needsRest,
  text,
}) {
  if (needsRest) {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-[#fff4dc]
          px-3
          py-1.5
          text-xs
          font-semibold
          text-[#a66b08]
        "
      >
        <AlertTriangle size={14} />

        {text}
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        bg-[#edf7ee]
        px-3
        py-1.5
        text-xs
        font-semibold
        text-[#477a47]
      "
    >
      <CheckCircle2 size={14} />

      {text}
    </span>
  );
}


/* =====================================================
   Loading State
===================================================== */

function LoadingRoster() {
  return (
    <div className="mt-6 space-y-3">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="
            h-[66px]
            animate-pulse
            rounded-xl
            bg-[#fff5f8]
          "
        />
      ))}
    </div>
  );
}


/* =====================================================
   Empty State
===================================================== */

function EmptyRoster() {
  return (
    <div
      className="
        mt-6
        flex
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-[#efd6df]
        bg-[#fffafb]
        px-6
        py-14
        text-center
      "
    >
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#fff0f4]
        "
      >
        <Users
          size={25}
          className="text-[#d12b63]"
        />
      </div>

      <h3 className="mt-4 text-base font-semibold text-[#172033]">
        No evaluated personnel yet
      </h3>

      <p className="mt-1 max-w-sm text-sm leading-5 text-[#858b97]">
        Personnel will appear here once assessment results are
        available.
      </p>
    </div>
  );
}