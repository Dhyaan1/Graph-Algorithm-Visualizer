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
import EnterTheSourceInputField from "../InputFields/EnterTheSourceInputField";
import AlgorithmPlayerForDijkstra from "../AlgorithmPlayer/AlgorithmPlayerForDijkstra";
import { delay } from "framer-motion";

class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

// PriorityQueue class
class PriorityQueue {
  // An array is used to implement priority
  constructor() {
    this.items = [];
  }

  // functions to be implemented
  push(element, priority) {
    // creating object from queue element
    let qElement = new QElement(element, priority);
    let contain = false;

    // iterating through the entire
    // item array to add element at the
    // correct location of the Queue
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        // Once the correct location is found it is
        // enqueued
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }

    // if the element have the highest priority
    // it is added at the end of the queue
    if (!contain) {
      this.items.push(qElement);
    }
  }

  printPQueue() {
    let str = [];
    for (let i = 0; i < this.items.length; i++) str.push(this.items[i].element);
    return str;
  }
  pop() {
    // return the dequeued element
    // and remove it.
    // if the queue is empty
    // returns Underflow
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }
  top() {
    // returns the highest priority element
    // in the Priority queue without removing it.
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }
  rear() {
    // returns the lowest priority
    // element of the queue
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    // return true if the queue is empty.
    return this.items.length == 0;
  }
  // printPQueue()
}

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
  const [stepsForDijstras, setStepsForDijstras] = useState([]);
  const [sourceNode, setSourceNode] = useState(9);
  const { setOutPut } = useContext(OutPutContext);

  function ClearCanvas() {
    setMyEdges([]);
    setMyNode([]);
    setNodeCount(0);
  }

  function colorFill(nodeId, color) {
    nodeId = nodeId.toString();
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
  }

  function SetToDefaultColor() {
    myNodes.forEach((node) => {
      colorFill(node.id, "#B9C74E");
    });
  }

  // function Pause() {
  //   setIsPaused((prev) => !prev);
  // }

  function BFS(graph, start, visited, stepsAccumulator) {
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
    console.log("Steps of BFS", stepsAccumulator);
    setOutPut(stepsAccumulator);

    return allTraversals;
  }

  function bfsCall() {
    setIsWeighted(false);
    setCurrentAlgorithm("BFS");
    console.log("Steps before BFS", steps);
    const arr = bfsForDisconnectedComponents(adjacencyMatrix);
    console.log("BFS");
    arr.forEach((traversal) => {
      console.log("BFS", traversal);
    });
  }

  function DFS(
    graph,
    start,
    visited,
    arr,
    visitedNodes = [],
    backtrackingNodes = [],
    stepsAccumulator = [] // Add stepsAccumulator to the parameters list
  ) {
    if (start < 0 || start >= graph.length) {
      return;
    }
    visited[start] = true;
    arr.push(start);
    visitedNodes.push(start); // Update visitedNodes with the current node

    // Push the current state into stepsAccumulator instead of logging it
    stepsAccumulator.push({
      currentNode: start,
      visitedNodes: [...visitedNodes], // Clone to snapshot the current state
      backtrackingNodes: [...backtrackingNodes], // Clone to maintain previous state
    });

    const neighbors = graph[start];
    for (const [index, node] of neighbors.entries()) {
      if (node && !visited[index]) {
        DFS(
          graph,
          parseInt(index, 10),
          visited,
          arr,
          visitedNodes,
          backtrackingNodes,
          stepsAccumulator
        );
      }
    }

    backtrackingNodes.push(start); // Update backtrackingNodes after visiting neighbors

    // Push the state after backtracking into stepsAccumulator
    stepsAccumulator.push({
      currentNode: start,
      visitedNodes: [...visitedNodes], // Clone to maintain previous state
      backtrackingNodes: [...backtrackingNodes], // Clone to snapshot the current state
    });
  }

  function DFSForDisconnectedComponents(graph) {
    const visited = new Array(graph.length).fill(false);
    const allTraversals = [];
    const stepsAccumulator = []; // Initialize stepsAccumulator

    // Initialize visitedNodes and backtrackingNodes outside the loop
    // to maintain their state across disconnected components
    const visitedNodes = [];
    const backtrackingNodes = [];

    let temp = [];
    DFS(
      graph,
      parseInt(sourceNode, 10),
      visited,
      temp,
      visitedNodes,
      backtrackingNodes,
      stepsAccumulator
    );
    allTraversals.push(temp);

    // Iterate through all nodes to handle disconnected components
    for (const node of myNodes) {
      if (!visited[node.id]) {
        let temp = [];
        DFS(
          graph,
          parseInt(node.id, 10),
          visited,
          temp,
          visitedNodes, // Pass the maintained visitedNodes
          backtrackingNodes, // Pass the maintained backtrackingNodes
          stepsAccumulator
        );
        allTraversals.push(temp);
      }
    }

    // Once all DFS calls are done, update the steps state with the accumulated steps
    setStepsForDFS(stepsAccumulator);
    console.log("Steps of DFS", stepsAccumulator);
    setOutPut(stepsAccumulator);

    return allTraversals;
  }

  function dfsCall() {
    setIsWeighted(false);
    setCurrentAlgorithm("DFS");
    const arr = DFSForDisconnectedComponents(adjacencyMatrix);
    console.log("DFS");
    arr.forEach((traversal) => {
      console.log("Traversal", traversal);
    });
  }

  //this is dijstras algorithm shit don't touch.
  function dijstrasAlgorithm() {
    setIsWeighted(true);
    setCurrentAlgorithm("dijkstra's");
    const graph = adjacencyMatrix;
    const source = 1;
    const dest = 9;
    const stepsAccumulator = [];

    let pq = new PriorityQueue();
    let dist = new Array(nodeCount + 1).fill(Infinity);
    let previous = new Array(nodeCount + 1).fill(null); // Array to store previous nodes
    pq.push(source, 0);
    dist[source] = 0;
    const visitedNodes = [];

    while (!pq.isEmpty()) {
      let curr = pq.top().element; // Node that is picked
      let val = pq.top().priority;
      visitedNodes.push(curr);
      stepsAccumulator.push({
        currentNode: curr,
        visitedNodes: [...visitedNodes],
        path: [],
      });
      // console.log(pq.printPQueue());
      // console.log(curr, pq.printPQueue());

      if (curr === dest) break;
      pq.pop();

      for (let i = 1; i < nodeCount + 1; i++) {
        if (graph[curr][i] !== 0 && val + parseInt(graph[curr][i]) < dist[i]) {
          // Compare with dist[i]
          dist[i] = val + parseInt(graph[curr][i]); // Update dist[i]
          previous[i] = curr; // Update previous node for i
          pq.push(i, dist[i]);
        }
      }
    }

    // Retrieve path from source to dest using previous array
    let path = [];
    for (let at = dest; at !== null; at = previous[at]) {
      path.push(at);
    }
    path = path.reverse(); // Reverse to get path from source to dest
    //change of color happens after this step
    // for (let i = 0; i < path.length; i++) {
    //   colorFill(path[i], "green");
    //   await delay(500);
    // }
    stepsAccumulator.push({
      currentNode: dest,
      visitedNodes: [...visitedNodes],
      path: [...path],
    });
    setStepsForDijstras(stepsAccumulator);
    setOutPut(stepsAccumulator);
    console.log("Shortest path:", path);
    console.log("Steps of Dijstras", stepsAccumulator);
  }

  useEffect(() => {
    createAdjacencyGraph(myEdges, nodeCount, isDirected, setAdjacencyMatrix);
  }, [myEdges, myNodes.length, isDirected, nodeCount]);

  useEffect(() => {
    setSteps([]);
    setStepsForDFS([]);
    setCurrentAlgorithm("none");
    SetToDefaultColor();
  }, [myEdges, myNodes.length, isDirected, nodeCount, sourceNode]);

  return (
    <>
      <div className="flex flex-col w-full min-w-full h-full">
        <div className="flex items-center space-x-10">
          <Button1 onClick={ClearCanvas}>Clear Canvas</Button1>
          {/* <Button1 onClick={() => console.log(myNodes)}>
            Console Log Nodes
          </Button1>
          <Button1 onClick={() => console.log(selections)}>
            Console Log Selections
          </Button1>
          <Button1 onClick={() => console.log(myEdges)}>
            Console Log all Edges
          </Button1> */}
          <DirectedOrUndirectedRadioButton
            isDirected={isDirected}
            setIsDirected={setIsDirected}
          />
          <WeightedOrUnWeightedRadioButton
            isWeighted={isWeighted}
            setIsWeighted={setIsWeighted}
          />
          <EnterTheSourceInputField
            sourceNode={sourceNode}
            setSourceNode={setSourceNode}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start w-[70%] min-w-[70%] max-w-[70%] border-r-2 border-[#878C8F]">
            <Button1 onClick={bfsCall}>BFS</Button1>
            <Button1 onClick={dfsCall}>DFS</Button1>
            <Button1 onClick={dijstrasAlgorithm}>Dijstras</Button1>
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
            {currentAlgorithm === "dijkstra's" && (
              <AlgorithmPlayerForDijkstra
                currentAlgorithm={currentAlgorithm}
                steps={stepsForDijstras}
                setMyNode={setMyNode}
                setSelections={setSelections}
              />
            )}
          </div>
          <div className="flex items-center justify-start w-[30%] min-w-[30%] max-w-[30%]">
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
      </div>
    </>
  );
}
