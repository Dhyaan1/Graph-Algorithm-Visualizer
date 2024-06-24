/* eslint-disable react/prop-types */
import AddEdges from "../AddEdges";
import AddNodes from "../AddNodes";
import Button1 from "../Buttons/Button1";
import DeleteEdges from "../DeleteEdges";

export default function FunctionalDisplayPanel({
  setMyEdges,
  setMyNode,
  setNodeCount,
  myNodes,
  myEdges,
  selections,
  setSelections,
  nodeCount,
  isDirected,
  handleDirectedOrUnDirected,
  ChangeNodeColor,
  createAdjacencyGraph,
  convertToAdjacencyGraph,
  DeleteNode,
  disableDeleteNode,
}) {
  function ClearCanvas() {
    setMyEdges([]);
    setMyNode([]);
    setNodeCount(0);
  }

  return (
    <>
      <div className="flex flex-col w-[20svw] min-w-[20svw] h-full">
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
      </div>
    </>
  );
}
