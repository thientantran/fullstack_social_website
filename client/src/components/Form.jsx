import { EditOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

import FlexBetween from "./FlexBetween";

export default function Form() {
  const theme = useTheme();
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Formik>
      <form>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0,1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {!isLogin && (
            <>
              <TextField
                label="First Name"
                name="firstName"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Last Name"
                name="lastName"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Location"
                name="location"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Occupation"
                name="occupation"
                sx={{ gridColumn: "span 4" }}
              />
              <Box
                gridColumn="span 4"
                border={`1px solid ${theme.palette.neutral.medium}`}
                borderRadius="5px"
                p="1rem"
              >
                <Dropzone acceptedFiles=".jpg,.jpeg,.png" multiple={false}>
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${theme.palette.primary.main}`}
                      p="1rem"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      <p>Add Picture Here</p>
                      <FlexBetween>
                        <Typography>values.picture.name</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    </Box>
                  )}
                </Dropzone>
              </Box>
            </>
          )}
          <TextField label="Email" name="email" sx={{ gridColumn: "span 4" }} />
          <TextField
            label="Password"
            name="password"
            sx={{ gridColumn: "span 4" }}
          />
        </Box>

        {/* BUTTON */}
        <Box>
          <Button
            fullWidth
            type="submit"
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.alt,
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            {isLogin ? "LOGIN" : "REGISTER"}
          </Button>

          <Typography
            onClick={() => {
              setPageType(isLogin ? "nonLogin" : "login");
            }}
            sx={{
              textDecoration: "underline",
              color: theme.palette.primary.main,
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.light,
              },
            }}
          >
            {isLogin
              ? "Don't have an account? Sign Up here."
              : "Already have an account? Login here."}
          </Typography>
        </Box>
      </form>
    </Formik>
  );
}
