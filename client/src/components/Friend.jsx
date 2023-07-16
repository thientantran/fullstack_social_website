/* eslint-disable react/prop-types */
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setFriends } from "../Store";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

export default function Friend({
  postUserId,
  name,
  subtitle,
  userPicturePath,
}) {
  const theme = useTheme();
  const friends = useSelector((state) => state.user.friends);
  const isFriend = friends.find((friend) => friend._id === postUserId);
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const loggedUserId = useSelector((state) => state.user._id);
  const navigate = useNavigate();
  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:6060/users/${userId}/${postUserId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage size="55px" image={userPicturePath} />
        <Box
          onClick={() => {
            navigate(`/profile/${postUserId}`);
          }}
        >
          <Typography
            color={theme.palette.neutral.main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: theme.palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={theme.palette.neutral.medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {loggedUserId === postUserId ? (
        <></>
      ) : (
        <IconButton onClick={patchFriend}>
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: theme.palette.primary.dark }} />
          ) : (
            <PersonAddOutlined sx={{ color: theme.palette.primary.dark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
}
