/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Button1 from "./Buttons/Button1";

export default function DeleteEdges({
  myEdges,
  setMyEdges,
  selections,
  setSelections,
}) {
  const [disableDeleteEdge, setDisableDeleteEdge] = useState(true);

  useEffect(() => {
    if (selections.length === 0) {
      setDisableDeleteEdge(true);
    }
    if (selections.length !== 1) {
      setDisableDeleteEdge(true);
    }
    if (selections.length === 1 && selections[0].includes("->")) {
      setDisableDeleteEdge(false);
    }
  }, [selections]);
  function DeleteEdge(EdgeId) {
    const newEdges = myEdges.filter((edge) => edge.id !== EdgeId);
    setMyEdges(newEdges);
    setDisableDeleteEdge(true);
    setSelections([]);
  }

  return (
    <>
      {!disableDeleteEdge && (
        <Button1
          disabled={disableDeleteEdge}
          onClick={() => DeleteEdge(selections[0])}
        >
          Delete Edge
        </Button1>
      )}
    </>
  );
}
