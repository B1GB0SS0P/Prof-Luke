import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Header() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: theme.palette.header.background,
        px: 4,
        py: 2,
        borderRadius: 5,
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center",     // Center vertically (optional)
        textAlign: "center",
        border: "2px solid white"
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          color: "white",
          letterSpacing: 1,
          userSelect: "none",
          fontWeight: '700'
        }}
      >
        The Professor's Database
      </Typography>
    </Box>
  );
}

