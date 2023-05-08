import { Box, Container } from "@mui/material";
import { CSSProperties } from "react";
import StartInfo from "./StartInfo.";
import background from "/src/assets/starsky.png";

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
  marginTop: "2rem",
  // position: "absolute",
  bottom: "0",
  right: "0",
  marginRight: "auto",
  marginBottom: "auto",
  height: "90%",
  zIndex: "2",
};

const rootStyle: CSSProperties = {
  background: "#08162C",
  padding: "0px !important",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  // position: "relative",
  marginTop: "auto",
  marginBottom: "0",
  height: "90%",

};

export default StartView;
