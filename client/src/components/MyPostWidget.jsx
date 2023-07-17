import {
  AttachFileOutlined,
  DeleteOutline,
  EditOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";

import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import WidgetWrapper from "./WidgetWrapper";
import { setPosts } from "../Store";
// eslint-disable-next-line react/prop-types
export default function MyPostWidget({ picturePath }) {
  const theme = useTheme();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    const response = await fetch(`http://localhost:6060/post/createpost`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
    setIsImage(false);
  };
  return (
    <WidgetWrapper marginBottom="2rem">
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          onChange={(e) => setPost(e.target.value)}
          value={post} // useState ở trên
          placeholder="What's on your mind ..."
          sx={{
            width: "100%",
            backgroundColor: theme.palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          mt="1rem"
          p="1rem"
          border={`1px solid ${theme.palette.neutral.medium}`}
          borderRadius="5px"
        >
          <Dropzone
            acceptedFiles=".jpg,jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  // get input
                  {...getRootProps()}
                  border={`2px dashed ${theme.palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  {/* chú ý nhận input */}
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutline />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: theme.palette.neutral.mediumMain }} />
          <Typography
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.neutral.medium,
              },
            }}
            color={theme.palette.neutral.mediumMain}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25re">
              <GifBoxOutlined
                sx={{ color: theme.palette.neutral.mediumMain }}
              />
              <Typography color={theme.palette.neutral.mediumMain}>
                Clip
              </Typography>
            </FlexBetween>
            <FlexBetween gap="0.25re">
              <AttachFileOutlined
                sx={{ color: theme.palette.neutral.mediumMain }}
              />
              <Typography color={theme.palette.neutral.mediumMain}>
                Attachment
              </Typography>
            </FlexBetween>
            <FlexBetween gap="0.25re">
              <MicOutlined sx={{ color: theme.palette.neutral.mediumMain }} />
              <Typography color={theme.palette.neutral.mediumMain}>
                Audio
              </Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween>
            <MoreHorizOutlined
              sx={{ color: theme.palette.neutral.mediumMain }}
            />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: theme.palette.background.alt,
            backgroundColor: theme.palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          Post
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
}
