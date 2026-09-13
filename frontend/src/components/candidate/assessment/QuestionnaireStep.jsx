import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "How many hours was your most recent duty shift?",
    type: "number",
    placeholder: "Enter hours",
  },
  {
    id: 2,
    question:
      "How many hours have you been on duty continuously without a proper rest break?",
    type: "number",
    placeholder: "Enter hours",
  },
  {
    id: 3,
    question: "How many hours of sleep did you get last night?",
    type: "number",
    placeholder: "Enter hours",
  },
  {
    id: 4,
    question:
      "How would you rate the quality of your sleep last night, from 1 to 10?",
    type: "scale",
  },
  {
    id: 5,
    question:
      "How many minutes of physical activity or exercise do you usually get in a day?",
    type: "number",
    placeholder: "Enter minutes",
  },
  {
    id: 6,
    question:
      "On a scale of 1 to 10, how stressful has your recent duty period felt?",
    type: "scale",
  },
  {
    id: 7,
    question:
      "How many hours of rest or relaxation did you get before starting your most recent duty?",
    type: "number",
    placeholder: "Enter hours",
  },
  {
    id: 8,
    question:
      "Approximately how many hours do you spend on your feet or physically active during a typical duty day?",
    type: "number",
    placeholder: "Enter hours",
  },
  {
    id: 9,
    question:
      "On a scale of 1 to 10, how energetic or rested do you feel at the moment?",
    type: "scale",
  },
  {
    id: 10,
    question:
      "How many hours of your typical day are affected by duty-related responsibilities, including preparation and recovery time?",
    type: "number",
    placeholder: "Enter hours",
  },
];

export default function QuestionnaireStep({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = QUESTIONS[currentQuestion];

  const currentAnswer = answers[question.id] ?? "";

  const updateAnswer = (value) => {
    setAnswers((previous) => ({
      ...previous,
      [question.id]: value,
    }));
  };

  const handleNext = () => {
    if (currentAnswer === "" || currentAnswer === null) {
      return;
    }

    if (currentQuestion === QUESTIONS.length - 1) {
      onComplete(answers);
      return;
    }

    setCurrentQuestion((previous) => previous + 1);
  };

  const handlePrevious = () => {
    if (currentQuestion === 0) return;

    setCurrentQuestion((previous) => previous - 1);
  };

  const progress =
    ((currentQuestion + 1) / QUESTIONS.length) * 100;

  return (
    <div className="w-full max-w-[760px] mx-auto">

      {/* Questionnaire card */}
      <div
        className="
          bg-white
          rounded-[24px]
          border border-[#f0dce3]
          shadow-[0_8px_25px_rgba(209,43,99,0.06)]
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="px-7 sm:px-10 pt-8">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#d12b63]">
                REFLECT
              </p>

              <p className="mt-1 text-sm text-[#9da0a8]">
                Question {currentQuestion + 1} of {QUESTIONS.length}
              </p>
            </div>

            <div
              className="
                h-11 w-11
                rounded-full
                bg-[#fff0f4]
                text-[#d12b63]
                flex items-center justify-center
              "
            >
              <CheckCircle2 size={21} />
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 h-2 w-full rounded-full bg-[#f5e5ea] overflow-hidden">
            <div
              className="
                h-full
                rounded-full
                bg-[#d12b63]
                transition-all duration-300
              "
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="px-7 sm:px-10 py-10">

          <h2
            className="
              text-[#172033]
              text-2xl
              sm:text-[27px]
              font-semibold
              leading-[1.35]
            "
          >
            {question.question}
          </h2>

          {/* Number input */}
          {question.type === "number" && (
            <div className="mt-8">
              <input
                type="number"
                min="0"
                step="0.1"
                value={currentAnswer}
                onChange={(event) =>
                  updateAnswer(event.target.value)
                }
                placeholder={question.placeholder}
                className="
                  w-full
                  px-5
                  py-4
                  rounded-xl
                  border border-[#e8d6de]
                  bg-[#fffafb]
                  text-[#172033]
                  text-lg
                  outline-none
                  focus:border-[#d12b63]
                  focus:ring-4
                  focus:ring-[#d12b63]/10
                  transition
                "
              />
            </div>
          )}

          {/* 1–10 scale */}
          {question.type === "scale" && (
            <div className="mt-8">

              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {Array.from({ length: 10 }, (_, index) => {
                  const value = index + 1;
                  const selected =
                    Number(currentAnswer) === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateAnswer(value)}
                      className={`
                        h-12
                        rounded-xl
                        border
                        font-semibold
                        transition-all
                        ${
                          selected
                            ? "bg-[#d12b63] border-[#d12b63] text-white shadow-[0_4px_0_#a91f4e]"
                            : "bg-[#fffafb] border-[#e8d6de] text-[#76243f] hover:bg-[#fff0f4] hover:border-[#dcaec0]"
                        }
                      `}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex justify-between text-xs text-[#9da0a8]">
                <span>1</span>
                <span>10</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div
          className="
            border-t border-[#f0dce3]
            px-7 sm:px-10
            py-5
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="
              inline-flex
              items-center
              gap-2
              px-5
              py-3
              rounded-xl
              border border-[#ead7df]
              bg-white
              text-[#76243f]
              font-semibold
              hover:bg-[#fff7f9]
              disabled:opacity-30
              disabled:cursor-not-allowed
              transition
            "
          >
            <ArrowLeft size={17} />
            Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentAnswer === ""}
            className="
              inline-flex
              items-center
              gap-2
              px-6
              py-3
              rounded-xl
              bg-[#d12b63]
              text-white
              font-semibold
              shadow-[0_5px_0_#a91f4e]
              hover:bg-[#bd2457]
              disabled:opacity-40
              disabled:cursor-not-allowed
              transition-all
            "
          >
            {currentQuestion === QUESTIONS.length - 1
              ? "Finish"
              : "Next"}

            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      {/* Small reassurance */}
      <p className="mt-5 text-center text-sm text-[#9da0a8]">
        Answer as accurately as you can. There are no right or wrong answers.
      </p>
    </div>
  );
}