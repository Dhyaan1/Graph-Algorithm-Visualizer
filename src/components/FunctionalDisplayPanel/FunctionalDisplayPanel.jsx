/* eslint-disable react/prop-types */
import AddEdges from "../AddEdges";
import AddNodes from "../AddNodes";
import Button1 from "../Buttons/Button1";
import DeleteEdges from "../DeleteEdges";
import DeleteNodes from "../DeleteNodes";
import {
  createAdjacencyGraph,
  DeleteNode,
  bfsCall,
} from "../../functions/NodeFunctions";
import { useEffect, useState } from "react";

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
  setIsDirected,
}) {
  const [adjacencyMatrix, setAdjacencyMatrix] = useState([]);

  function ClearCanvas() {
    setMyEdges([]);
    setMyNode([]);
    setNodeCount(0);
  }
  function handleDirectedOrUnDirected(event) {
    setIsDirected(event.target.value);
  }
  //bfs call
  // useEffect(() => {
  //   if (adjacencyMatrix.length > 0) {
  //     function BFS(graph, start, visited) {
  //       const queue = [];
  //       const traversal = [];
  //       queue.push(start);
  //       visited[start] = true;
  //       while (queue.length > 0) {
  //         const node = queue.shift();
  //         traversal.push(node);
  //         for (let i = 1; i <= nodeCount; i++) {
  //           if (graph[node][i] && !visited[i]) {
  //             queue.push(i);
  //             visited[i] = true;
  //           }
  //         }
  //       }
  //       return traversal;
  //     }
  //     function bfsForDisconnectedComponents(graph) {
  //       const visited = new Array(nodeCount + 1).fill(false);
  //       const allTraversals = [];

  //       myNodes.forEach((node) => {
  //         if (!visited[node.id]) {
  //           const temp = BFS(graph, node.id, visited);
  //           allTraversals.push(temp);
  //         }
  //       });
  //       return allTraversals;
  //     }
  //     function bfsCall() {
  //       const arr = bfsForDisconnectedComponents(adjacencyMatrix);
  //       console.log("BFS");
  //       arr.forEach((traversal) => {
  //         console.log("BFS", traversal);
  //       });
  //     }
  //     bfsCall();
  //   }
  // }, [adjacencyMatrix]);

  // useEffect(() => {
  //   if (adjacencyMatrix.length > 0) {
  //     function DFS(graph, start, visited, arr) {
  //       if (start < 0 || start >= graph.length) {
  //         return;
  //       }
  //       visited[start] = true;
  //       arr.push(start);
  //       graph[start].forEach((node, index) => {
  //         if (node && !visited[index]) {
  //           DFS(graph, index, visited, arr);
  //         }
  //       });
  //     }
  //     function DFSForDisconnectedComponents(graph) {
  //       const visited = new Array(nodeCount + 1).fill(false);
  //       const allTraversals = [];
  //       let temp = [];
  //       DFS(graph, 5, visited, temp);
  //       allTraversals.push(temp);
  //       myNodes.forEach((node) => {
  //         if (!visited[node.id]) {
  //           temp = [];
  //           DFS(graph, node.id, visited, temp);
  //           allTraversals.push(temp);
  //         }
  //       });
  //       return allTraversals;
  //     }
  //     function dfsCall() {
  //       const arr = DFSForDisconnectedComponents(adjacencyMatrix);
  //       console.log("DFS");
  //       arr.forEach((traversal) => {
  //         console.log("Traversal", traversal);
  //       });
  //     }
  //     dfsCall();
  //   }
  // }, [adjacencyMatrix]);

  //this is dijstras algorithm shit don't touch.

  // function dijstrasAlgorithm(graph, start) {
  //   const distance = new Array(nodeCount + 1).fill(Infinity);
  //   const visited = new Array(nodeCount + 1).fill(false);
  //   distance[start] = 0;
  //   for (let i = 1; i <= nodeCount; i++) {
  //     let min = -1;
  //     for (let j = 1; j <= nodeCount; j++) {
  //       if (!visited[j] && (min === -1 || distance[j] < distance[min])) {
  //         min = j;
  //       }
  //     }
  //     visited[min] = true;
  //     for (let j = 1; j <= nodeCount; j++) {
  //       if (graph[min][j] && distance[j] > distance[min] + graph[min][j]) {
  //         distance[j] =parseInt(distance[min]) + parseInt(graph[min][j]);
  //       }
  //     }
  //   }
  //   return distance;
  // }

  // useEffect(() => {
  //   if (adjacencyMatrix.length > 0) {
  //     const distance = dijstrasAlgorithm(adjacencyMatrix, 1);
  //     console.log("Dijstras", distance);
  //   }
  // }
  // , [adjacencyMatrix]);

  useEffect(() => {
    createAdjacencyGraph(myEdges, nodeCount, isDirected, setAdjacencyMatrix);
  }, [myEdges, myNodes.length, isDirected]);

  function ChangeNodeColor(nodeId) {
    const newNodes = myNodes.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          fill: "#F6F930",
        };
      }
      return node;
    });
    setMyNode(newNodes);
  }

  return (
    <>
      <div className="flex w-[20svw] min-w-[20svw] h-full">
        <DeleteNodes
          selections={selections}
          setSelections={setSelections}
          myEdges={myEdges}
          myNodes={myNodes}
          setMyEdges={setMyEdges}
          setMyNode={setMyNode}
        />
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
