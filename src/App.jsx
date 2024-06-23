import { useEffect, useRef, useState } from "react";
import "./App.css";
import { GraphCanvas, useSelection } from "reagraph";
import { dummyedges, dummynodes } from "./assets/data/dummydata";
import Button1 from "./components/Buttons/Button1";
import theme from "./assets/theme/theme";
import AddNodes from "./components/AddNodes";
import AddEdges from "./components/AddEdges";
import DeleteEdges from "./components/DeleteEdges";

function App() {
  const graphRef = useRef(null);
  const [myNodes, setMyNode] = useState(dummynodes);
  const [isDirected, setIsDirected] = useState("none");
  const [myEdges, setMyEdges] = useState(dummyedges);
  const [nodeCount, setNodeCount] = useState(myNodes.length);
  const [disableDeleteNode, setDisableDeleteNode] = useState(true);
  const [disableDeleteEdge, setDisableDeleteEdge] = useState(true);

  const [adjacencyMatrix, setAdjacencyMatrix] = useState([]);
  function create2DArray(rows, cols) {
    let arr = new Array(rows);
    for (let i = 0; i < rows; i++) {
      arr[i] = new Array(cols).fill(0); // Initialize all elements to 0
    }
    return arr;
  }

  function createAdjacencyGraph() {
    const graph = create2DArray(nodeCount + 1, nodeCount + 1);
    myEdges.forEach((edge) => {
      const { source, target, label } = edge;
      graph[source][target] = label;
      if (isDirected === "none") {
        graph[target][source] = label;
      }
    });
    setAdjacencyMatrix(graph);
    console.log(graph);
  }

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
  useEffect(() => {
    if (selections.length === 0) {
      setDisableDeleteNode(true);
      setDisableDeleteEdge(true);
    }
    //only for single node selection
    if (selections.length === 1 && !selections[0].includes("->")) {
      setDisableDeleteNode(false);
    }
    //only for single edge selection
    if (selections.length === 1 && selections[0].includes("->")) {
      setDisableDeleteEdge(false);
    }
    //only for two node selection
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
  function DeleteNode(NodeId) {
    const newNodes = myNodes.filter((node) => node.id !== NodeId);
    setMyNode(newNodes);
    setDisableDeleteNode(true);
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
    setNodeCount(0);
  }

  function convertToAdjacencyGraph(edges) {
    const graph = {};
    edges.forEach((edge) => {
      const { id, source, target, label } = edge;
      if (!graph[id]) {
        graph[id] = { source, target, weight: label };
      }
    });
    return graph;
  }

  function handleDirectedOrUnDirected(event) {
    setIsDirected(event.target.value);
  }

  // Make a function to change the color of all the nodes in a given array of nodes ids
  function handleTraversalColorChange(nodeIds) {
    const newNodes = myNodes.map((node) => {
      if (nodeIds.includes(node.id)) {
        return {
          ...node,
          fill: "#F6F930",
        };
      }
      return node;
    });
    setMyNode(newNodes);
  }

  return (
    <>
      <div className="h-screen w-screen relative">
        <Button1 onClick={ClearCanvas}>Clear Canvas</Button1>
        <Button1 onClick={() => console.log(myNodes)}>
          Console Log Nodes
        </Button1>
        <AddNodes
          nodeCount={nodeCount}
          setNodeCount={setNodeCount}
          myNodes={myNodes}
          setMyNode={setMyNode}
        />
        <AddEdges
          myEdges={myEdges}
          setMyEdges={setMyEdges}
          selections={selections}
          setSelections={setSelections}
        />
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
        <Button1 onClick={createAdjacencyGraph}>
          console log adjacencyMatrix
        </Button1>
        <Button1 onClick={() => console.log(convertToAdjacencyGraph(myEdges))}>
          Generate AG
        </Button1>
        <Button1
          disabled={disableDeleteNode}
          onClick={() => DeleteNode(selections[0])}
        >
          Delete Node
        </Button1>
        <DeleteEdges
          myEdges={myEdges}
          setMyEdges={setMyEdges}
          selections={selections}
          setSelections={setSelections}
        />
        <div onChange={handleDirectedOrUnDirected}>
          <input
            type="radio"
            value="end"
            name="direction"
            defaultChecked={isDirected === "end"}
          />

          <label className="text-white" htmlFor="directed">
            Directed
          </label>
          <input
            type="radio"
            value="none"
            name="direction"
            defaultChecked={isDirected === "none"}
          />
          <label className="text-white" htmlFor="undirected">
            Undirected
          </label>
        </div>
        {/* <Button1
          onClick={() => handleTraversalColorChange(["n-1", "n-2", "n-3"])}
        >
          Change Color of 3 nodes[n-1, n-2, n-3]
        </Button1> */}
        <div
          className="w-[75%] h-[60%] fixed top-1/2 left-1/2"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <GraphCanvas
            ref={graphRef}
            nodes={myNodes}
            edges={myEdges}
            actives={actives}
            theme={theme}
            edgeLabelPosition="inline"
            labelType="all"
            edgeArrowPosition={isDirected}
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
