import { useCallback, useEffect } from "react";

import {
  getWelfareTriage,
  recordWelfareIntervention,
} from "./../../api/welfareApi";

import { getAuthToken } from "../../utils/authToken";

import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Clock3,
  HeartPulse,
  RefreshCw,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Users,
} from "lucide-react";

import Navbar from "../../components/common/Navbar";
import { useState } from "react";
import InterventionModal from "../../components/welfare/InterventionModal";



export default function MedicalOfficerDashboardPage() {

  const [triages, setTriages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const [selectedTriage, setSelectedTriage] = useState(null);
  const [isInterventionOpen, setIsInterventionOpen] =
    useState(false);

  const handleOpenIntervention = (triage) => {
    setSelectedTriage(triage);
    setIsInterventionOpen(true);
  };

  const handleCloseIntervention = () => {
    setIsInterventionOpen(false);
    setSelectedTriage(null);
  };
  const loadTriage = useCallback(async () => {
    try {
      setError("");

      const token = getAuthToken();

      const data = await getWelfareTriage(token);

      setTriages(data?.pending_triages || []);
    } catch (err) {
      console.error("Failed to load welfare triage:", err);

      setError(
        err?.message ||
        "Unable to load welfare triage."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadTriage();
  }, [loadTriage]);

  const criticalCount = triages.filter(
    (item) => item.risk_tier === "Critical"
  ).length;

  const pendingCount = triages.length;

  const handleRefresh = () => {
    setRefreshing(true);
    loadTriage();
  };

  const handleInterventionSubmit = async (payload) => {
  try {
    const token = getAuthToken();

    const result = await recordWelfareIntervention(
      token,
      payload
    );

    setTriages((previous) =>
      previous.filter(
        (item) => item.personnel_id !== payload.personnel_id
      )
    );

    return result;
  } catch (err) {
    console.error("Failed to record intervention:", err);
    throw err;
  }
};
  return (
    <div className="min-h-screen bg-[#fff5f8]">
      {/* Medical Officer navigation */}
      <Navbar role="medical_officer" />

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
                <Stethoscope
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
                  Medical & Welfare
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
                Welfare Overview
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
                Review personnel requiring medical and welfare
                attention based on recent assessment results.
              </p>
            </div>

            {/* Refresh button */}
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="
    inline-flex
    items-center
    gap-2
    rounded-xl
    border
    border-[#efd6df]
    bg-white
    px-4
    py-2.5
    text-sm
    font-semibold
    text-[#8d3152]
    shadow-sm
    transition
    hover:bg-[#fff5f8]
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
            >
              <RefreshCw
                size={17}
                className={refreshing ? "animate-spin" : ""}
              />

              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>


          {/* ==========================================
              Important Medical Notice
          ========================================== */}
          <div
            className="
              mt-6
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-[#efd6df]
              bg-white
              px-5
              py-4
              shadow-[0_5px_18px_rgba(118,36,63,0.04)]
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#fff0f4]
              "
            >
              <ShieldCheck
                size={20}
                className="text-[#d12b63]"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#3b4658]">
                Clinical welfare review
              </p>

              <p className="mt-1 text-sm leading-5 text-[#858b97]">
                The cases shown here have been flagged for medical
                review. Detailed assessment reasoning is restricted
                to authorized medical personnel.
              </p>
            </div>
          </div>
          {error && (
            <div
              className="
      mt-6
      rounded-2xl
      border
      border-[#f1caca]
      bg-[#fff5f5]
      px-5
      py-4
    "
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={20}
                  className="mt-0.5 shrink-0 text-[#c95a5a]"
                />

                <div>
                  <p className="text-sm font-semibold text-[#9f4141]">
                    Unable to load welfare data
                  </p>

                  <p className="mt-1 text-sm leading-5 text-[#858b97]">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              Overview Statistics
          ========================================== */}
          <section
            className="
              mt-6
              grid
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            <OverviewCard
              icon={AlertTriangle}
              label="Critical Cases"
              value={criticalCount}
              variant="critical"
            />

            <OverviewCard
              icon={ClipboardList}
              label="Pending Reviews"
              value={pendingCount}
              variant="pending"
            />

            <OverviewCard
              icon={CheckCircle2}
              label="Welfare Status"
              value="Review Required"
              variant="review"
            />
          </section>


          {/* ==========================================
              Pending Welfare Reviews
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
            {/* Section header */}
            <div
              className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
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
                  <HeartPulse
                    size={22}
                    className="text-[#d12b63]"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-[#172033]">
                    Pending Welfare Reviews
                  </h2>

                  <p className="mt-0.5 text-sm text-[#858b97]">
                    Personnel requiring medical attention
                  </p>
                </div>
              </div>

              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  self-start
                  rounded-full
                  bg-[#fff4dc]
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-[#a66b08]
                "
              >
                <span className="h-2 w-2 rounded-full bg-[#d18a13]" />

                {pendingCount} pending
              </span>
            </div>


            {/* Cases */}
            {loading ? (
              <LoadingTriage />
            ) : triages.length === 0 ? (
              <EmptyTriage />
            ) : (
              <div className="mt-6 space-y-4">
                {triages.map((triage, index) => (
                  <TriageCard
                    key={`${triage.personnel_id}-${index}`}
                    triage={triage}
                    onReview={() =>
                      handleOpenIntervention(triage)
                    }
                  />
                ))}
              </div>
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
              border-[#dcebdd]
              bg-[#f4faf4]
              px-5
              py-5
            "
          >
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-[#5b9560]"
              />

              <div>
                <p className="text-sm font-semibold text-[#477a47]">
                  Authorized medical access
                </p>

                <p className="mt-1 text-sm leading-6 text-[#68758a]">
                  Unlike the command view, authorized medical
                  personnel can review the personnel identifier and
                  assessment factors associated with a flagged
                  welfare case.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
      <InterventionModal
        triage={selectedTriage}
        isOpen={isInterventionOpen}
        onClose={handleCloseIntervention}
        onSubmit={handleInterventionSubmit}
      />
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
  const styles = {
    critical: {
      icon: "bg-[#fff0f0] text-[#d15c5c]",
      value: "text-[#b04b4b]",
    },

    pending: {
      icon: "bg-[#fff6df] text-[#d18a13]",
      value: "text-[#b4770c]",
    },

    review: {
      icon: "bg-[#fff0f4] text-[#d12b63]",
      value: "text-[#a52252]",
    },

    default: {
      icon: "bg-[#fff0f4] text-[#d12b63]",
      value: "text-[#172033]",
    },
  };

  const currentStyle =
    styles[variant] || styles.default;

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
            ${currentStyle.icon}
          `}
        >
          <Icon size={22} />
        </div>

        <div className="min-w-0">
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
              truncate
              text-xl
              font-semibold
              ${currentStyle.value}
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
   Triage Card
===================================================== */

function TriageCard({
  triage,
  onReview,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[#f0dce3]
        bg-[#fffafb]
        p-5
        transition
        hover:border-[#e9c5d2]
        hover:shadow-[0_5px_18px_rgba(118,36,63,0.05)]
      "
    >
      {/* Top */}
      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-start
          sm:justify-between
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#fbe2e8]
            "
          >
            <UserRound
              size={21}
              className="text-[#c51f59]"
            />
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9da0a8]">
              Personnel ID
            </p>

            <p className="mt-1 font-mono text-sm font-semibold text-[#3b4658]">
              {triage.personnel_id}
            </p>
          </div>
        </div>

        <RiskBadge riskTier={triage.risk_tier} />
      </div>


      {/* Details */}
      <div
        className="
          mt-5
          grid
          gap-4
          border-t
          border-[#f0e5e9]
          pt-5
          md:grid-cols-2
        "
      >
        {/* Primary factor */}
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
            Primary Contributing Factor
          </p>

          <p className="mt-2 text-sm leading-6 text-[#68758a]">
            {triage.primary_shap_driver}
          </p>
        </div>

        {/* Suggested action */}
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
            Suggested Action
          </p>

          <div className="mt-2 flex items-start gap-2">
            <Clock3
              size={16}
              className="mt-0.5 shrink-0 text-[#d12b63]"
            />

            <p className="text-sm font-medium leading-6 text-[#68758a]">
              {triage.suggested_action}
            </p>
          </div>
        </div>
      </div>


      {/* Future action */}
      <div className="mt-5">
        <button
          type="button"
          onClick={onReview}
          className="
    inline-flex
    min-h-[42px]
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-[#d12b63]
    px-4
    text-sm
    font-semibold
    text-white
    shadow-[0_5px_14px_rgba(209,43,99,0.16)]
    transition
    hover:bg-[#a91f4e]
    active:scale-[0.98]
  "
        >
          <ClipboardList size={17} />

          Review intervention
        </button>

        <p className="mt-2 text-xs text-[#9da0a8]">
          Record the medical or welfare action taken for this case.
        </p>
      </div>
    </div>
  );
}


/* =====================================================
   Risk Badge
===================================================== */

function RiskBadge({ riskTier }) {
  const isCritical = riskTier === "Critical";

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        self-start
        rounded-full
        px-3
        py-1.5
        text-xs
        font-semibold

        ${isCritical
          ? "bg-[#fff0f0] text-[#b04b4b]"
          : "bg-[#fff6df] text-[#a66b08]"
        }
      `}
    >
      <span
        className={`
          h-2
          w-2
          rounded-full

          ${isCritical
            ? "bg-[#d15c5c]"
            : "bg-[#d18a13]"
          }
        `}
      />

      {riskTier}
    </span>
  );
}


/* =====================================================
   Empty State
===================================================== */

function EmptyTriage() {
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
          bg-[#edf7ee]
        "
      >
        <CheckCircle2
          size={26}
          className="text-[#5b9560]"
        />
      </div>

      <h3 className="mt-4 text-base font-semibold text-[#172033]">
        No pending welfare reviews
      </h3>

      <p className="mt-1 max-w-sm text-sm leading-5 text-[#858b97]">
        There are currently no personnel requiring medical
        attention.
      </p>
    </div>
  );
}

function LoadingTriage() {
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
      <RefreshCw
        size={28}
        className="animate-spin text-[#d12b63]"
      />

      <h3 className="mt-4 text-base font-semibold text-[#172033]">
        Loading welfare reviews
      </h3>

      <p className="mt-1 text-sm text-[#858b97]">
        Fetching the latest flagged cases.
      </p>
    </div>
  );
}