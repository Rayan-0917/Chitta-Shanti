import { useState } from "react";

import ProgressStepper from "./ProgressStepper";
import QuestionStep from "./QuestionStep";
import RecordingStep from "./RecordingStep";
import QuestionnaireStep from "./QuestionnaireStep";
import ResultStep from "./ResultStep";


//Mock results
const MOCK_RESULT = {
  session_id: "unique_session_id_here",
  personnel_id: "user_service_id",
  readiness_status: "Fit for Duty",
  classification: "Normal",
  stress_probability: 0.15,
  shap_attribution: [
    {
      feature: "rmssd_ms",
      description: "Heart rate variability within normal bounds",
    },
  ],
  timestamp: "2026-09-13T20:37:10Z",
};



const DEFAULT_QUESTION =
  "Tell me about a moment this week that felt harder to get through than usual.";

const ALTERNATIVE_QUESTIONS = [
  "Can you describe something recently that affected your energy or concentration?",

  "What has been on your mind more than usual over the past few days?",

  "Tell me about something this week that made you feel particularly tired or overwhelmed.",
];

export default function AssessmentFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [question, setQuestion] = useState(DEFAULT_QUESTION);
  const [recordedVideo, setRecordedVideo] = useState(null);

  const handleStartRecording = () => {
    setCurrentStep(2);
  };

  const handleDifferentPrompt = () => {
    const availableQuestions = ALTERNATIVE_QUESTIONS.filter(
      (item) => item !== question
    );

    const randomIndex = Math.floor(
      Math.random() * availableQuestions.length
    );

    setQuestion(availableQuestions[randomIndex]);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuestionStep
            question={question}
            onStartRecording={handleStartRecording}
            onDifferentPrompt={handleDifferentPrompt}
          />
        );

      case 2:
  return (
    <RecordingStep
      onComplete={(videoBlob) => {
        setRecordedVideo(videoBlob);
        setCurrentStep(3);
      }}
    />
  );

case 3:
  return (
    <QuestionnaireStep
      onComplete={(questionnaireAnswers) => {
        console.log("Questionnaire answers:", questionnaireAnswers);

        setCurrentStep(4);
      }}
    />
  );

      case 4:
        return (
<ResultStep
  result={MOCK_RESULT}
  onNewAssessment={() => {
    setCurrentStep(1);
    setQuestion(DEFAULT_QUESTION);
    setRecordedVideo(null);
  }}
  onViewHistory={() => {
    // We'll connect this to /candidate/history
    // once we build the History page.
  }}
/>
        );

      default:
        return null;
    }
  };

  const stepDescription = {
    1: "read your prompt",
    2: "record your response",
    3: "reflect on your wellbeing",
    4: "review your result",
  };

  return (
    <section className="w-full">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1
          className="
            text-[#172033]
            text-4xl
            sm:text-[44px]
            font-semibold
            tracking-[0.12em]
            uppercase
          "
        >
          New Assessment
        </h1>

        <p
          className="
            mt-2
            text-[#858b97]
            text-[16px]
          "
        >
          Step {currentStep} of 4 —{" "}
          {stepDescription[currentStep]}
        </p>
      </div>

      {/* Stepper */}
      <div className="mb-10">
        <ProgressStepper currentStep={currentStep} />
      </div>

      {/* Current step */}
      {renderStep()}
    </section>
  );
}