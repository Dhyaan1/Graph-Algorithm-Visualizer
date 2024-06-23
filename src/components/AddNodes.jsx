import React from "react";
import Button1 from "./Buttons/Button1";

export default function AddNodes({
  nodeCount,
  setNodeCount,
  myNodes,
  setMyNode,
}) {
  function AddNode() {
    const newNode = {
      id: `${nodeCount + 1}`,
      label: `${nodeCount + 1}`,
    };
    setNodeCount(nodeCount + 1);
    setMyNode([...myNodes, newNode]);
  }
  return (
    <>
      <Button1 onClick={AddNode} disabled={false}>
        Add Node
      </Button1>
    </>
  );
}
