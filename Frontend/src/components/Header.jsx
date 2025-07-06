import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Header() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: theme.palette.header.background,
        px: 4, // horizontal padding
        py: 2, // vertical padding
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        border: "none",
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          color: theme.palette.header.text,
          letterSpacing: 1,
          userSelect: "none",
        }}
      >
        The Professor's Database
      </Typography>
    </Box>
  );
}
