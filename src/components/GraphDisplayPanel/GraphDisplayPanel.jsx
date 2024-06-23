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
        />
      </div>
    </>
  );
}
