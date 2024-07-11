import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext } from "react";
import { OutPutContext } from "../context/OutPutContextProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OutputDisplayPanel() {
  const { outPut } = useContext(OutPutContext);

  const BfsTabContent = (
    <Card className="bg-[#0B132B] border border-[#3FA2A2]">
      <CardHeader>
        <CardTitle className="text-white">BFS Output</CardTitle>
        <CardDescription>
          This is the output of the Breadth First Search algorithm
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[37svh] text-white max-[950px]:max-h-[50svh]">
        <p>
          {/* {outPut?.BFS ? JSON.stringify(outPut?.BFS) : "No output available"} */}
          {outPut ? JSON.stringify(outPut) : "No output available"}
        </p>
      </CardContent>
      <CardFooter className="text-white">
        <p>BFS Card Footer</p>
      </CardFooter>
    </Card>
  );

  const DfsTabContent = (
    <Card className="bg-[#0B132B] border border-[#3FA2A2]">
      <CardHeader>
        <CardTitle className="text-white">DFS Output</CardTitle>
        <CardDescription>
          This is the output of the Depth First Search algorithm
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[37svh] text-white max-[950px]:max-h-[50svh]">
        <p>
          {/* {outPut?.DFS ? JSON.stringify(outPut?.DFS) : "No output available"} */}
          {outPut ? JSON.stringify(outPut) : "No output available"}
        </p>
      </CardContent>
      <CardFooter className="text-white">
        <p>DFS Card Footer</p>
      </CardFooter>
    </Card>
  );

  const DijkstraTabContent = (
    <Card className="bg-[#0B132B] border border-[#3FA2A2]">
      <CardHeader>
        <CardTitle className="text-white">Dijkstra Output</CardTitle>
        <CardDescription>
          This is the output of the Dijkstra algorithm
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[37svh] text-white max-[950px]:max-h-[50svh]">
        <p>
          {outPut?.Dijkstra ? JSON.stringify(outPut) : "No output available"}
        </p>
      </CardContent>
      <CardFooter className="text-white">
        <p>Dijkstra Card Footer</p>
      </CardFooter>
    </Card>
  );

  return (
    <>
      <div className="h-full w-[25svw] min-w-[25svw] max-w-[25svw] max-[950px]:flex-1 max-[950px]:w-full max-[950px]:min-w-full max-[950px]:max-w-full">
        <Tabs defaultValue="BFS" className="text-white">
          <TabsList className="grid w-full grid-cols-3 text-white bg-[#3A506B]">
            <TabsTrigger value="BFS">BFS</TabsTrigger>
            <TabsTrigger value="DFS">DFS</TabsTrigger>
            <TabsTrigger value="Dijkstra">Dijkstra</TabsTrigger>
          </TabsList>
          <TabsContent value="BFS" className="">
            {/* BFS is an algorithm for traversing or searching tree or graph data */}
            {BfsTabContent}
          </TabsContent>
          <TabsContent value="DFS">
            {/* DFS is an algorithm for traversing or searching tree or graph data */}
            {DfsTabContent}
          </TabsContent>
          <TabsContent value="Dijkstra">
            {/* Dijkstra is an algorithm for finding the shortest paths between nodes in a graph */}
            {DijkstraTabContent}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
