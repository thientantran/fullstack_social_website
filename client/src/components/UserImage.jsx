/* eslint-disable react/prop-types */
import { Box } from "@mui/material";

export default function UserImage({
  image = "https://upload.wikimedia.org/wikipedia/commons/1/10/210928_Jisoo_%286%29.jpg",
  size = "60px",
}) {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        height={size}
        width={size}
        src={image}
        alt="jisoo"
      />
    </Box>
  );
}
