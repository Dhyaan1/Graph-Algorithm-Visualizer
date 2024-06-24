import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useSelection } from "reagraph";
import { dummyedges, dummynodes } from "./assets/data/dummydata";
import theme from "./assets/theme/theme";
import GraphDisplayPanel from "./components/GraphDisplayPanel/GraphDisplayPanel";
import FunctionalDisplayPanel from "./components/FunctionalDisplayPanel/FunctionalDisplayPanel";
import OutputDisplayPanel from "./components/OutputDisplayPanel/OutputDisplayPanel";
import Button1 from "./components/Buttons/Button1";
import {createAdjacencyGraph} from "./functions/NodeFunctions";

function App() {
  const graphRef = useRef(null);
  const [myNodes, setMyNode] = useState(dummynodes);
  const [isDirected, setIsDirected] = useState("none");
  const [myEdges, setMyEdges] = useState(dummyedges);
  const [nodeCount, setNodeCount] = useState(myNodes.length);

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
          setIsDirected={setIsDirected}
        />
        <div className="h-[80svh] min-h-[80svh] w-screen flex">
          <GraphDisplayPanel
            graphRef={graphRef}
            onNodeClick={onNodeClick}
            toggleSelection={toggleSelection}
            myNodes={myNodes}
            myEdges={myEdges}
            actives={actives}
            theme={theme}
            isDirected={isDirected}
            selections={selections}
            onCanvasClick={onCanvasClick}
            onNodePointerOver={onNodePointerOver}
            onNodePointerOut={onNodePointerOut}
          />
          <OutputDisplayPanel />
        </div>
      </div>
    </>
  );
}

export default App;
