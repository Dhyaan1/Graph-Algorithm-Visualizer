/* eslint-disable react/prop-types */
import { GraphCanvas } from "reagraph";
import NodeLegends from "./NodeLegends";

export default function GraphDisplayPanel({
  graphRef,
  toggleSelection,
  onNodeClick,
  myNodes,
  myEdges,
  actives,
  theme,
  isDirected,
  isWeighted,
  selections,
  onCanvasClick,
  onNodePointerOver,
  onNodePointerOut,
  currentAlgorithm,
}) {
  function handleNodeClick(node) {
    onNodeClick(node); // Dont really need this anymore
    toggleSelection(node.id);
    OnNodeClickNew(node);
  }

  function OnNodeClickNew(e) {
    console.log("Node Clicked", e);
  }

  function handleEdgeClick(edge, e) {
    console.log("Edge Clicked", edge, "\nEvent", e);
    toggleSelection(edge.id);
  }
  return (
    <>
      <div
        className="relative w-full h-full bg-[#0B132B] border-[2px] border-[#3A506B] rounded-2xl overflow-hidden"
        style={{ transform: "translate(0%, 0%)" }}
      >
        <NodeLegends currentAlgorithm={currentAlgorithm} />
        <GraphCanvas
          ref={graphRef}
          nodes={myNodes}
          edges={myEdges}
          actives={actives}
          theme={theme}
          edgeLabelPosition="inline"
          labelType={isWeighted ? "all" : "nodes"}
          // layoutType="forceDirected3d"
          edgeArrowPosition={isDirected}
          onEdgeClick={handleEdgeClick}
          selections={selections}
          onCanvasClick={onCanvasClick}
          onNodeClick={handleNodeClick}
          onNodePointerOver={onNodePointerOver}
          onNodePointerOut={onNodePointerOut}
          disabled={false}
        >
          <directionalLight />
        </GraphCanvas>
      </div>
    </>
  );
}
