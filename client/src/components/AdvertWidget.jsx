import { Typography, useTheme } from "@mui/material";
import React from "react";

import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";

export default function AdvertWidget() {
  const theme = useTheme();

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography
          color={theme.palette.neutral.dark}
          variant="h5"
          fontWeight="500"
        >
          Sponsored
        </Typography>
        <Typography color={theme.palette.neutral.medium}>Created Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:6060/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={theme.palette.neutral.main}>Love Jisoo</Typography>
        <Typography color={theme.palette.neutral.medium}>
          thientantran.github.io
        </Typography>
      </FlexBetween>
      <Typography color={theme.palette.neutral.medium} m="0.5rem 0">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, qui?
      </Typography>
    </WidgetWrapper>
  );
}
