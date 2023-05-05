import { CSSProperties } from "react";
import StartInfo from "./StartInfo.";

function StartView() {
  return (
    // <Container
    // maxWidth="xl"
    // sx={{
    //   background: (theme) => theme.palette.background.default,
    //   padding: "0px !important",
    //   display: "flex",
    //   flexDirection: "row",
    //   justifyContent: "space-between",
    //   position: "relative",
    // }}>
    <div style={rootStyle}>
      <StartInfo />
      <img style={imageStyle} src="/src/assets/Chathouse.svg" alt="" />
    </div>
    // </Container>
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
};

export default StartView;
