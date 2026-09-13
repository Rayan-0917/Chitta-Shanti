import { useEffect, useRef, useState } from "react";
import {
  Camera,
  CameraOff,
  Check,
  Mic,
  MicOff,
  RotateCcw,
  Square,
  Video,
} from "lucide-react";

export default function RecordingStep({ onComplete }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);

  const [error, setError] = useState("");

  // ---------------------------------------
  // Start camera + microphone
  // ---------------------------------------

  useEffect(() => {
    let mounted = true;

    const startCamera = async () => {
      try {
        setError("");

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (!mounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setIsCameraReady(true);
      } catch (err) {
        console.error("Camera access error:", err);

        setError(
          "Camera and microphone access is required for this assessment. Please allow access in your browser and try again."
        );
      }
    };

    startCamera();

    return () => {
      mounted = false;

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // ---------------------------------------
  // Start recording
  // ---------------------------------------

  const startRecording = () => {
    if (!streamRef.current) return;

    chunksRef.current = [];
    setRecordedBlob(null);

    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
      setRecordedUrl(null);
    }

    const recorder = new MediaRecorder(streamRef.current);

    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, {
        type: recorder.mimeType || "video/webm",
      });

      const url = URL.createObjectURL(blob);

      setRecordedBlob(blob);
      setRecordedUrl(url);
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };

    recorder.start();

    setElapsedSeconds(0);
    setIsRecording(true);

    timerRef.current = setInterval(() => {
      setElapsedSeconds((previous) => previous + 1);
    }, 1000);
  };

  // ---------------------------------------
  // Stop recording
  // ---------------------------------------

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  // ---------------------------------------
  // Retake
  // ---------------------------------------

  const retakeRecording = () => {
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
    }

    setRecordedUrl(null);
    setRecordedBlob(null);
    setElapsedSeconds(0);
  };

  // ---------------------------------------
  // Camera toggle
  // ---------------------------------------

  const toggleCamera = () => {
    if (!streamRef.current) return;

    const videoTracks = streamRef.current.getVideoTracks();

    videoTracks.forEach((track) => {
      track.enabled = !track.enabled;
    });

    setCameraEnabled((previous) => !previous);
  };

  // ---------------------------------------
  // Microphone toggle
  // ---------------------------------------

  const toggleMicrophone = () => {
    if (!streamRef.current) return;

    const audioTracks = streamRef.current.getAudioTracks();

    audioTracks.forEach((track) => {
      track.enabled = !track.enabled;
    });

    setMicEnabled((previous) => !previous);
  };

  // ---------------------------------------
  // Continue
  // ---------------------------------------

  const handleContinue = () => {
    if (!recordedBlob) return;

    onComplete(recordedBlob);
  };

  // ---------------------------------------
  // Timer formatting
  // ---------------------------------------

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  // ---------------------------------------
  // Error state
  // ---------------------------------------

  if (error) {
    return (
      <div className="w-full max-w-[760px] mx-auto">
        <div className="bg-white rounded-[24px] border border-[#f0dce3] shadow-[0_8px_25px_rgba(209,43,99,0.06)] px-8 py-14 text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-[#fff0f4] flex items-center justify-center text-[#d12b63]">
            <CameraOff size={28} />
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-[#172033]">
            Camera access required
          </h2>

          <p className="mt-3 max-w-[520px] mx-auto text-[#858b97] leading-6">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-7 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#d12b63] text-white font-semibold shadow-[0_5px_0_#a91f4e] hover:bg-[#bd2457] transition-all"
          >
            <RotateCcw size={18} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[760px] mx-auto">
      {/* Camera card */}
      <div className="bg-white rounded-[24px] border border-[#f0dce3] shadow-[0_8px_25px_rgba(209,43,99,0.06)] overflow-hidden">
        {/* Video preview */}
        <div className="relative aspect-video bg-[#171923] overflow-hidden">
          {!recordedUrl ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={`h-full w-full object-cover ${
                !cameraEnabled ? "opacity-0" : ""
              }`}
            />
          ) : (
            <video
              src={recordedUrl}
              controls
              playsInline
              className="h-full w-full object-cover"
            />
          )}

          {/* Camera disabled overlay */}
          {!cameraEnabled && !recordedUrl && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <CameraOff size={40} strokeWidth={1.5} />
              <p className="mt-3 text-sm">Camera is off</p>
            </div>
          )}

          {/* Recording indicator */}
          {isRecording && (
            <div className="absolute top-5 left-5 flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/60 text-white text-sm font-medium backdrop-blur-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff315f] animate-pulse" />
              Recording
            </div>
          )}

          {/* Timer */}
          {isRecording && (
            <div className="absolute top-5 right-5 px-4 py-2 rounded-full bg-black/60 text-white text-sm font-mono font-medium backdrop-blur-sm">
              {formatTime(elapsedSeconds)}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="px-6 sm:px-8 py-6">
          {!recordedUrl ? (
            <>
              <div className="flex items-center justify-center gap-4">
                {/* Camera toggle */}
                <button
                  type="button"
                  onClick={toggleCamera}
                  disabled={isRecording}
                  className="h-11 w-11 rounded-full border border-[#ecd7df] bg-[#fff7f9] text-[#76243f] flex items-center justify-center hover:bg-[#fbe9ef] disabled:opacity-40 transition"
                  title={cameraEnabled ? "Turn camera off" : "Turn camera on"}
                >
                  {cameraEnabled ? (
                    <Camera size={19} />
                  ) : (
                    <CameraOff size={19} />
                  )}
                </button>

                {/* Main recording button */}
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={startRecording}
                    disabled={!isCameraReady}
                    className="h-16 w-16 rounded-full bg-[#d12b63] text-white flex items-center justify-center shadow-[0_5px_0_#a91f4e] hover:bg-[#bd2457] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Video size={25} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="h-16 w-16 rounded-full bg-[#172033] text-white flex items-center justify-center shadow-[0_5px_0_#0c111c] hover:bg-[#232c3f] transition-all"
                  >
                    <Square size={21} fill="currentColor" />
                  </button>
                )}

                {/* Microphone toggle */}
                <button
                  type="button"
                  onClick={toggleMicrophone}
                  disabled={isRecording}
                  className="h-11 w-11 rounded-full border border-[#ecd7df] bg-[#fff7f9] text-[#76243f] flex items-center justify-center hover:bg-[#fbe9ef] disabled:opacity-40 transition"
                  title={micEnabled ? "Mute microphone" : "Unmute microphone"}
                >
                  {micEnabled ? (
                    <Mic size={19} />
                  ) : (
                    <MicOff size={19} />
                  )}
                </button>
              </div>

              <p className="mt-5 text-center text-sm text-[#858b97]">
                {isRecording
                  ? "Speak naturally. When you're finished, press the stop button."
                  : "When you're ready, press the button to begin recording."}
              </p>
            </>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={retakeRecording}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[#e8cdd7] bg-white text-[#76243f] font-semibold hover:bg-[#fff7f9] transition"
              >
                <RotateCcw size={18} />
                Retake
              </button>

              <button
                type="button"
                onClick={handleContinue}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#d12b63] text-white font-semibold shadow-[0_5px_0_#a91f4e] hover:bg-[#bd2457] transition-all"
              >
                <Check size={18} />
                Use this recording
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Information below camera */}
      <div className="mt-5 text-center">
        <p className="text-sm text-[#9da0a8]">
          Your camera and microphone are used only for this assessment.
        </p>
      </div>
    </div>
  );
}