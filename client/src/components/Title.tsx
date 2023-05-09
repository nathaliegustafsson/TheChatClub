import { Box, Typography } from "@mui/material";
import { theme } from "../theme/theme";

function Title() {
  return (
    <Box
      sx={{
        padding: "0px !important",
      }}>
      <Box>
        {/* <Typography
          variant="body2"
          fontSize={"3.5rem"}
          marginBottom={"-1.5rem"}
          color={theme.palette.text.primary}>
          The
        </Typography>
        <Typography variant="h3" color={theme.palette.text.primary}>
          CHAT CLUB
        </Typography> */}
        <img src="/src/assets/logo.png" alt="" />
      </Box>
      <Box>
        <Typography
          variant="h4"
          marginTop={"2rem"}
          color={theme.palette.text.primary}>
          Whenever, wherever you want.
        </Typography>
      </Box>
    </Box>
  );
}

export default Title;
