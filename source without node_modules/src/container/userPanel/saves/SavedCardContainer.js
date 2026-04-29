import React from "react";

function SavedCardContainer(props) {
  return (
    <div className=" bg-white shadow-md rounded-lg relative w-full p-2 lg:p-4">
      {props.children}
      <button className=" hidden lg:flex absolute left-4 text-xs lg:left-8 lg:text-base text-[#005DAD] bottom-3">
        مشاهده کامل{" "}
      </button>
    </div>
  );
}

export default SavedCardContainer;
