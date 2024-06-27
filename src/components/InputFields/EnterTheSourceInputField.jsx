/* eslint-disable react/prop-types */
import { useState } from "react";
import Button1 from "../Buttons/Button1";

export default function EnterTheSourceInputField({
  sourceNode,
  setSourceNode,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event) => {
    setSourceNode(event.target.value);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <label htmlFor="sourceNode" className="block text-white font-bold mr-6">
          Source Node:
        </label>
        {isEditing ? (
          <div className="flex items-center">
            <input
              id="sourceNode"
              value={sourceNode}
              onChange={handleChange}
              placeholder="Enter The Source Node"
              className="bg-black border-2 border-[#878C8F] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
              type="number"
              onBlur={() => setIsEditing(false)}
            />
            <Button1 onClick={() => setIsEditing(false)}>Done</Button1>
          </div>
        ) : (
          <div className="text-center  flex items-center ">
            <span className="text-white pl-10 pr-10 rounded-md border-2 border-[#878C8F]">
              {sourceNode}
            </span>
            <Button1 onClick={() => setIsEditing(true)}>Edit</Button1>
          </div>
        )}
      </div>
    </>
  );
}
