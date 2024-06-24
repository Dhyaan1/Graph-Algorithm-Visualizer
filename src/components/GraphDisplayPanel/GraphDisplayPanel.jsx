/* eslint-disable react/prop-types */
import { GraphCanvas } from "reagraph";

export default function GraphDisplayPanel({
  graphRef,
  myNodes,
  myEdges,
  actives,
  theme,
  isDirected,
  handleEdgeClick,
  selections,
  onCanvasClick,
  handleNodeClick,
  onNodePointerOver,
  onNodePointerOut,
}) {
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
