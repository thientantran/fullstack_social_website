import { Box, styled } from "@mui/material";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  // chỗ ở trên có probs theme, nhưng khi dùng ko thấy bỏ theme vào prop
  // => trả lời: theme này nó chính là theme, reeact tự nhận biết
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
}));

export default WidgetWrapper;
