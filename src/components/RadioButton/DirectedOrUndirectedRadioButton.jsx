/* eslint-disable react/prop-types */

export default function DirectedOrUndirectedRadioButton({
  isDirected,
  setIsDirected,
}) {
  function handleDirectedOrUnDirected(event) {
    setIsDirected(event.target.value);
  }

  return (
    <>
      <div
        onChange={handleDirectedOrUnDirected}
        className="flex space-x-2 border-[2px] border-[#FCF7FF] rounded-xl select-none m-4"
      >
        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
          <input
            type="radio"
            name="direction"
            value="end"
            className="peer hidden"
            defaultChecked={isDirected === "end"}
          />
          <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#878C8F] peer-checked:to-[#C4CAD0] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
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
          <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#878C8F] peer-checked:to-[#C4CAD0] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
            Undirected
          </span>
        </label>
      </div>
    </>
  );
}