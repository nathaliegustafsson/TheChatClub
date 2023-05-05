import { Box, Container, Typography } from "@mui/material";
import { theme } from "../theme/theme";

function Title() {
  return (
    <Container
      maxWidth="xs"
      sx={{
        padding: "0px !important",
        marginLeft: "0",
        marginRight: "0",
      }}>
      <Box>
        <Typography
          variant="body2"
          fontSize={"3.5rem"}
          marginBottom={"-1.5rem"}
          color={theme.palette.text.secondary}>
          The
        </Typography>
        <Typography variant="h3" color={theme.palette.text.secondary}>
          CHAT CLUB
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h4"
          marginTop={"2rem"}
          color={theme.palette.text.secondary}>
          Whenever, wherever you want.
        </Typography>
      </Box>
    </Container>
  );
}

export default Title;
