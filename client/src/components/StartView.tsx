import { Box, Container } from "@mui/material";
import { CSSProperties } from "react";
import StartInfo from "./StartInfo.";
import background from "/src/assets/gifstarbig.gif";

function StartView() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundImage: `url(${background})`,
        padding: "0px !important",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        height: "100%",
      }}>
      <Box
        sx={{
          height: "100%",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          margin: "1rem",
        }}>
        <StartInfo />
      </Box>
      <Box
        sx={{
          height: "100%",
          flex: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
        }}>
        <img style={imageStyle} src="/src/assets/fullhouse.png" alt="" />
      </Box>
    </Container>
  );
}

const imageStyle: CSSProperties = {
  marginTop: "auto",
  marginBottom: "0",
  height: "90%",
};

export default StartView;
