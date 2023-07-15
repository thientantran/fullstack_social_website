/* eslint-disable react/prop-types */
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";

import FlexBetween from "./FlexBetween";
import Friend from "./Friend";
import WidgetWrapper from "./WidgetWrapper";

export default function PostWidget({
  picturePath = "https://townsquare.media/site/252/files/2021/08/attachment-blackpink-jisoo-blonde-e1628094363838.jpg",
}) {
  const [isComment, setIsComment] = useState(false);
  const theme = useTheme();
  const isLiked = true;
  const likeCounts = 1000;
  return (
    <WidgetWrapper m="2rem 0">
      <Friend />
      <Typography color={theme.palette.neutral.main} sx={{ mt: "1rem" }}>
        Posts Description
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: ").75rem" }}
          src={picturePath}
        />
      )}

      <FlexBetween mt="0.25re">
        <FlexBetween gap="1rem">
          {/* LIKE */}
          <FlexBetween gap="0.3rem">
            <IconButton>
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
            <Typography>Số lượng comment 1000</Typography>
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
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Box key={index}>
                <Divider />
                <Typography
                  sx={{
                    color: theme.palette.primary.main,
                    m: "0.5rem 0",
                    pl: "1rem",
                  }}
                >{`comment ${index}`}</Typography>
              </Box>
            ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
}
