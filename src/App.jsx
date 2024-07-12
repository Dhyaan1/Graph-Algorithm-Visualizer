import { useRef, useState } from "react";
import "./App.css";
import { useSelection } from "reagraph";
import { dummyedges, dummynodes } from "./assets/data/dummydata";
import theme from "./assets/theme/theme";
import GraphDisplayPanel from "./components/GraphDisplayPanel/GraphDisplayPanel";
import FunctionalDisplayPanel from "./components/FunctionalDisplayPanel/FunctionalDisplayPanel";
import OutputDisplayPanel from "./components/OutputDisplayPanel/OutputDisplayPanel";
import { OutPutContextProvider } from "./components/context/OutPutContextProvider";

function App() {
  const graphRef = useRef(null);
  const [myNodes, setMyNode] = useState(dummynodes);
  const [isDirected, setIsDirected] = useState("none");
  const [isWeighted, setIsWeighted] = useState(false);
  const [myEdges, setMyEdges] = useState(dummyedges);
  const [nodeCount, setNodeCount] = useState(myNodes.length);
  const [currentAlgorithm, setCurrentAlgorithm] = useState("none");

  const {
    selections,
    onNodeClick,
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
      <OutPutContextProvider>
        <div className="h-screen w-screen relative flex flex-col max-[950px]:h-auto">
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
            isWeighted={isWeighted}
            setIsWeighted={setIsWeighted}
            currentAlgorithm={currentAlgorithm}
            setCurrentAlgorithm={setCurrentAlgorithm}
          />
          <div className="h-[70svh] min-h-[70svh] gap-1 w-screen flex max-[950px]:flex-wrap p-2">
            <GraphDisplayPanel
              graphRef={graphRef}
              onNodeClick={onNodeClick}
              toggleSelection={toggleSelection}
              myNodes={myNodes}
              myEdges={myEdges}
              actives={actives}
              theme={theme}
              isDirected={isDirected}
              isWeighted={isWeighted}
              selections={selections}
              onCanvasClick={onCanvasClick}
              onNodePointerOver={onNodePointerOver}
              onNodePointerOut={onNodePointerOut}
              currentAlgorithm={currentAlgorithm}
            />
            <OutputDisplayPanel />
          </div>
        </div>
      </OutPutContextProvider>
    </>
  );
}

export default App;
