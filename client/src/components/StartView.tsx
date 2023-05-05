import { Box, Container } from "@mui/material";
import { CSSProperties } from "react";
import StartInfo from "./StartInfo.";

function StartView() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        background: "#08162C",
        padding: "0px !important",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}>
      <StartInfo />
      <Box
        sx={{
          height: "100%",
          flex: 1,
          display: "flex",
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
