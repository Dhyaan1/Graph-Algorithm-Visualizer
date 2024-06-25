/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="flex justify-center items-center fixed top-0 left-0 w-dvw h-dvh bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
