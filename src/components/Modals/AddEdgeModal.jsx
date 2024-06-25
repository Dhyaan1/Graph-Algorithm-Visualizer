/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import Backdrop from "./BackDrop";
import Button1 from "../Buttons/Button1";
import { useState } from "react";

const SlideUp = {
  hidden: {
    y: 100,
    opacity: 0,
    transition: {
      delay: 0.4,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function AddEdgeModal({
  handleClose,
  disableAddEdge,
  AddEdge,
  selections,
}) {
  const [edgeCost, setEdgeCost] = useState("");

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={SlideUp}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col space-y-10 items-center justify-center w-full h-52 max-w-3xl rounded-3xl bg-[#201E1F] border border-gray-200 shadow-md"
      >
        <input
          type="number"
          placeholder="Path/Edge Cost"
          value={edgeCost}
          onChange={(e) => setEdgeCost(e.target.value)}
          className="w-1/2 h-10 px-4 text-white bg-[#201E1F] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
        {!disableAddEdge && (
          <Button1
            disabled={disableAddEdge}
            onClick={() => AddEdge(selections[0], selections[1], edgeCost)}
          >
            Add Edge
          </Button1>
        )}
      </motion.div>
    </Backdrop>
  );
}
