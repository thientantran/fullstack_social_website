import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

import AdvertWidget from "../components/AdvertWidget";
import FriendListWidget from "../components/FriendListWidget";
import MyPostWidget from "../components/MyPostWidget";
import PostsWidget from "../components/PostsWidget";
import UserWidget from "../components/UserWidget";
import Navbar from "./Navbar";

export default function HomePage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget picturePath={picturePath} userId={_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget />
          <PostsWidget />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget />
          </Box>
        )}
      </Box>
    </Box>
  );
}
