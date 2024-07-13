/* eslint-disable react/prop-types */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext, useEffect, useState } from "react";
import { OutPutContext } from "../context/OutPutContextProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OutputDisplayPanel({
  currentAlgorithm,
  currentStepIndex,
}) {
  const { outPut } = useContext(OutPutContext);
  const [activeTab, setActiveTab] = useState(currentAlgorithm);

  // Synchronize activeTab with currentAlgorithm prop changes
  useEffect(() => {
    setActiveTab(currentAlgorithm);
  }, [currentAlgorithm]);

  const BfsTabContent = (
    <Card className="bg-[#0B132B] border-[2px] border-[#3A506B] rounded-2xl">
      <CardHeader>
        <CardTitle className="text-white">BFS Output</CardTitle>
        <CardDescription>
          This is the last saved output of the Breadth First Search algorithm
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto min-h-fit max-h-[30svh] text-white max-[950px]:max-h-[50svh]">
        <div>
          <h3 className="font-semibold text-xl">Steps</h3>
          <div className="mt-2 p-2 border-[2px] border-[#3A506B] rounded-2xl">
            {outPut?.BFS ? (
              outPut.BFS.steps.map(
                (step, index) =>
                  index === currentStepIndex && (
                    <div key={index}>
                      <p>
                        <span className="font-semibold">Step:</span> {index + 1}
                      </p>
                      <p>
                        <span className="font-semibold">Current Node:</span>{" "}
                        {step.currentNode || "None"}
                      </p>
                      <p>
                        <span className="font-semibold">Visited Nodes:</span>{" "}
                        {step.visitedNodes.length > 0
                          ? step.visitedNodes.join(", ")
                          : "None"}
                      </p>
                      <p>
                        <span className="font-semibold">Queued Nodes: </span>
                        {step.queuedNodes.length > 0
                          ? step.queuedNodes.join(", ")
                          : "None"}
                      </p>
                    </div>
                  )
              )
            ) : (
              <p>No output available</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-white">
        <div className="flex-1">
          <h3 className="font-semibold text-xl">Traversal</h3>
          <div className="overflow-auto max-h-[18svh] max-[950px]:max-h-[50svh]">
            {outPut.BFS && outPut.BFS.traversal ? (
              outPut.BFS.traversal.map((path, index) => (
                <div
                  key={index}
                  className="mt-2 p-2 border-[2px] border-[#3A506B] rounded-2xl"
                >
                  {outPut.BFS.traversal.length > 1 && (
                    <span className="font-semibold">
                      Component {index + 1}:
                    </span>
                  )}
                  <p>{path.join(" -> ")}</p>
                </div>
              ))
            ) : (
              <div className="mt-2 p-2 border-[2px] border-[#3A506B] rounded-2xl">
                No output available
              </div>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );

  const DfsTabContent = (
    <Card className="bg-[#0B132B] border-[2px] border-[#3A506B] rounded-2xl">
      <CardHeader>
        <CardTitle className="text-white">DFS Output</CardTitle>
        <CardDescription>
          This is the last saved output of the Depth First Search algorithm
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto min-h-fit max-h-[30svh] text-white max-[950px]:max-h-[50svh]">
        <div>
          <h3 className="font-semibold text-xl">Steps</h3>
          <div className="mt-2 p-2 border-[2px] border-[#3A506B] rounded-2xl">
            {outPut?.DFS ? (
              outPut.DFS.steps.map(
                (step, index) =>
                  index === currentStepIndex && (
                    <div key={index}>
                      <p>
                        <span className="font-semibold">Step:</span> {index + 1}
                      </p>
                      <p>
                        <span className="font-semibold">Current Node:</span>{" "}
                        {step.currentNode || "None"}
                      </p>
                      <p>
                        <span className="font-semibold">Visited Nodes:</span>{" "}
                        {step.visitedNodes.length > 0
                          ? step.visitedNodes.join(", ")
                          : "None"}
                      </p>
                      <p>
                        <span className="font-semibold">
                          Backtracking Nodes:{" "}
                        </span>
                        {step.backtrackingNodes.length > 0
                          ? step.backtrackingNodes.join(", ")
                          : "None"}
                      </p>
                    </div>
                  )
              )
            ) : (
              <p>No output available</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-white">
        <div className="flex-1">
          <h3 className="font-semibold text-xl">Traversal</h3>
          <div className="overflow-auto max-h-[18svh] max-[950px]:max-h-[50svh]">
            {outPut.DFS && outPut.DFS.traversal ? (
              outPut.DFS.traversal.map((path, index) => (
                <div
                  key={index}
                  className="mt-2 p-2 border-[2px] border-[#3A506B] rounded-2xl"
                >
                  {outPut.DFS.traversal.length > 1 && (
                    <span className="font-semibold">
                      Component {index + 1}:
                    </span>
                  )}
                  <p>{path.join(" -> ")}</p>
                </div>
              ))
            ) : (
              <div className="mt-2 p-2 border-[2px] border-[#3A506B] rounded-2xl">
                No output available
              </div>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );

  const DijkstraTabContent = (
    <Card className="bg-[#0B132B] border-[2px] border-[#3A506B] rounded-2xl">
      <CardHeader>
        <CardTitle className="text-white">Dijkstra&apos;s Output</CardTitle>
        <CardDescription>
          This is the last saved output of the Dijkstra&apos;s algorithm
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto min-h-fit max-h-[30svh] text-white max-[950px]:max-h-[50svh]">
        <div>
          <h3 className="font-semibold text-xl">Steps</h3>
          <div className="mt-2 p-2 border-[2px] border-[#3A506B] rounded-2xl">
            {outPut?.Dijkstra ? (
              outPut.Dijkstra.steps.map(
                (step, index) =>
                  index === currentStepIndex && (
                    <div key={index}>
                      <p>
                        <span className="font-semibold">Step:</span> {index + 1}
                      </p>
                      <p>
                        <span className="font-semibold">Current Node:</span>{" "}
                        {step.currentNode || "None"}
                      </p>
                      <p>
                        <span className="font-semibold">Visited Nodes:</span>{" "}
                        {step.visitedNodes.length > 0
                          ? step.visitedNodes.join(", ")
                          : "None"}
                      </p>
                    </div>
                  )
              )
            ) : (
              <p>No output available</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-white">
        <div className="flex-1">
          <h3 className="font-semibold text-xl">Shortest Path</h3>
          <div className="overflow-auto max-h-[18svh] max-[950px]:max-h-[50svh]">
            {outPut?.Dijkstra && outPut.Dijkstra.path ? (
              outPut.Dijkstra.path.length > 1 ? (
                <div className="mt-2 p-2 border-[2px] border-[#3A506B] rounded-2xl">
                  <p>{outPut.Dijkstra.path.join(" -> ")}</p>
                </div>
              ) : (
                <div className="mt-2 p-2 border-[2px] border-[#3A506B] rounded-2xl">
                  <p>No path available</p>
                </div>
              )
            ) : (
              <div className="mt-2 p-2 border-[2px] border-[#3A506B] rounded-2xl">
                No output available
              </div>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <>
      <div className="h-full w-[25svw] min-w-[25svw] max-w-[25svw] max-[950px]:flex-1 max-[950px]:w-full max-[950px]:min-w-full max-[950px]:max-w-full">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="text-white"
        >
          <TabsList className="grid w-full grid-cols-3 text-white bg-[#3A506B]">
            <TabsTrigger value="BFS">BFS</TabsTrigger>
            <TabsTrigger value="DFS">DFS</TabsTrigger>
            <TabsTrigger value="dijkstra's">Dijkstra&apos;s</TabsTrigger>
          </TabsList>
          <TabsContent value="BFS">{BfsTabContent}</TabsContent>
          <TabsContent value="DFS">{DfsTabContent}</TabsContent>
          <TabsContent value="dijkstra's">{DijkstraTabContent}</TabsContent>
        </Tabs>
      </div>
    </>
  );
}
