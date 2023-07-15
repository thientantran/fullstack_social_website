import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutline,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";

import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import WidgetWrapper from "./WidgetWrapper";

export default function UserWidget() {
  const theme = useTheme();
  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <UserImage />
          <Box>
            <Typography
              variant="h4"
              color={theme.palette.neutral.dark}
              fontWeight="500"
              sx={{
                "&:hover": { color: theme.palette.primary.light },
                cursor: "pointer",
              }}
            >
              User Name
            </Typography>
            <Typography color={theme.palette.neutral.medium}>
              10 friends
            </Typography>
          </Box>
        </FlexBetween>
        {/* tách 2 đầu */}
        <IconButton>
          <ManageAccountsOutlined />
        </IconButton>
      </FlexBetween>

      <Divider />
      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined
            fontSize="large"
            sx={{ color: theme.palette.neutral.main }}
          />
          <Typography color={theme.palette.neutral.medium}>Địa chỉ</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutline
            fontSize="large"
            sx={{ color: theme.palette.neutral.main }}
          />
          <Typography color={theme.palette.neutral.medium}>
            Công việc
          </Typography>
        </Box>
      </Box>

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={theme.palette.neutral.medium}>
            Who is viewed your profile
          </Typography>
          <Typography color={theme.palette.neutral.main} fontWeight="500">
            12345
          </Typography>
        </FlexBetween>
        <FlexBetween mb="0.5rem">
          <Typography color={theme.palette.neutral.medium}>
            Impressions your posts
          </Typography>
          <Typography color={theme.palette.neutral.main} fontWeight="500">
            12345
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH */}
      <Box p="1rem 0">
        <Typography
          fontSize="1rem"
          color={theme.palette.neutral.main}
          fontWeight="500"
          mb="1rem"
        >
          Social Profile
        </Typography>

        <FlexBetween gap="rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../public/assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={theme.palette.neutral.main}>
                Twitter
              </Typography>
              <Typography color={theme.palette.neutral.medium}>
                Social Network
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined />
        </FlexBetween>
        <FlexBetween gap="rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../public/assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={theme.palette.neutral.main}>
                Linkedin
              </Typography>
              <Typography color={theme.palette.neutral.medium}>
                Network Platform
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
}
