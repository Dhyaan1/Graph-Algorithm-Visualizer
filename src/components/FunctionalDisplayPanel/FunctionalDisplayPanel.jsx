/* eslint-disable no-inner-declarations */
/* eslint-disable react/prop-types */
import AddEdges from "../AddEdges";
import AddNodes from "../AddNodes";
import Button1 from "../Buttons/Button1";
import DeleteEdges from "../DeleteEdges";
import DeleteNodes from "../DeleteNodes";
import { createAdjacencyGraph } from "../../functions/NodeFunctions";
import { useContext, useEffect, useState } from "react";
import DirectedOrUndirectedRadioButton from "../RadioButton/DirectedOrUndirectedRadioButton";
import WeightedOrUnWeightedRadioButton from "../RadioButton/WeightedOrUnWeightedRadioButton";
import { OutPutContext } from "../context/OutPutContextProvider";
import AlgorithmPlayerForBFS from "../AlgorithmPlayer/AlgorithmPlayerForBFS";
import AlgorithmPlayerForDFS from "../AlgorithmPlayer/AlgorithmPlayerForDFS";

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
  isWeighted,
  setIsWeighted,
}) {
  const [adjacencyMatrix, setAdjacencyMatrix] = useState([]);
  const [currentAlgorithm, setCurrentAlgorithm] = useState("none");
  const [steps, setSteps] = useState([]);
  const [stepsForDFS, setStepsForDFS] = useState([]);
  const { outPut, setOutPut } = useContext(OutPutContext);

  function ClearCanvas() {
    setMyEdges([]);
    setMyNode([]);
    setNodeCount(0);
  }

  // function delay(ms) {
  //   console.log(isPaused);
  //   if (!isPaused) return new Promise((resolve) => setTimeout(resolve, ms));
  //   else return new Promise((resolve) => setTimeout(resolve, 1000000000));
  // }

  function colorFill(nodeId, color) {
    nodeId = nodeId.toString();
    // console.log("colorFill", nodeId, color);
    setMyNode((currentNodes) => {
      const newNodes = currentNodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            fill: color,
          };
        }
        return node;
      });
      return newNodes;
    });
    // await delay(500);
  }

  function ColorArrayOfNodes(nodeArray, color) {
    nodeArray.forEach((node) => {
      colorFill(node, color);
    });
  }

  function SetToDefaultColor() {
    myNodes.forEach((node) => {
      colorFill(node.id, "#B9C74E");
    });
  }

  // function Pause() {
  //   setIsPaused((prev) => !prev);
  // }

  async function BFS(graph, start, visited, stepsAccumulator) {
    const queue = [];
    const traversal = [];

    queue.push(start);
    visited[start] = true;

    while (queue.length > 0) {
      const node = queue.shift();
      traversal.push(node);

      // Append the current state to the steps accumulator
      stepsAccumulator.push({
        currentNode: node,
        visitedNodes: Object.keys(visited)
          .filter((key) => visited[key])
          .map(Number), // Convert keys to numbers for visited nodes
        queuedNodes: [...queue], // Copy the current queue state
      });

      for (let i = 1; i <= graph.length; i++) {
        if (graph[node][i] && !visited[i]) {
          queue.push(i);
          visited[i] = true;
        }
      }
    }

    return traversal;
  }

  function bfsForDisconnectedComponents(graph) {
    const visited = new Array(nodeCount + 1).fill(false);
    const allTraversals = [];
    const stepsAccumulator = []; // Accumulator for all steps across BFS calls

    for (const node of myNodes) {
      if (!visited[node.id]) {
        const temp = BFS(
          graph,
          parseInt(node.id, 10),
          visited,
          stepsAccumulator
        );
        allTraversals.push(temp);
      }
    }

    // Once all BFS calls are done, update the steps state with the accumulated steps
    setSteps(stepsAccumulator);
    console.log("Steps After BFS", steps);
    console.log("Steps Accumulator", stepsAccumulator);
    setOutPut(stepsAccumulator);

    return allTraversals;
  }

  function bfsCall() {
    setCurrentAlgorithm("BFS");
    console.log("Steps before BFS", steps);
    const arr = bfsForDisconnectedComponents(adjacencyMatrix);
    console.log("BFS");
    arr.forEach((traversal) => {
      console.log("BFS", traversal);
    });
    // await delay(15000);
    // SetToDefaultColor();
  }

  function DFS(graph, start, visited, arr, stepsAccumulator) {
    if (start < 0 || start >= graph.length) {
      return;
    }
    visited[start] = true;
    arr.push(start);
    const neighbors = graph[start];

    // Append the current state to the steps accumulator
    stepsAccumulator.push({
      currentNode: start,
      visitedNodes: visited.map((v, i) => (v ? i : -1)).filter((i) => i !== -1), // Get indexes of visited nodes
    });

    for (const [index, node] of neighbors.entries()) {
      if (node && !visited[index]) {
        DFS(graph, index, visited, arr, stepsAccumulator);
      }
    }
  }

  function DFSForDisconnectedComponents(graph) {
    const visited = new Array(graph.length).fill(false);
    const allTraversals = [];
    const stepsAccumulator = []; // Accumulator for all steps across DFS calls

    let temp = [];
    DFS(graph, 5, visited, temp, stepsAccumulator);
    allTraversals.push(temp);

    for (const node of myNodes) {
      if (!visited[node.id]) {
        let temp = [];
        DFS(graph, node.id, visited, temp, stepsAccumulator);
        allTraversals.push(temp);
      }
    }

    // Once all DFS calls are done, update the steps state with the accumulated steps
    console.log("Steps Accumulator", stepsAccumulator);
    setStepsForDFS(stepsAccumulator);
    setOutPut(stepsAccumulator);

    return allTraversals;
  }

  function dfsCall() {
    setCurrentAlgorithm("DFS");
    const arr = DFSForDisconnectedComponents(adjacencyMatrix);
    console.log("DFS");
    arr.forEach((traversal) => {
      console.log("Traversal", traversal);
    });
  }

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
  }, [myEdges, myNodes.length, isDirected, nodeCount]);

  useEffect(() => {
    setSteps([]);
    setStepsForDFS([]);
    setCurrentAlgorithm("none");
    SetToDefaultColor();
  }, [myEdges, myNodes.length, isDirected, nodeCount]);

  return (
    <>
      <div className="flex flex-col w-full min-w-full h-full">
        <div className="flex items-center justify-between">
          <Button1 onClick={ClearCanvas}>Clear Canvas</Button1>
          <Button1 onClick={() => console.log(myNodes)}>
            Console Log Nodes
          </Button1>
          <Button1 onClick={() => console.log(selections)}>
            Console Log Selections
          </Button1>
          <Button1 onClick={() => console.log(myEdges)}>
            Console Log all Edges
          </Button1>
          <DirectedOrUndirectedRadioButton
            isDirected={isDirected}
            setIsDirected={setIsDirected}
          />
          <WeightedOrUnWeightedRadioButton
            isWeighted={isWeighted}
            setIsWeighted={setIsWeighted}
          />
        </div>

        <div className="flex items-center justify-start">
          <AddNodes
            nodeCount={nodeCount}
            setNodeCount={setNodeCount}
            myNodes={myNodes}
            setMyNode={setMyNode}
          />
          <Button1 onClick={bfsCall}>BFS</Button1>
          <Button1 onClick={dfsCall}>DFS</Button1>
          {currentAlgorithm === "BFS" && (
            <AlgorithmPlayerForBFS
              currentAlgorithm={currentAlgorithm}
              steps={steps}
              setMyNode={setMyNode}
            />
          )}
          {currentAlgorithm === "DFS" && (
            <AlgorithmPlayerForDFS
              currentAlgorithm={currentAlgorithm}
              steps={stepsForDFS}
              setMyNode={setMyNode}
            />
          )}
          <AddEdges
            myEdges={myEdges}
            setMyEdges={setMyEdges}
            selections={selections}
            setSelections={setSelections}
          />
          <DeleteNodes
            selections={selections}
            setSelections={setSelections}
            myEdges={myEdges}
            myNodes={myNodes}
            setMyEdges={setMyEdges}
            setMyNode={setMyNode}
          />
          <DeleteEdges
            myEdges={myEdges}
            setMyEdges={setMyEdges}
            selections={selections}
            setSelections={setSelections}
          />
        </div>
      </div>
    </>
  );
}
