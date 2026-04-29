"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

import { PiStar } from "react-icons/pi";
import { PiStarFill } from "react-icons/pi";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#E8A33C",
  },
  "& .MuiRating-iconHover": {
    color: "#d1a700",
  },
});

export default function RatingStars({ onChange }) {
  const [value, setValue] = React.useState(0); // مقدار امتیاز

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onChange) onChange(newValue); // مقدار رو به والد بده
  };

  return (
    <div dir="ltr">
      <Box>
        <StyledRating
          className="text-3xl"
          name="customized-color"
          value={value}
          onChange={handleChange}
          icon={<PiStarFill fontSize="inherit" />}
          emptyIcon={<PiStar fontSize="inherit" />}
        />
      </Box>
    </div>
  );
}
