import {
  Quote,
  RefreshCw,
  Video,
} from "lucide-react";

export default function QuestionStep({
  question,
  onStartRecording,
  onDifferentPrompt,
}) {
  return (
    <div className="w-full max-w-[700px] mx-auto">
      <div
        className="
          bg-white
          rounded-[24px]
          border border-[#f0dce3]
          shadow-[0_8px_25px_rgba(209,43,99,0.06)]
          px-8 sm:px-12
          py-10 sm:py-11
          text-center
        "
      >
        {/* Quote icon */}
        <div
          className="
            mx-auto
            h-14 w-14
            rounded-2xl
            bg-[#fff0f4]
            text-[#d12b63]
            flex items-center justify-center
            mb-7
          "
        >
          <Quote
            size={25}
            strokeWidth={2}
            fill="currentColor"
          />
        </div>

        {/* Question */}
        <h2
          className="
            text-[#172033]
            text-2xl sm:text-[26px]
            font-semibold
            leading-[1.3]
            max-w-[570px]
            mx-auto
          "
        >
          {question}
        </h2>

        {/* Description */}
        <p
          className="
            mt-6
            text-[#a0a5b0]
            text-[15px]
            leading-6
            max-w-[500px]
            mx-auto
          "
        >
          Answer out loud, in your own words. There's no
          right answer — this just helps set a natural
          baseline before you record.
        </p>

        {/* Buttons */}
        <div
          className="
            mt-8
            flex flex-col sm:flex-row
            items-center justify-center
            gap-4
          "
        >
          {/* Different prompt */}
          <button
            type="button"
            onClick={onDifferentPrompt}
            className="
              flex
              items-center
              gap-2
              text-[#a03b5b]
              font-medium
              text-[15px]
              underline
              underline-offset-4
              hover:text-[#d12b63]
              transition-colors
            "
          >
            <RefreshCw size={16} />

            Give me a different prompt
          </button>

          {/* Start recording */}
          <button
            type="button"
            onClick={onStartRecording}
            className="
              flex
              items-center
              gap-2
              px-6
              py-3.5
              rounded-xl
              bg-[#d12b63]
              text-white
              font-semibold

              shadow-[0_5px_0_#a91f4e]

              hover:bg-[#bd2457]
              hover:translate-y-[1px]
              hover:shadow-[0_4px_0_#a91f4e]

              active:translate-y-[3px]
              active:shadow-none

              transition-all
            "
          >
            <Video size={18} />

            I'm ready, start recording
          </button>
        </div>
      </div>
    </div>
  );
}