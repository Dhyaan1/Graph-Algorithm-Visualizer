/* eslint-disable react/prop-types */
export default function DestinationNodeDisplay({ destinationNode }) {
  return (
    <>
      <div className="bg-gray-200 p-4 rounded-2xl">
        <h2 className="text-xl font-bold">Destination Node</h2>
        {destinationNode === null ? (
          <p className="text-gray-600">No Destination Node Selected</p>
        ) : (
          <p className="text-gray-600">Node ID: {destinationNode}</p>
        )}
      </div>
    </>
  );
}
