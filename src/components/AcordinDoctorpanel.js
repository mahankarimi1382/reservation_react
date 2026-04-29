"use client";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaMinus } from "react-icons/fa6";

import { FaPlus } from "react-icons/fa";

export default function AcordinDoctorpanel() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className=" flex flex-col gap-5">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        square={true}
        sx={{ borderRadius: "10px", padding: "10px" }}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel1" ? (
              <FaMinus className=" text-4xl rounded-lg text-white bg-[#005DAD] p-2" />
            ) : (
              <FaPlus className=" text-4xl rounded-lg text-white bg-[#005DAD] p-2" />
            )
          }
          aria-controls="panel1-content"
          id="panel1-header"
        >
          دکتر بهرام میرزایی در چه زمینه هایی تخصص دارند؟
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        square={true}
        sx={{ borderRadius: "10px", "&:before": { height: "0px" } }}
        style={{ border: "10px", padding: "10px" }}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel2" ? (
              <FaMinus className=" text-4xl rounded-lg text-white bg-[#005DAD] p-2" />
            ) : (
              <FaPlus className=" text-4xl rounded-lg text-white bg-[#005DAD] p-2" />
            )
          }
          aria-controls="panel2-content"
          id="panel2-header"
        >
          برای چه بیماری‌ها و علائمی می‌توان به دکتر بهنام مقدادی مراجعه کرد؟
          دکتر بهرام میرزایی در تشخیص و درمان علائم و بیماری‌های زیر فعالیت
          می‌کنند:{" "}
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        square={true}
        sx={{ borderRadius: "10px", "&:before": { height: "0px" } }}
        style={{ border: "10px", padding: "10px" }}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel3" ? (
              <FaMinus className=" text-4xl rounded-lg text-white bg-[#005DAD] p-2" />
            ) : (
              <FaPlus className=" text-4xl rounded-lg text-white bg-[#005DAD] p-2" />
            )
          }
          aria-controls="panel3-content"
          id="panel3-header"
        >
          هزینه ویزیت دکتر بهرام میرزایی چنده؟{" "}
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        square={true}
        sx={{ borderRadius: "10px", "&:before": { height: "0px" } }}
        style={{ border: "10px", padding: "10px" }}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel4" ? (
              <FaMinus className=" text-4xl rounded-lg text-white bg-[#005DAD] p-2" />
            ) : (
              <FaPlus className=" text-4xl rounded-lg text-white bg-[#005DAD] p-2" />
            )
          }
          aria-controls="panel3-content"
          id="panel3-header"
        >
          آیا سایر بیماران از بهرام میرزایی رضایت داشته اند؟{" "}
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
