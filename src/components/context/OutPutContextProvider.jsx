/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const OutPutContext = createContext();

const OutPutContextProvider = ({ children }) => {
  const [outPut, setOutPut] = useState({});

  return (
    <OutPutContext.Provider value={{ outPut, setOutPut }}>
      {children}
    </OutPutContext.Provider>
  );
};

export { OutPutContextProvider, OutPutContext };
