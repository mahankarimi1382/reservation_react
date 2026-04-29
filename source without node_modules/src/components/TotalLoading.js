"use client"
import { TotalLoadingStore } from "../store/Store";
import React from "react";

function TotalLoading() {
  const { isTotalLoading } = TotalLoadingStore();

  return (
    isTotalLoading && (
      <div className=" fixed w-full h-full top-0 right-0 bg-slate-200 bg-opacity-40 z-50 flex justify-center items-center">
        <span className="loading loading-spinner text-[#005DAD] loading-lg"></span>
      </div>
    )
  );
}

export default TotalLoading;
