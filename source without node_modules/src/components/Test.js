"use client";
import DoctorsPaginate from "../container/Doctors/DoctorsPaginate";
import FilterDoctors from "../container/Doctors/FilterDoctors";
import React, { useRef, useEffect, useState } from "react";

export default function Test() {
  const [isFixed, setIsFixed] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFixed(false);
        } else {
          setIsFixed(true);
        }
      },
      {
        root: null,
        threshold: 1.0,
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <div dir="rtl" className=" flex justify-between ">
      <div className="content">
        <DoctorsPaginate />
      </div>
      <div
        ref={targetRef}
        className={`sticky-component ${
          isFixed ? "fixed bottom-0 left-0 w-full" : ""
        }`}
      >
        <FilterDoctors />
      </div>
    </div>
  );
}
