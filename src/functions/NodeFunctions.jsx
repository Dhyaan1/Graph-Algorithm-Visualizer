function create2DArray(rows, cols) {
  let arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols).fill(0); // Initialize all elements to 0
  }
  return arr;
}

function createAdjacencyGraph(
  myEdges,
  nodeCount,
  isDirected,
  setAdjacencyMatrix
) {
  const graph = create2DArray(nodeCount + 1, nodeCount + 1);
  myEdges.forEach((edge) => {
    const { source, target, label } = edge;
    graph[source][target] = label;
    if (isDirected === "none") {
      graph[target][source] = label;
    }
  });
  // Ensure a new array is created and set so that UseEffect is triggered
  setAdjacencyMatrix([...graph]);
}

function DeleteNode(
  NodeId,
  myNodes,
  myEdges,
  setMyEdges,
  setMyNode,
  setDisableDeleteNode,
  setSelections
) {
  const newNodes = myNodes.filter((node) => node.id !== NodeId);
  const newEdges = myEdges.filter(
    (edge) => edge.source !== NodeId && edge.target !== NodeId
  );
  setMyEdges(newEdges);
  setMyNode(newNodes);
  setDisableDeleteNode(true);
  setSelections([]);
}

export { create2DArray, createAdjacencyGraph, DeleteNode };
