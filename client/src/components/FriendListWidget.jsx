import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";

import Friend from "./Friend";
import WidgetWrapper from "./WidgetWrapper";

export default function FriendListWidget() {
  const theme = useTheme();
  return (
    <WidgetWrapper>
      <Typography
        color={theme.palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Stack direction="column" gap="1.5rem">
        {Array(5)
          .fill(0)
          .map((index) => (
            <Friend key={index} />
          ))}
      </Stack>
    </WidgetWrapper>
  );
}
