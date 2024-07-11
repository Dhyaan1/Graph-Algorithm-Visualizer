/* eslint-disable react/prop-types */

export default function SourceNodeDisplay({ sourceNode }) {
  return (
    <>
      <div className="bg-[#0B132B] border-[2px] border-[#3A506B] px-4 rounded-2xl">
        <h2 className="text-white text-xl font-bold">Source Node</h2>
        {sourceNode === null ? (
          <p className="text-white">No Source Node Selected</p>
        ) : (
          <p className="text-white">Node ID: {sourceNode}</p>
        )}
      </div>
    </>
  );
}
