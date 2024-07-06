/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Button1 from "../Buttons/Button1";

export default function AlgorithmPlayerForDijkstra({
  currentAlgorithm,
  steps,
  setMyNode,
  setSelections,
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  function colorNodes(visitedNodes, currentNodeId, path) {
    setMyNode((currentNodes) => {
      const newNodes = currentNodes.map((node) => {
        let color;
        const nodeIdAsNumber = parseInt(node.id, 10); // Convert node.id to a number
        if (path.includes(nodeIdAsNumber)) {
          color = "green"; // Color for the nodes in the path
        } else if (nodeIdAsNumber === currentNodeId) {
          color = "#1C7C54"; // Color for the current node
        } else if (visitedNodes.includes(nodeIdAsNumber)) {
          color = "red"; // Color for visited nodes
        } else {
          color = "#B9C74E"; // Default color
        }
        return {
          ...node,
          fill: color,
        };
      });
      return newNodes;
    });
  }

  function highlightPath(path) {
    let prev = path[0];
    let edgeIds = [];
    for (let i = 1; i < path.length; i++) {
      let val1 = prev + "->" + path[i];
      edgeIds.push(val1);
      const val2 = path[i] + "->" + prev;
      edgeIds.push(val2);
      prev = path[i];
    }
    setSelections(edgeIds);
  }

  const goForward = () => {
    setCurrentStepIndex((prevIndex) => {
      const newIndex = Math.min(prevIndex + 1, steps.length - 1);
      // Check if we've reached the last step after updating
      if (newIndex === steps.length - 1) {
        // Highlight the path when the last step is reached
        highlightPath(steps[newIndex].path);
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
      }, 1500);
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
    if (currentAlgorithm === "dijkstra's") {
      if (steps.length > 0) {
        const currentStep = steps[currentStepIndex];
        // Assuming colorNodes function is defined and available in this scope
        colorNodes(
          currentStep.visitedNodes,
          currentStep.currentNode,
          currentStep.path
        );
      }
    }
  }, [currentStepIndex, steps]);

  useEffect(() => {
    // Reset the current step index when the steps array changes (e.g., when the algorithm is restarted)
    setCurrentStepIndex(0);
  }, [steps]);

  return (
    <div>
      <Button1 onClick={goBackward} disabled={currentStepIndex === 0}>
        Backward
      </Button1>
      <Button1 onClick={togglePlayPause}>
        {isPlaying ? "Pause" : "Play Dijkstra"}
      </Button1>
      <Button1
        onClick={goForward}
        disabled={currentStepIndex === steps.length - 1}
      >
        Forward
      </Button1>
    </div>
  );
}
