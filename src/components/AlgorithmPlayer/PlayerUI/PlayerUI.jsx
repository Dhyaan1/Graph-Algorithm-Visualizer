/* eslint-disable react/prop-types */
import { FiFastForward, FiPause, FiPlay, FiRewind } from "react-icons/fi";

export default function PlayerUI({
  steps,
  currentStepIndex,
  isPlaying,
  goBackward,
  goForward,
  togglePlayPause,
}) {
  return (
    <>
      <div className="flex items-center justify-center gap-9 mr-2 px-4 py-2 border-[2px] border-[#3A506B] bg-[#0B132B] text-white rounded-lg shadow-lg">
        <button
          onClick={goBackward}
          disabled={currentStepIndex === 0}
          aria-label="Rewind"
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiRewind className="h-9 w-9" />
        </button>
        <button
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlaying ? (
            <FiPause className="h-9 w-9" />
          ) : (
            <FiPlay className="h-9 w-9" />
          )}
        </button>
        <button
          onClick={goForward}
          disabled={currentStepIndex === steps.length - 1}
          aria-label="Forward"
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiFastForward className="h-9 w-9" />
        </button>
      </div>
    </>
  );
}
