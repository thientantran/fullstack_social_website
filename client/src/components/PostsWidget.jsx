import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPosts } from "../Store";
import PostWidget from "./PostWidget";

export default function PostsWidget() {
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
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <Stack direction="column-reverse">
      {posts.map((post) => (
        <PostWidget key={post._id} post={post} />
      ))}
    </Stack>
  );
}
