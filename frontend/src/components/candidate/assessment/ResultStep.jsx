import {
  Activity,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock3,
  Eye,
  Heart,
  Plus,
  Share2,
} from "lucide-react";

const MOCK_RESULT = {
  session_id: "SESN-6F9DCB",
  personnel_id: "user_service_id",
  readiness_status: "Fit for Duty — Monitor",
  classification: "Moderate Stress Indicators",
  stress_probability: 0.55,
  shap_attribution: [
    {
      feature: "rmssd_ms",
      description: "Heart rate variability within normal bounds",
    },
    {
      feature: "pitch_mean_hz",
      description: "Voice pitch within expected range",
    },
    {
      feature: "blink_rate_bpm",
      description: "Blink rate within normal range",
    },
  ],
  timestamp: "2026-09-13T15:50:00",
};

export default function ResultStep({
  result = MOCK_RESULT,
  onNewAssessment,
  onViewHistory,
}) {
  const stressPercentage = Math.round(
    result.stress_probability * 100
  );

  const formattedDate = formatDate(result.timestamp);

  const factors = result.shap_attribution?.slice(0, 3) || [];

  return (
    <div className="w-full">
      {/* Result Card */}
      <div
        className="
          rounded-[28px]
          border border-[#f0dce3]
          bg-white
          px-5 py-6
          sm:px-8 sm:py-8
          lg:px-10 lg:py-9
          shadow-[0_12px_40px_rgba(118,36,63,0.07)]
        "
      >
        {/* --------------------------------
            Header
        -------------------------------- */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#d12b63]" />

              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#c42a5e]">
                Assessment Complete
              </p>
            </div>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#172033] sm:text-4xl">
              Your Result
            </h1>
          </div>

          {/* Session information */}
          <div
            className="
              flex
              items-center
              gap-3
              self-start
              rounded-xl
              border border-[#f0dce3]
              bg-[#fff8fa]
              px-4
              py-3
            "
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
              <Clock3
                size={17}
                strokeWidth={2}
                className="text-[#d12b63]"
              />
            </div>

            <div>
              <p className="text-xs font-bold text-[#172033]">
                {result.session_id}
              </p>

              <p className="mt-0.5 whitespace-nowrap text-xs text-[#858b97]">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>

        {/* --------------------------------
            Readiness Status
        -------------------------------- */}
        <div
          className="
            mt-7
            rounded-2xl
            border
            border-[#f2df91]
            bg-[#fffdf1]
            px-5
            py-5
            sm:px-6
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#fff3ca]
              "
            >
              <CheckCircle2
                size={26}
                strokeWidth={2}
                className="text-[#e28a00]"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#7d8a9e]">
                Readiness Status
              </p>

              <p className="mt-1 text-lg font-semibold text-[#172033] sm:text-xl">
                {result.readiness_status}
              </p>
            </div>
          </div>
        </div>

        {/* --------------------------------
            Stress probability + classification
        -------------------------------- */}
        <div
          className="
            mt-7
            grid
            items-center
            gap-8
            md:grid-cols-[220px_1fr]
            lg:grid-cols-[250px_1fr]
          "
        >
          {/* Donut */}
          <div className="flex justify-center">
            <StressDonut percentage={stressPercentage} />
          </div>

          {/* Classification */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.1em] text-[#7d8a9e]">
              Classification
            </p>

            <div
              className="
                mt-2
                inline-flex
                rounded-full
                bg-[#fff0f4]
                px-5
                py-2
              "
            >
              <span className="text-sm font-semibold text-[#a52252] sm:text-base">
                {result.classification}
              </span>
            </div>

            <p className="mt-4 max-w-[650px] text-sm leading-6 text-[#858b97] sm:text-[15px]">
              This score reflects both your recorded clip and your
              questionnaire answers. Detailed contributing factors are
              reviewed only by your unit's medical officer as part of
              standard welfare protocol — they are not shown here to protect
              your privacy.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-7 h-px bg-[#f0e3e7]" />

        {/* --------------------------------
            Key Factors
        -------------------------------- */}
        <div>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-[#172033]">
              Key Factors
            </h2>

            {result.shap_attribution?.length > 3 && (
              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-[#c51f59]
                  transition
                  hover:text-[#a91f4e]
                "
              >
                View all factors
                <ArrowRight size={17} />
              </button>
            )}
          </div>

          {factors.length > 0 ? (
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {factors.map((factor, index) => (
                <FactorCard
                  key={`${factor.feature}-${index}`}
                  feature={factor.feature}
                  description={factor.description}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div
              className="
                mt-4
                rounded-2xl
                border border-[#f0dce3]
                bg-[#fff8fa]
                px-5 py-5
              "
            >
              <p className="text-sm text-[#858b97]">
                No contributing factors are available for this assessment.
              </p>
            </div>
          )}
        </div>

        {/* --------------------------------
            Bottom Actions
        -------------------------------- */}
        <div className="mt-7 flex flex-col gap-3 border-t border-[#f0e3e7] pt-7 sm:flex-row">
          {/* Start new assessment */}
          <button
            type="button"
            onClick={onNewAssessment}
            className="
              flex
              min-h-[54px]
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#d12b63]
              px-5
              text-sm
              font-semibold
              text-white
              shadow-[0_6px_14px_rgba(209,43,99,0.20)]
              transition
              hover:bg-[#a91f4e]
              active:scale-[0.99]
            "
          >
            <Plus size={20} strokeWidth={2.3} />

            Start new assessment
          </button>

          {/* View history */}
          <button
            type="button"
            onClick={onViewHistory}
            className="
              flex
              min-h-[54px]
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#f9e6ed]
              px-5
              text-sm
              font-semibold
              text-[#a52252]
              transition
              hover:bg-[#f4dce5]
              active:scale-[0.99]
            "
          >
            <Clock3 size={19} />

            View history
          </button>

          {/* Share */}
          <button
            type="button"
            aria-label="Share assessment result"
            className="
              flex
              min-h-[54px]
              w-full
              items-center
              justify-center
              rounded-xl
              border
              border-[#efd6df]
              bg-white
              px-5
              text-[#c51f59]
              transition
              hover:bg-[#fff8fa]
              active:scale-[0.98]
              sm:w-[64px]
              sm:flex-none
            "
          >
            <Share2 size={19} />
          </button>
        </div>
      </div>

      {/* Privacy / medical note */}
      <p className="mx-auto mt-4 max-w-3xl px-4 text-center text-xs leading-5 text-[#9da0a8]">
        Your assessment information is handled according to your unit's
        welfare and privacy protocols.
      </p>
    </div>
  );
}


/* =========================================================
   Stress Donut
========================================================= */

function StressDonut({ percentage }) {
  return (
    <div
      className="
        relative
        flex
        h-[190px]
        w-[190px]
        items-center
        justify-center
        sm:h-[205px]
        sm:w-[205px]
      "
    >
      {/* Donut background + progress */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(
            #df7b00 ${percentage * 3.6}deg,
            #f7dfe7 ${percentage * 3.6}deg 360deg
          )`,
        }}
      />

      {/* Inner white circle */}
      <div
        className="
          absolute
          inset-[13px]
          flex
          flex-col
          items-center
          justify-center
          rounded-full
          bg-white
        "
      >
        <span className="text-4xl font-semibold tracking-tight text-[#172033]">
          {percentage}%
        </span>

        <span className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#7d8a9e]">
          Stress Prob.
        </span>
      </div>
    </div>
  );
}


/* =========================================================
   Factor Card
========================================================= */

function FactorCard({
  feature,
  description,
  index,
}) {
  const Icon = getFactorIcon(feature, index);

  return (
    <div
      className="
        min-h-[120px]
        rounded-2xl
        border
        border-[#f0dce3]
        bg-[#fff8fa]
        px-4
        py-4
      "
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#fbe0e9]
          "
        >
          <Icon
            size={23}
            strokeWidth={2}
            className="text-[#c51f59]"
          />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-wide text-[#172033]">
            {formatFeatureName(feature)}
          </p>

          <p className="mt-1 text-sm leading-5 text-[#68758a]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   Helpers
========================================================= */

function formatFeatureName(feature) {
  if (!feature) {
    return "Assessment Factor";
  }

  const featureMap = {
    rmssd_ms: "RMSSD_MS",
    pitch_mean_hz: "PITCH_MEAN_HZ",
    pitch_std_hz: "PITCH_STD_HZ",
    blink_rate_bpm: "BLINK_RATE_BPM",
    brow_ratio: "BROW_RATIO",
    hr_bpm: "HR_BPM",
    head_jitter: "HEAD_JITTER",
  };

  if (featureMap[feature]) {
    return featureMap[feature];
  }

  return feature
    .replaceAll("_", " ")
    .toUpperCase();
}


function getFactorIcon(feature, index) {
  if (feature === "rmssd_ms") {
    return Brain;
  }

  if (feature === "pitch_mean_hz" || feature === "pitch_std_hz") {
    return Heart;
  }

  if (feature === "blink_rate_bpm") {
    return Eye;
  }

  if (feature === "hr_bpm") {
    return Activity;
  }

  const fallbackIcons = [Brain, Heart, Eye];

  return fallbackIcons[index % fallbackIcons.length];
}


function formatDate(timestamp) {
  if (!timestamp) {
    return "Assessment completed";
  }

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return timestamp;
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}