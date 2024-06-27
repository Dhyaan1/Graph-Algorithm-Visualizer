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
    <Card
    // className="text-white bg-[#878C8F]"
    >
      <CardHeader>
        <CardTitle>BFS Output</CardTitle>
        <CardDescription>
          This is the output of the Breadth First Search algorithm
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[50svh]">
        <p>
          {/* {outPut?.BFS ? JSON.stringify(outPut?.BFS) : "No output available"} */}
          {outPut ? JSON.stringify(outPut) : "No output available"}
        </p>
      </CardContent>
      <CardFooter>
        <p>BFS Card Footer</p>
      </CardFooter>
    </Card>
  );

  const DfsTabContent = (
    <Card>
      <CardHeader>
        <CardTitle>DFS Output</CardTitle>
        <CardDescription>
          This is the output of the Depth First Search algorithm
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[50svh]">
        <p>
          {/* {outPut?.DFS ? JSON.stringify(outPut?.DFS) : "No output available"} */}
          {outPut ? JSON.stringify(outPut) : "No output available"}
        </p>
      </CardContent>
      <CardFooter>
        <p>DFS Card Footer</p>
      </CardFooter>
    </Card>
  );

  const DijkstraTabContent = (
    <Card>
      <CardHeader>
        <CardTitle>Dijkstra Output</CardTitle>
        <CardDescription>
          This is the output of the Dijkstra algorithm
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {outPut?.Dijkstra
            ? JSON.stringify(outPut?.Dijkstra)
            : "No output available"}
        </p>
      </CardContent>
      <CardFooter>
        <p>Dijkstra Card Footer</p>
      </CardFooter>
    </Card>
  );

  return (
    <>
      <div className="h-full w-[20svw] min-w-[20svw] max-w-[20svw]">
        <Tabs defaultValue="BFS" className="text-white">
          <TabsList className="grid w-full grid-cols-3 text-white bg-[#878C8F]">
            <TabsTrigger value="BFS">BFS</TabsTrigger>
            <TabsTrigger value="DFS">DFS</TabsTrigger>
            <TabsTrigger value="Dijkstra">Dijkstra</TabsTrigger>
          </TabsList>
          <TabsContent value="BFS">
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
