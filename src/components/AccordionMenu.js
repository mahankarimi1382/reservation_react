"use client";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OperatorPic from "../assets/Pics/OperatorPic.png";
export default function AccordionMenu() {
  // const [expanded, setExpanded] = React.useState(true);
  // const [isOpen, setIsOpen] = React.useState(true);
  // const handleChange = (panel) => (event, isExpanded) => {
  //   setIsOpen(false);
  //   setExpanded(isExpanded ? panel : false);
  // };

  return (
    <div className=" w-full h-[679px] lg:h-[580px] flex-col lg:flex-row lg:justify-between items-center bg-[rgba(159,166,168,0.08)] flex">
      <div className=" m-4 lg:m-0 lg:w-1/2 lg:-mt-32 lg:mr-20">
        <div className=" w-full flex justify-center items-center lg:items-start lg:justify-start">
          <h2 className=" lg:mb-10 flex items-center gap-2 text-[18px] m-5 lg:m-0 lg:text-[30px]">
            <span className=" text-[#005DAD]">سوالات</span>
            متداول
          </h2>
        </div>
        <Accordion
          // expanded={isOpen}
          // onChange={() => {
          //   setIsOpen(!isOpen);
          // }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            + آیا می توانیم نوبت خود را لغو یا تغییر دهیم؟
          </AccordionSummary>
          <AccordionDetails className=" flex flex-col gap-5 text-[#817D7D]">
            <hr />
            نه
          </AccordionDetails>{" "}
        </Accordion>{" "}
        <Accordion
          // expanded={expanded === "panel2"}
          // onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            + آیا می توانیم نوبت خود را لغو یا تغییر دهیم؟
          </AccordionSummary>
          <AccordionDetails className=" flex flex-col gap-5 text-[#817D7D]">
            <hr />
            نه
          </AccordionDetails>{" "}
        </Accordion>
        <Accordion
          // expanded={expanded === "panel3"}
          // onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            + چگونه میتوانم اطلاعات پزشکی را مشاهده کنم ؟
          </AccordionSummary>
          <AccordionDetails className=" flex flex-col gap-5 text-[#817D7D]">
            <hr />
            نمیتونی
          </AccordionDetails>
        </Accordion>
        <Accordion
          // expanded={expanded === "panel4"}
          // onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            + چگونه میتوانم نظرات خود را درباره ی پزشکان بنویسم ؟
          </AccordionSummary>
          <AccordionDetails className=" flex flex-col gap-5 text-[#817D7D]">
            <hr />
            نمیتونی
          </AccordionDetails>
        </Accordion>
      </div>
      <div className=" flex justify-center items-center lg:h-[354px] lg:rounded-r-md lg:rounded-none h-[153px] w-11/12 rounded-md lg:w-[630px] bg-[rgba(199,227,254,0.8)]">
        <div className=" shadow-lg bg-white h-[223px] w-[291px] lg:w-[376px] lg:mt-24 mt-24 lg:h-[390px] items-center gap-4 lg:gap-8 rounded-lg justify-center flex flex-col">
          <img
            width={150}
            className=" w-[82px] lg:w-[150px]"
            src={OperatorPic}
            alt="operator-pic"
          />
          <h2 className=" text-[12px] lg:text-[16px]">
            نیاز به راهنمایی دارید؟
          </h2>
          <p className=" text-[12px] lg:text-base text-[#817D7D]">
            روی دکمه زیر کلیک کنید و مستقیم تماس بگیرید
          </p>
          <a href="tel:02144006901" className=" text-[12px] lg:text-[16px] text-white bg-[#005DAD] p-2 px-5 lg:px-10 rounded-md lg:rounded-lg">
            تماس بگیرید
          </a>
        </div>
      </div>
    </div>
  );
}
