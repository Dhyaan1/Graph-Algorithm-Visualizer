/* eslint-disable react/prop-types */

export default function Button1({ onClick, disabled, children }) {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className="bg-blue-500 w-40 min-w-fit min-h-fit h-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 disabled:text-gray-700"
      >
        {children}
      </button>
    </>
  );
}
