/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";
import Button1 from "./Buttons/Button1";

export default function AddEdges({
  myEdges,
  setMyEdges,
  selections,
  setSelections,
}) {
  const [disableAddEdge, setDisableAddEdge] = useState(true);
  useEffect(() => {
    if (selections.length === 0) {
      setDisableAddEdge(true);
    }

    if (
      selections.length === 2 &&
      !selections[0].includes("->") &&
      !selections[1].includes("->")
    ) {
      setDisableAddEdge(false);
    }
    if (selections.length !== 2) {
      setDisableAddEdge(true);
    }
  }, [selections]);
  function AddEdge(sourceId, targetId) {
    if (
      myEdges.find(
        (edge) =>
          (edge.source === sourceId && edge.target === targetId) ||
          (edge.source === targetId && edge.target === sourceId)
      )
    ) {
      alert("Edge already exists");
      return;
    }
    const random = Math.floor(Math.random() * 100);
    const newEdge = {
      id: `${sourceId}->${targetId}`,
      source: sourceId,
      target: targetId,
      label: `${random}`,
      size: 3,
    };
    setMyEdges([...myEdges, newEdge]);
    setSelections([]);
    setDisableAddEdge(true);
  }
  return (
    <Button1
      disabled={disableAddEdge}
      onClick={() => AddEdge(selections[0], selections[1])}
    >
      Add Edge
    </Button1>
  );
}
