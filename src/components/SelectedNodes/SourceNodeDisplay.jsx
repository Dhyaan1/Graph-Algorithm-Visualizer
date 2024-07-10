/* eslint-disable react/prop-types */
export default function SourceNodeDisplay({ sourceNode }) {
  return (
    <>
      <div className="bg-gradient-to-r from-[#4dc9e6] to-[#210cae] px-4 rounded-2xl">
        <h2 className="text-xl font-bold">Source Node</h2>
        {sourceNode === null ? (
          <p className="text-gray-600">No Source Node Selected</p>
        ) : (
          <p className="text-gray-600">Node ID: {sourceNode}</p>
        )}
      </div>
    </>
  );
}
