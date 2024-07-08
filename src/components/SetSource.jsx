/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button1 from "./Buttons/Button1";

export default function SetSource({
  sourceNode,
  setSourceNode,
  selections,
  setSelections,
}) {
  const [disableSetSource, setDisableSetSource] = useState(true);

  function SetSource() {
    setSourceNode(parseInt(selections[0], 10));
    setSelections([]);
  }

  useEffect(() => {
    if (selections.length === 0) {
      setDisableSetSource(true);
    }
    if (selections.length > 1) {
      setDisableSetSource(true);
    }
    //only for single node selection
    if (selections.length === 1 && !selections[0].includes("->")) {
      setDisableSetSource(false);
    }
    // if it is already a source node
    // This needs to be after the above condition or it will be set to true and then set to false
    if (sourceNode === parseInt(selections[0], 10)) {
      setDisableSetSource(true);
      console.log("Source node is already selected");
    }
  }, [selections, sourceNode]);

  return (
    <>
      {!disableSetSource && (
        <Button1 onClick={SetSource} disabled={disableSetSource}>
          Set As Source
        </Button1>
      )}
    </>
  );
}
