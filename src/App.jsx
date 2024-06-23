import { useEffect, useRef, useState } from "react";
import "./App.css";
import { GraphCanvas, useSelection } from "reagraph";
import { dummyedges, dummynodes } from "./assets/data/dummydata";
import Button1 from "./components/Buttons/Button1";
import theme from "./assets/theme/theme";

function App() {
  const graphRef = useRef(null);
  // const [customSelections, setCustomSelections] = useState([]);

  const [myNodes, setMyNode] = useState(dummynodes);

  const [myEdges, setMyEdges] = useState(dummyedges);
  const [nodeCount, setNodeCount] = useState(myNodes.length);

  const [disableDeleteNode, setDisableDeleteNode] = useState(true);
  const [disableDeleteEdge, setDisableDeleteEdge] = useState(true);
  const [disableAddEdge, setDisableAddEdge] = useState(true);

  const {
    selections,
    onNodeClick,
    // addSelection,
    actives,
    setSelections,
    onNodePointerOver,
    onNodePointerOut,
    toggleSelection,
    onCanvasClick,
  } = useSelection({
    ref: graphRef,
    nodes: myNodes,
    edges: myEdges,
    type: "multi",
    pathHoverType: "all",
    selections: [],
  });

  // useEffect(() => {  // This useEffect is used to automatically add edge between two selected nodes
  //   if (selections.length === 2) {
  //     const newEdge = {
  //       id: `${selections[0]}->${selections[1]}`,
  //       source: selections[0],
  //       target: selections[1],
  //       label: `Edge ${selections[0]}-${selections[1]}`,
  //     };
  //     setMyEdges([...myEdges, newEdge]);
  //     setSelections([]);
  //   }
  // }, [selections, myEdges, setSelections]);

  useEffect(() => {
    if (selections.length === 0) {
      setDisableDeleteNode(true);
      setDisableDeleteEdge(true);
      setDisableAddEdge(true);
    }
    //only for single node selection
    if (selections.length === 1 && selections[0][0] === "n") {
      setDisableDeleteNode(false);
    }
    //only for single edge selection
    if (selections.length === 1 && selections[0][0] === "E") {
      setDisableDeleteEdge(false);
    }
    //only for two node selection
    if (
      selections.length === 2 &&
      selections[0][0] === "n" &&
      selections[1][0] === "n"
    ) {
      setDisableAddEdge(false);
    }
  }, [selections]);

  function handleNodeClick(node) {
    onNodeClick(node); // Dont really need this anymore
    toggleSelection(node.id);
    OnNodeClickNew(node);
  }

  function handleEdgeClick(edge, e) {
    console.log("Edge Clicked", edge, "\nEvent", e);
    toggleSelection(edge.id);
  }

  function OnNodeClickNew(e) {
    console.log("Node Clicked", e);
  }

  function AddNode() {
    //bug: if you delete a node and add a new node, the new node will have the same id as an existing node
    const newNode = {
      id: `n-${nodeCount + 1}`,
      label: `${nodeCount + 1}`,
    };
    setNodeCount(nodeCount + 1);
    setMyNode([...myNodes, newNode]);
  }

  function DeleteNode(NodeId) {
    const newNodes = myNodes.filter((node) => node.id !== NodeId);
    setMyNode(newNodes);
    setDisableDeleteNode(true);
    setSelections([]);
  }

  function AddEdge(sourceId, targetId) {
    const newEdge = {
      id: `E-${sourceId}->${targetId}`,
      source: sourceId,
      target: targetId,
      label: `Edge ${sourceId}-${targetId}`,
    };
    setMyEdges([...myEdges, newEdge]);
    setSelections([]);
    setDisableAddEdge(true);
  }

  function DeleteEdge(EdgeId) {
    const newEdges = myEdges.filter((edge) => edge.id !== EdgeId);
    setMyEdges(newEdges);
    setDisableDeleteEdge(true);
    setSelections([]);
  }

  function ChangeNodeColor(nodeId) {
    const newNodes = myNodes.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          fill: "#F6F930",
        };
      }
      return node;
    });
    setMyNode(newNodes);
  }

  function ClearCanvas() {
    setMyEdges([]);
    setMyNode([]);
  }

  // function handleIncrementalSelection(node) {
  //   addSelection(node);
  // }

  return (
    <>
      <div className="h-screen w-screen relative">
        <Button1 onClick={ClearCanvas}>Clear Canvas</Button1>
        <Button1 onClick={() => console.log(myNodes)}>
          Console Log Nodes
        </Button1>
        <Button1 onClick={() => console.log(actives)}>
          Console Log Actives
        </Button1>
        <Button1 onClick={() => ChangeNodeColor(selections[0])}>
          Change Node Color
        </Button1>
        <Button1 onClick={() => console.log(selections)}>
          Console Log Selections
        </Button1>
        <Button1 onClick={() => console.log(myEdges)}>
          Console Log all Edges
        </Button1>
        <Button1 onClick={AddNode}>Add Node</Button1>
        <Button1
          disabled={disableAddEdge}
          onClick={() => AddEdge(selections[0], selections[1])}
        >
          Add Edge
        </Button1>
        <Button1
          disabled={disableDeleteNode}
          onClick={() => DeleteNode(selections[0])}
        >
          Delete Node
        </Button1>
        <Button1
          disabled={disableDeleteEdge}
          onClick={() => DeleteEdge(selections[0])}
        >
          Delete Edge
        </Button1>
        <div
          className="w-[75%] h-[75%] fixed top-1/2 left-1/2"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <GraphCanvas
            ref={graphRef}
            nodes={myNodes}
            edges={myEdges}
            actives={actives}
            theme={theme}
            onEdgeClick={handleEdgeClick}
            selections={selections}
            onCanvasClick={onCanvasClick}
            onNodeClick={handleNodeClick}
            onNodePointerOver={onNodePointerOver}
            onNodePointerOut={onNodePointerOut}
            // selections={["n-1", "1->2", "n-2"]}
          />
        </div>
      </div>
    </>
  );
}

export default App;
