import { Box, useMediaQuery } from "@mui/material";

import FriendListWidget from "../components/FriendListWidget";
import MyPostWidget from "../components/MyPostWidget";
import PostsWidget from "../components/PostsWidget";
import UserWidget from "../components/UserWidget";
import Navbar from "./Navbar";
export default function ProfilePage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget />
          <Box m="2rem 0" />
          <FriendListWidget />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget />
          <Box m="2rem 0" />
          <PostsWidget />
        </Box>
      </Box>
    </Box>
  );
}
