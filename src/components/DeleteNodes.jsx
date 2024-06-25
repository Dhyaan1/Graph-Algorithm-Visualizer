/* eslint-disable react/prop-types */
import { DeleteNode } from "../functions/NodeFunctions";
import Button1 from "./Buttons/Button1";
import { useState, useEffect } from "react";

export default function DeleteNodes({
  selections,
  myNodes,
  myEdges,
  setMyEdges,
  setMyNode,
  setSelections,
}) {
  const [disableDeleteNode, setDisableDeleteNode] = useState(true);
  useEffect(() => {
    if (selections.length === 0) {
      setDisableDeleteNode(true);
    }
    if (selections.length > 1) {
      setDisableDeleteNode(true);
    }
    //only for single node selection
    if (selections.length === 1 && !selections[0].includes("->")) {
      setDisableDeleteNode(false);
    }
    //only for two node selection
  }, [selections]);
  return (
    <>
      {!disableDeleteNode && (
        <Button1
          disabled={disableDeleteNode}
          onClick={() =>
            DeleteNode(
              selections[0],
              myNodes,
              myEdges,
              setMyEdges,
              setMyNode,
              setDisableDeleteNode,
              setSelections
            )
          }
        >
          Delete Node
        </Button1>
      )}
    </>
  );
}
