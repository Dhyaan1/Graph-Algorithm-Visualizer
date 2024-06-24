/* eslint-disable react/prop-types */
import { GraphCanvas } from "reagraph";

export default function GraphDisplayPanel({
  graphRef,
  toggleSelection,
  onNodeClick,
  myNodes,
  myEdges,
  actives,
  theme,
  isDirected,
  selections,
  onCanvasClick,
  onNodePointerOver,
  onNodePointerOut,
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
      <div className="w-full h-full" style={{ transform: "translate(0%, 0%)" }}>
        <GraphCanvas
          ref={graphRef}
          nodes={myNodes}
          edges={myEdges}
          actives={actives}
          theme={theme}
          edgeLabelPosition="inline"
          labelType="all"
          // layoutType="forceDirected3d"
          edgeArrowPosition={isDirected}
          onEdgeClick={handleEdgeClick}
          selections={selections}
          onCanvasClick={onCanvasClick}
          onNodeClick={handleNodeClick}
          onNodePointerOver={onNodePointerOver}
          onNodePointerOut={onNodePointerOut}
        />
      </div>
    </>
  );
}
