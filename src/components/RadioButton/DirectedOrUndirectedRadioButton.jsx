/* eslint-disable react/prop-types */

export default function DirectedOrUndirectedRadioButton({
  isDirected,
  handleDirectedOrUnDirected,
}) {
  return (
    <>
      <div
        onChange={handleDirectedOrUnDirected}
        className="flex space-x-2 border-[3px] border-blue-400 rounded-xl select-none"
      >
        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
          <input
            type="radio"
            name="direction"
            value="end"
            className="peer hidden"
            defaultChecked={isDirected === "end"}
          />
          <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[#8284ee] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
            Directed
          </span>
        </label>

        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
          <input
            type="radio"
            value="none"
            name="direction"
            defaultChecked={isDirected === "none"}
            className="peer hidden"
          />
          <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[#8284ee] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
            Undirected
          </span>
        </label>
      </div>
    </>
  );
}
