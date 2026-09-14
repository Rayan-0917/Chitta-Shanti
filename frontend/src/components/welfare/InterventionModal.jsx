import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  LoaderCircle,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

export default function InterventionModal({
  triage,
  isOpen,
  onClose,
  onSubmit,
}) {
  const [actionType, setActionType] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
   * Whenever a different triage case is opened,
   * populate the action field with the backend's
   * suggested action.
   */
  useEffect(() => {
    if (!triage || !isOpen) {
      return;
    }

    setActionType(triage.suggested_action || "");
    setNotes("");
    setError("");
    setSuccess("");
    setSubmitting(false);
  }, [triage, isOpen]);


  if (!isOpen || !triage) {
    return null;
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!actionType.trim()) {
      setError("Please enter an intervention action.");
      return;
    }

    try {
      setSubmitting(true);

      /*
 * Pass the intervention payload to the dashboard.
 * The dashboard handles the authenticated API request.
 */
      const payload = {
        personnel_id: triage.personnel_id,
        action_type: actionType.trim(),
        notes: notes.trim(),
      };

      if (onSubmit) {
        await onSubmit(payload);
      }

      setSuccess("Intervention recorded successfully.");

      /*
       * Keep the success message visible briefly before
       * closing the modal.
       */
      setTimeout(() => {
        onClose();
      }, 900);
    } catch (err) {
      console.error("Intervention submission error:", err);

      setError(
        err?.message ||
          "Unable to record the intervention."
      );
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-[#172033]/40
        px-4
        py-6
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        /*
         * Clicking the dark backdrop closes the modal.
         * Clicking inside the modal does not.
         */
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          relative
          max-h-[92vh]
          w-full
          max-w-[650px]
          overflow-y-auto
          rounded-[28px]
          border
          border-[#efd6df]
          bg-white
          shadow-[0_25px_70px_rgba(23,32,51,0.20)]
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="intervention-modal-title"
      >
        {/* ==========================================
            Close button
        ========================================== */}
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          aria-label="Close intervention dialog"
          className="
            absolute
            right-5
            top-5
            z-10
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-[#fff5f8]
            text-[#858b97]
            transition
            hover:bg-[#f9e6ed]
            hover:text-[#a52252]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <X size={18} />
        </button>


        {/* ==========================================
            Modal Header
        ========================================== */}
        <div
          className="
            border-b
            border-[#f0e3e7]
            bg-gradient-to-r
            from-[#fff0f4]
            to-white
            px-6
            py-6
            pr-16
            sm:px-7
            sm:py-7
            sm:pr-16
          "
        >
          <div className="flex items-start gap-4">
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#fbe0e9]
              "
            >
              <ClipboardCheck
                size={24}
                className="text-[#d12b63]"
              />
            </div>

            <div>
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#c42a5e]
                "
              >
                Medical Welfare
              </p>

              <h2
                id="intervention-modal-title"
                className="
                  mt-1
                  text-2xl
                  font-semibold
                  tracking-tight
                  text-[#172033]
                "
              >
                Record Intervention
              </h2>

              <p className="mt-1 text-sm leading-5 text-[#858b97]">
                Document the welfare action taken for this flagged
                personnel case.
              </p>
            </div>
          </div>
        </div>


        {/* ==========================================
            Content
        ========================================== */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 py-6 sm:px-7">

            {/* Personnel + Risk */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Personnel */}
              <div
                className="
                  rounded-2xl
                  border
                  border-[#f0dce3]
                  bg-[#fffafb]
                  p-4
                "
              >
                <p
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-[#9da0a8]
                  "
                >
                  Personnel ID
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <UserRound
                    size={17}
                    className="text-[#d12b63]"
                  />

                  <span className="font-mono text-sm font-semibold text-[#3b4658]">
                    {triage.personnel_id}
                  </span>
                </div>
              </div>


              {/* Risk */}
              <div
                className="
                  rounded-2xl
                  border
                  border-[#f0dce3]
                  bg-[#fffafb]
                  p-4
                "
              >
                <p
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-[#9da0a8]
                  "
                >
                  Risk Tier
                </p>

                <div className="mt-2">
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-[#fff0f0]
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      text-[#b04b4b]
                    "
                  >
                    <span className="h-2 w-2 rounded-full bg-[#d15c5c]" />

                    {triage.risk_tier}
                  </span>
                </div>
              </div>
            </div>


            {/* ======================================
                Primary contributing factor
            ====================================== */}
            <div
              className="
                rounded-2xl
                border
                border-[#f0dce3]
                bg-[#fff8fa]
                p-4
              "
            >
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#fbe0e9]
                  "
                >
                  <AlertTriangle
                    size={18}
                    className="text-[#c51f59]"
                  />
                </div>

                <div>
                  <p
                    className="
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-wide
                      text-[#9da0a8]
                    "
                  >
                    Primary Contributing Factor
                  </p>

                  <p className="mt-1.5 text-sm leading-6 text-[#68758a]">
                    {triage.primary_shap_driver}
                  </p>
                </div>
              </div>
            </div>


            {/* ======================================
                Suggested action
            ====================================== */}
            <div
              className="
                rounded-2xl
                border
                border-[#f2df91]
                bg-[#fffdf1]
                p-4
              "
            >
              <div className="flex items-start gap-3">
                <Clock3
                  size={18}
                  className="mt-0.5 shrink-0 text-[#d18a13]"
                />

                <div>
                  <p
                    className="
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-wide
                      text-[#a77c25]
                    "
                  >
                    Suggested Action
                  </p>

                  <p className="mt-1 text-sm leading-5 text-[#68758a]">
                    {triage.suggested_action}
                  </p>
                </div>
              </div>
            </div>


            {/* ======================================
                Action type
            ====================================== */}
            <div>
              <label
                htmlFor="intervention-action"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#3b4658]
                "
              >
                Action Type
              </label>

              <input
                id="intervention-action"
                type="text"
                value={actionType}
                onChange={(event) =>
                  setActionType(event.target.value)
                }
                placeholder="Enter the intervention action"
                disabled={submitting}
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#e8dce1]
                  bg-[#fffafb]
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-[#3b4658]
                  outline-none
                  transition
                  placeholder:text-[#a7adb6]
                  hover:bg-white
                  focus:border-[#d12b63]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#d12b63]/15
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              <p className="mt-1.5 text-xs text-[#9da0a8]">
                The suggested action has been prefilled. Edit it if
                the intervention taken differs.
              </p>
            </div>


            {/* ======================================
                Notes
            ====================================== */}
            <div>
              <label
                htmlFor="intervention-notes"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#3b4658]
                "
              >
                Notes
              </label>

              <textarea
                id="intervention-notes"
                value={notes}
                onChange={(event) =>
                  setNotes(event.target.value)
                }
                placeholder="Add relevant notes about the intervention..."
                rows={4}
                disabled={submitting}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-[#e8dce1]
                  bg-[#fffafb]
                  px-4
                  py-3
                  text-sm
                  leading-6
                  text-[#3b4658]
                  outline-none
                  transition
                  placeholder:text-[#a7adb6]
                  hover:bg-white
                  focus:border-[#d12b63]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#d12b63]/15
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              <p className="mt-1.5 text-xs text-[#9da0a8]">
                Record only information relevant to the welfare
                intervention.
              </p>
            </div>


            {/* ======================================
                Error
            ====================================== */}
            {error && (
              <div
                className="
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-[#f0cfd8]
                  bg-[#fff1f4]
                  px-4
                  py-3
                "
              >
                <AlertTriangle
                  size={18}
                  className="mt-0.5 shrink-0 text-[#c51f59]"
                />

                <p className="text-sm leading-5 text-[#7d2947]">
                  {error}
                </p>
              </div>
            )}


            {/* ======================================
                Success
            ====================================== */}
            {success && (
              <div
                className="
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-[#d8ead9]
                  bg-[#f2faf3]
                  px-4
                  py-3
                "
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-[#5b9560]"
                />

                <p className="text-sm leading-5 text-[#477a47]">
                  {success}
                </p>
              </div>
            )}
          </div>


          {/* ==========================================
              Footer Actions
          ========================================== */}
          <div
            className="
              flex
              flex-col-reverse
              gap-3
              border-t
              border-[#f0e3e7]
              bg-[#fffafb]
              px-6
              py-5
              sm:flex-row
              sm:justify-end
              sm:px-7
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="
                min-h-[46px]
                rounded-xl
                border
                border-[#efd6df]
                bg-white
                px-5
                text-sm
                font-semibold
                text-[#8d3152]
                transition
                hover:bg-[#fff5f8]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                submitting ||
                !actionType.trim()
              }
              className="
                inline-flex
                min-h-[46px]
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#d12b63]
                px-5
                text-sm
                font-semibold
                text-white
                shadow-[0_5px_14px_rgba(209,43,99,0.20)]
                transition
                hover:bg-[#a91f4e]
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {submitting ? (
                <>
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />

                  Saving...
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />

                  Record Intervention
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}