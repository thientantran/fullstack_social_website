/* eslint-disable react/prop-types */
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";

import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

export default function Friend({
  postUserId,
  name,
  subtitle,
  userPicturePath,
}) {
  const theme = useTheme();
  const isFriend = false;
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage size="55px" image={userPicturePath} />
        <Box>
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
      <IconButton>
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: theme.palette.primary.dark }} />
        ) : (
          <PersonAddOutlined sx={{ color: theme.palette.primary.dark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
}
