/* eslint-disable react/prop-types */
export default function NodeLegends({ currentAlgorithm }) {
  return (
    <>
      {currentAlgorithm !== "none" && (
        <div
          className="z-10 absolute top-2 left-2 bg-[#0B132B] border-[2px] border-[#3A506B] rounded-lg p-2"
          style={{ transform: "translate(0%, 0%)" }}
        >
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <div
                className="w-5 h-5 bg-teal-300 rounded-full"
                style={{ transform: "translate(0%, 0%)" }}
              ></div>
              <p className="text-teal-300">Current Node</p>
            </div>

            <div className="flex items-center space-x-2">
              <div
                className="w-5 h-5 bg-red-500 rounded-full"
                style={{ transform: "translate(0%, 0%)" }}
              ></div>
              <p className="text-red-500">Visited Node</p>
            </div>

            <div className="flex items-center space-x-2">
              <div
                className="w-5 h-5 bg-yellow-500 rounded-full"
                style={{ transform: "translate(0%, 0%)" }}
              ></div>
              <p className="text-yellow-500">Unvisited Node</p>
            </div>

            {currentAlgorithm === "BFS" && (
              <div className="flex items-center space-x-2">
                <div
                  className="w-5 h-5 bg-gray-300 rounded-full"
                  style={{ transform: "translate(0%, 0%)" }}
                ></div>
                <p className="text-gray-300">Queued Node</p>
              </div>
            )}

            {currentAlgorithm === "DFS" && (
              <div className="flex items-center space-x-2">
                <div
                  className="w-5 h-5 bg-blue-500 rounded-full"
                  style={{ transform: "translate(0%, 0%)" }}
                ></div>
                <p className="text-blue-500">Traversed Node</p>
              </div>
            )}

            {currentAlgorithm === "dijkstra's" && (
              <div className="flex items-center space-x-2">
                <div
                  className="w-5 h-5 bg-green-500 rounded-full"
                  style={{ transform: "translate(0%, 0%)" }}
                ></div>
                <p className="text-green-500">Optimal Node</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
