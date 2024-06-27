function CreateDFS() {
  console.log("DFS");
}

function CreateBFS() {
  console.log("BFS");
}

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
  console.log("Adjacency Matrix", graph);
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

function BFS(graph, start, visited, nodeCount) {
  const queue = [];
  const traversal = [];
  queue.push(start);
  visited[start] = true;
  while (queue.length > 0) {
    const node = queue.shift();
    traversal.push(node);
    for (let i = 1; i <= nodeCount; i++) {
      if (graph[node][i] && !visited[i]) {
        queue.push(i);
        visited[i] = true;
      }
    }
  }
  return traversal;
}
function bfsForDisconnectedComponents(graph, nodeCount, myNodes) {
  const visited = new Array(nodeCount + 1).fill(false);
  const allTraversals = [];

  myNodes.forEach((node) => {
    if (!visited[node.id]) {
      const temp = BFS(graph, node.id, visited);
      allTraversals.push(temp);
    }
  });
  return allTraversals;
}
function bfsCall(adjacencyMatrix, nodeCount, myNodes) {
  const arr = bfsForDisconnectedComponents(adjacencyMatrix, nodeCount, myNodes);
  console.log("BFS");
  arr.forEach((traversal) => {
    console.log("BFS", traversal);
  });
}

export {
  CreateDFS,
  CreateBFS,
  create2DArray,
  createAdjacencyGraph,
  DeleteNode,
  bfsCall,
};
