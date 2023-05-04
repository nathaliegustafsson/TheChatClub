import { Container } from "@mui/material";
import StartInfo from "./StartInfo.";

function StartView() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        background: (theme) => theme.palette.background.default,
        padding: "0px !important",
        display: "flex",
      }}>
      <StartInfo />
      <img src="/src/assets/Chathouse.svg" alt="" />
    </Container>
  );
}

export default StartView;
