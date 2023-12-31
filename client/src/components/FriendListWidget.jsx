import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Friend from "./Friend";
import WidgetWrapper from "./WidgetWrapper";
import { setFriends } from "../Store";

// eslint-disable-next-line react/prop-types
export default function FriendListWidget({ userId }) {
  const theme = useTheme();
  const friends = useSelector((state) => state.user.friends);
  // chỗ này là sau khi lấy data từ API sẽ được đưa vào store, rồi từ store lấy ra
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:6060/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  useEffect(() => {
    getFriends();
  }, [userId]);
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
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend, index) => (
          <Friend
            key={friend._id}
            postUserId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.location}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
}
