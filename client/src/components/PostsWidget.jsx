import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostWidget from "./PostWidget";
import { setPosts } from "../Store";

// eslint-disable-next-line react/prop-types
export default function PostsWidget({ userId, isProfile = false }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:6060/post/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  const getUserPost = async () => {
    const response = await fetch(`http://localhost:6060/post/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  useEffect(() => {
    if (isProfile) {
      getUserPost();
    } else {
      getPosts(userId);
    }
  }, [userId]);
  return (
    <Stack direction="column-reverse">
      {posts.map((post) => (
        <PostWidget key={post._id} post={post} />
      ))}
    </Stack>
  );
}
