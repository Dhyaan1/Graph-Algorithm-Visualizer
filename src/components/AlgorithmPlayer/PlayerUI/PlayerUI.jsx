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
      <div className="flex items-center justify-center ml-10 space-x-40 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
        <button
          onClick={goBackward}
          disabled={currentStepIndex === 0}
          aria-label="Rewind"
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiRewind className="h-10 w-10" />
        </button>
        <button
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlaying ? (
            <FiPause className="h-10 w-10" />
          ) : (
            <FiPlay className="h-10 w-10" />
          )}
        </button>
        <button
          onClick={goForward}
          disabled={currentStepIndex === steps.length - 1}
          aria-label="Forward"
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiFastForward className="h-10 w-10" />
        </button>
      </div>
    </>
  );
}
