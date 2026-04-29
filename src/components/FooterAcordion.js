"use client";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
function FooterAcordion() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className=" xl:hidden w-full">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          دکتر سریع
        </AccordionSummary>
        <AccordionDetails className=" flex flex-col gap-5 text-[#817D7D]">
          <div className=" w-44 gap-5  text-[#757575] flex flex-col">
            <h2>سوالات متداول</h2>
            <Link to="/contact-us">تماس با ما</Link>
            <Link to="/about-us">درباره ما</Link>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          پشتیبانی
        </AccordionSummary>
        <AccordionDetails className=" flex flex-col gap-5 text-[#817D7D]">
          <hr />
          نه
        </AccordionDetails>{" "}
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          نیکوکاری
        </AccordionSummary>
        <AccordionDetails className=" flex flex-col gap-5 text-[#817D7D]">
          <hr />
          نمیتونی
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          خدمات{" "}
        </AccordionSummary>
        <AccordionDetails className=" flex flex-col gap-5 text-[#817D7D]">
          <hr />
          نمیتونی
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default FooterAcordion;
