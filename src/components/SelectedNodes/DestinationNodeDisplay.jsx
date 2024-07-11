/* eslint-disable react/prop-types */

export default function DestinationNodeDisplay({ destinationNode }) {
  return (
    <>
      <div className="bg-[#0B132B] border-[2px] border-[#3A506B] px-4 rounded-2xl">
        <h2 className="text-white text-xl font-bold">Destination Node</h2>
        {destinationNode === null ? (
          <p className="text-white">No Destination Node Selected</p>
        ) : (
          <p className="text-white">Node ID: {destinationNode}</p>
        )}
      </div>
    </>
  );
}
