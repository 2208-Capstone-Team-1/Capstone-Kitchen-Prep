import { Box, LinearProgress } from "@mui/material";

const MuiLoader = () => {
  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      <LinearProgress color="inherit" style={{ height: "6px" }} />
    </Box>
  );
};

export default MuiLoader;
