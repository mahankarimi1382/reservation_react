import React from "react";

function LoadingComponent() {
  return (
    <div className=" fixed w-full h-full top-0 right-0 bg-slate-200 bg-opacity-40 z-50 flex justify-center items-center">
      <span className="loading loading-spinner text-[#005DAD] loading-lg"></span>
    </div>
  );
}

export default LoadingComponent;
