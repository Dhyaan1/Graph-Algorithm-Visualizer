import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useSelection } from "reagraph";
import { dummyedges, dummynodes } from "./assets/data/dummydata";
import theme from "./assets/theme/theme";
import GraphDisplayPanel from "./components/GraphDisplayPanel/GraphDisplayPanel";
import FunctionalDisplayPanel from "./components/FunctionalDisplayPanel/FunctionalDisplayPanel";
import OutputDisplayPanel from "./components/OutputDisplayPanel/OutputDisplayPanel";

function App() {
  const graphRef = useRef(null);
  const [myNodes, setMyNode] = useState(dummynodes);
  const [isDirected, setIsDirected] = useState("none");
  const [myEdges, setMyEdges] = useState(dummyedges);
  const [nodeCount, setNodeCount] = useState(myNodes.length);
  const [disableDeleteNode, setDisableDeleteNode] = useState(true);

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
    }
    //only for single node selection
    if (selections.length === 1 && !selections[0].includes("->")) {
      setDisableDeleteNode(false);
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
      <div className="h-screen w-screen relative flex flex-col">
        <FunctionalDisplayPanel
          setMyEdges={setMyEdges}
          setMyNode={setMyNode}
          setNodeCount={setNodeCount}
          myNodes={myNodes}
          myEdges={myEdges}
          selections={selections}
          setSelections={setSelections}
          nodeCount={nodeCount}
          isDirected={isDirected}
          handleDirectedOrUnDirected={handleDirectedOrUnDirected}
          ChangeNodeColor={ChangeNodeColor}
          createAdjacencyGraph={createAdjacencyGraph}
          convertToAdjacencyGraph={convertToAdjacencyGraph}
          DeleteNode={DeleteNode}
          disableDeleteNode={disableDeleteNode}
        />
        <div className="h-[80svh] min-h-[80svh] w-screen flex">
          <GraphDisplayPanel
            graphRef={graphRef}
            myNodes={myNodes}
            myEdges={myEdges}
            actives={actives}
            theme={theme}
            isDirected={isDirected}
            handleEdgeClick={handleEdgeClick}
            selections={selections}
            onCanvasClick={onCanvasClick}
            handleNodeClick={handleNodeClick}
            onNodePointerOver={onNodePointerOver}
            onNodePointerOut={onNodePointerOut}
          />
          <OutputDisplayPanel />

          {/* <div className="flex flex-col">
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
            <Button1
              onClick={() => console.log(convertToAdjacencyGraph(myEdges))}
            >
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
          </div> */}
          {/* <Button1
            onClick={() => handleTraversalColorChange(["n-1", "n-2", "n-3"])}
          >
            Change Color of 3 nodes[n-1, n-2, n-3]
          </Button1> */}
        </div>
      </div>
    </>
  );
}

export default App;
