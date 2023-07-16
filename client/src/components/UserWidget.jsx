import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutline,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import WidgetWrapper from "./WidgetWrapper";

// eslint-disable-next-line react/prop-types
export default function UserWidget({ userId, picturePath }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:6060/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  if (!user) {
    return null;
  }
  // nếu ko có user thì return về null lun, sẽ ko render ra gì, đợi gọi api đc thì ok
  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
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
              {firstName} {lastName}
            </Typography>
            <Typography color={theme.palette.neutral.medium}>
              {friends.length} friends
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
          <Typography color={theme.palette.neutral.medium}>
            {location}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutline
            fontSize="large"
            sx={{ color: theme.palette.neutral.main }}
          />
          <Typography color={theme.palette.neutral.medium}>
            {occupation}
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
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween mb="0.5rem">
          <Typography color={theme.palette.neutral.medium}>
            Impressions your posts
          </Typography>
          <Typography color={theme.palette.neutral.main} fontWeight="500">
            {impressions}
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
