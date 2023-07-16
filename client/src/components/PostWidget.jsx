/* eslint-disable react/prop-types */
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPost } from "../Store";
import FlexBetween from "./FlexBetween";
import Friend from "./Friend";
import WidgetWrapper from "./WidgetWrapper";

export default function PostWidget({ post }) {
  const [isComment, setIsComment] = useState(false);
  const theme = useTheme();
  const loggedUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(post.likes[loggedUserId]);
  const likeCounts = Object.keys(post.likes).length;
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const patchLike = async () => {
    const responese = await fetch(
      `http://localhost:6060/post/${post._id}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedUserId }),
      }
    );
    const updatedPost = await responese.json();
    dispatch(setPost({ post: updatedPost }));
  };
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        postUserId={post.userId}
        name={`${post.firstName} ${post.lastName}`}
        subtitle={post.location}
        userPicturePath={post.userPicturePath}
      />
      <Typography color={theme.palette.neutral.main} sx={{ m: "1rem 0" }}>
        {post.description}
      </Typography>
      {post.picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: ").75rem" }}
          src={`http://localhost:6060/assets/${post.picturePath}`}
        />
      )}

      <FlexBetween mt="0.25re">
        <FlexBetween gap="1rem">
          {/* LIKE */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: theme.palette.primary.main }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCounts}</Typography>
          </FlexBetween>

          {/* COMMENTS */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComment(!isComment)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{post.comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {/* SHARE POST */}
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {/* Write COMMENT */}
      {isComment && (
        <Box>
          {/* chỉ thay đổi array thôi */}
          {post.comments.map((comment, index) => (
            <Box key={index}>
              <Divider />
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  m: "0.5rem 0",
                  pl: "1rem",
                }}
              >{`${comment}`}</Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
}
