/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

export default function Button1({ onClick, disabled, children }) {
  return (
    <>
      <motion.button
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-[#3A506B] border-[1px] border-white m-4 w-32 whitespace-nowrap min-w-fit h-10 hover:bg-[#225858] text-white font-bold py-2 px-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 disabled:text-gray-700"
      >
        {children}
      </motion.button>
    </>
  );
}
