/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const OutPutContext = createContext();

const OutPutContextProvider = ({ children }) => {
  const [outPut, setOutPut] = useState({
    BFS: { steps: ["1->2", "2->3"] },
    DFS: { steps: ["1->2", "2->5"] },
    Dijkstra: { steps: ["1->2", "2->6"] },
  });

  return (
    <OutPutContext.Provider value={{ outPut, setOutPut }}>
      {children}
    </OutPutContext.Provider>
  );
};

export { OutPutContextProvider, OutPutContext };
