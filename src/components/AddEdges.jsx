/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";
import Button1 from "./Buttons/Button1";
import { AnimatePresence } from "framer-motion";
import AddEdgeModal from "./Modals/AddEdgeModal";

export default function AddEdges({
  myEdges,
  setMyEdges,
  selections,
  setSelections,
}) {
  const [disableAddEdge, setDisableAddEdge] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleEdgeCostModal = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
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
  function AddEdge(sourceId, targetId, edgeCost) {
    if (
      myEdges.find(
        (edge) =>
          (edge.source === sourceId && edge.target === targetId) ||
          (edge.source === targetId && edge.target === sourceId)
      )
    ) {
      alert("Edge already exists");
      setShowModal(false);
      return;
    }
    if (edgeCost === undefined || edgeCost === "") {
      edgeCost = Math.floor(Math.random() * 100);
    }
    const newEdge = {
      id: `${sourceId}->${targetId}`,
      source: sourceId,
      target: targetId,
      label: `${edgeCost}`,
      size: 3,
    };
    setMyEdges([...myEdges, newEdge]);
    setSelections([]);
    setDisableAddEdge(true);
    setShowModal(false);
  }
  return (
    <>
      {!disableAddEdge && (
        <Button1 onClick={handleEdgeCostModal}>Add Edge</Button1>
      )}
      <AnimatePresence>
        {showModal && (
          <AddEdgeModal
            disableAddEdge={disableAddEdge}
            AddEdge={AddEdge}
            myEdges={myEdges}
            setMyEdges={setMyEdges}
            selections={selections}
            setSelections={setSelections}
            handleClose={() => handleModalClose()}
          />
        )}
      </AnimatePresence>
    </>
  );
}
