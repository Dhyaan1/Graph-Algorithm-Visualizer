/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button1 from "./Buttons/Button1";

export default function SetDestination({
  destinationNode,
  setDestinationNode,
  selections,
  setSelections,
}) {
  const [disableSetDestination, setDisableSetDestination] = useState(true);

  function SetDestination() {
    setDestinationNode(parseInt(selections[0], 10));
    setSelections([]);
  }

  useEffect(() => {
    if (selections.length === 0) {
      setDisableSetDestination(true);
    }
    if (selections.length > 1) {
      setDisableSetDestination(true);
    }
    //only for single node selection
    if (selections.length === 1 && !selections[0].includes("->")) {
      setDisableSetDestination(false);
    }
    // if it is already a destination node
    // This needs to be after the above condition or it will be set to true and then set to false
    if (destinationNode === parseInt(selections[0], 10)) {
      setDisableSetDestination(true);
    }
  }, [selections, destinationNode]);

  return (
    <>
      {!disableSetDestination && (
        <Button1 onClick={SetDestination}>Set As Destination</Button1>
      )}
    </>
  );
}
