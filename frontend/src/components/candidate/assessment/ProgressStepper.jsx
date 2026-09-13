import {
  MessageCircle,
  Video,
  ClipboardCheck,
  Heart,
} from "lucide-react";

const steps = [
  {
    label: "Prompt",
    icon: MessageCircle,
  },
  {
    label: "Record",
    icon: Video,
  },
  {
    label: "Reflect",
    icon: ClipboardCheck,
  },
  {
    label: "Result",
    icon: Heart,
  },
];

export default function ProgressStepper({ currentStep = 1 }) {
  return (
    <div className="w-full max-w-[650px] mx-auto">
      <div className="flex items-start justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const Icon = step.icon;

          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div
              key={step.label}
              className="flex items-start flex-1 last:flex-none"
            >
              {/* Step */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    h-11 w-11
                    rounded-full
                    flex items-center justify-center
                    border-2
                    transition-all duration-300

                    ${
                      isActive
                        ? "border-[#d12b63] bg-white text-[#d12b63]"
                        : isCompleted
                        ? "border-[#d12b63] bg-[#d12b63] text-white"
                        : "border-[#e1dfe1] bg-white text-[#c8c6ca]"
                    }
                  `}
                >
                  <Icon size={19} strokeWidth={2} />
                </div>

                <span
                  className={`
                    mt-2
                    text-xs
                    font-medium

                    ${
                      isActive
                        ? "text-[#76243f]"
                        : "text-[#9da0a8]"
                    }
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    flex-1
                    h-[2px]
                    mt-[22px]
                    mx-3

                    ${
                      isCompleted
                        ? "bg-[#d12b63]"
                        : "bg-[#eadce1]"
                    }
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}