/* eslint-disable react/prop-types */
export default function WeightedOrUnWeightedRadioButton({
  isWeighted,
  setIsWeighted,
}) {
  function handleWeightedOrUnWeighted(event) {
    if (event.target.value === "Weighted") {
      setIsWeighted(true);
    } else {
      setIsWeighted(false);
    }
  }

  return (
    <>
      <div className="flex space-x-2 border-[2px] border-[#FCF7FF] rounded-xl select-none m-4">
        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
          <input
            type="radio"
            name="Weighted"
            value="Weighted"
            className="peer hidden"
            checked={isWeighted}
            onChange={handleWeightedOrUnWeighted}
          />
          <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#878C8F] peer-checked:to-[#C4CAD0] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
            Weighted
          </span>
        </label>

        <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
          <input
            type="radio"
            value="Un-Weighted"
            name="Weighted"
            checked={!isWeighted}
            className="peer hidden"
            onChange={handleWeightedOrUnWeighted}
          />
          <span className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#878C8F] peer-checked:to-[#C4CAD0] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
            Un-Weighted
          </span>
        </label>
      </div>
    </>
  );
}
