import React from "react";
import { AiFillMessage } from "react-icons/ai";

function SupportModal() {
  return (
    <div className=" fixed z-50 flex justify-center items-center rounded-full w-24 bg-blue-700 h-24">
      <AiFillMessage />
    </div>
  );
}

export default SupportModal;
