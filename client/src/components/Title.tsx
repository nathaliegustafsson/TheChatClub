import { Box, Container, Typography } from "@mui/material";
import { theme } from "../theme/theme";

function Title() {
  return (
    <Container
      sx={{
        padding: "0px !important",
      }}>
      <Box>
        <Typography
          variant="body2"
          fontSize={"3.5rem"}
          marginBottom={"-1.5rem"}
          color={theme.palette.text.primary}>
          The
        </Typography>
        <Typography variant="h3" color={theme.palette.text.primary}>
          CHAT CLUB
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h4"
          marginTop={"2rem"}
          color={theme.palette.text.primary}>
          Whenever, wherever you want.
        </Typography>
      </Box>
    </Container>
  );
}

export default Title;