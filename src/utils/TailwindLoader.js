import React from "react";

function TailwindLoader() {
  return (
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-[#005DAD] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    />
  );
}

export default TailwindLoader;
