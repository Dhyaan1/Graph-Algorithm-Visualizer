import { useRef, useState } from "react";
import "./App.css";
import { useSelection } from "reagraph";
import { dummyedges, dummynodes } from "./assets/data/dummydata";
import theme from "./assets/theme/theme";
import GraphDisplayPanel from "./components/GraphDisplayPanel/GraphDisplayPanel";
import FunctionalDisplayPanel from "./components/FunctionalDisplayPanel/FunctionalDisplayPanel";
import OutputDisplayPanel from "./components/OutputDisplayPanel/OutputDisplayPanel";
import { OutPutContextProvider } from "./components/context/OutPutContextProvider";
import WebsiteLogo from "./assets/icon-1.svg";

function App() {
  const graphRef = useRef(null);
  const [myNodes, setMyNode] = useState(dummynodes);
  const [isDirected, setIsDirected] = useState("none");
  const [isWeighted, setIsWeighted] = useState(false);
  const [myEdges, setMyEdges] = useState(dummyedges);
  const [nodeCount, setNodeCount] = useState(myNodes.length);
  const [currentAlgorithm, setCurrentAlgorithm] = useState("none");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

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
      <a
        href="https://drive.google.com/file/d/13_UUkqcGD7KFx85PR4pgCD9R1sAPelnN/view?usp=drive_link"
        target="_blank"
        className="m-4 absolute top-20 max-[711px]:top-0 max-[551px]:relative right-0 z-10 inline-flex items-center justify-center gap-4 px-5 py-2 text-base font-medium rounded-lg text-gray-400 bg-[#0B132B] border-[2px] border-[#3A506B] hover:bg-gray-700 hover:text-white"
      >
        <img className="w-8 h-8" src={WebsiteLogo} alt="InspectElementLogo1" />
        <div className="flex items-center justify-center">
          <span className="w-full">Read the Docs</span>
          <svg
            className="w-4 h-4 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </div>
      </a>

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
            currentStepIndex={currentStepIndex}
            setCurrentStepIndex={setCurrentStepIndex}
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
            <OutputDisplayPanel
              currentAlgorithm={currentAlgorithm}
              currentStepIndex={currentStepIndex}
            />
          </div>
        </div>
      </OutPutContextProvider>
    </>
  );
}

export default App;
