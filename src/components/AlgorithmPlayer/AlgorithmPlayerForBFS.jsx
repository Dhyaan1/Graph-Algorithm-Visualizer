/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import PlayerUI from "./PlayerUI/PlayerUI";

export default function AlgorithmPlayerForBFS({
  currentAlgorithm,
  steps,
  setMyNode,
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  function colorNodes(queuedNodes, visitedNodes, currentNodeId) {
    setMyNode((currentNodes) => {
      const newNodes = currentNodes.map((node) => {
        let color;
        const nodeIdAsNumber = parseInt(node.id, 10); // Convert node.id to a number
        if (nodeIdAsNumber === currentNodeId) {
          color = "#5BC0BE"; // Color for the current node teal
        } else if (queuedNodes?.includes(nodeIdAsNumber)) {
          color = "#6c757d"; // Color for queued nodes grey
        } else if (visitedNodes.includes(nodeIdAsNumber)) {
          color = "#d90429"; // Color for visited nodes red
        } else {
          color = "#8F7900"; // Default color
        }
        return {
          ...node,
          fill: color,
        };
      });
      return newNodes;
    });
  }

  const goForward = () => {
    setCurrentStepIndex((prevIndex) => {
      const newIndex = Math.min(prevIndex + 1, steps.length - 1);
      // Check if we've reached the last step after updating
      if (newIndex === steps.length - 1) {
        setIsPlaying(false);
      }
      return newIndex;
    });
  };

  const goBackward = () => {
    setCurrentStepIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      // Set up an interval that calls goForward every 1 second
      const id = setInterval(() => {
        goForward();
      }, 1000);
      setIntervalId(id); // Store the interval ID
    } else {
      // Clear the interval if isPlaying is toggled to false
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null); // Reset the interval ID in state
      }
    }

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (currentAlgorithm === "BFS") {
      if (steps.length > 0) {
        const currentStep = steps[currentStepIndex];
        // Assuming colorNodes function is defined and available in this scope
        colorNodes(
          currentStep?.queuedNodes,
          currentStep.visitedNodes,
          currentStep.currentNode
        );
      }
    }
  }, [currentStepIndex, steps]);

  useEffect(() => {
    // Reset the current step index when the steps array changes (e.g., when a algorithm is restarted)
    setCurrentStepIndex(0);
  }, [steps]);

  return (
    <PlayerUI
      steps={steps}
      currentStepIndex={currentStepIndex}
      isPlaying={isPlaying}
      goBackward={goBackward}
      goForward={goForward}
      togglePlayPause={togglePlayPause}
    />
  );
}
