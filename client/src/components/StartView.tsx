import { CSSProperties } from "react";
import StartInfo from "./StartInfo.";

function StartView() {
  return (
    <div style={rootStyle}>
      <StartInfo />
      <div style={imageContStyle}>
        <img style={imageStyle} src="/src/assets/Chathouse.svg" alt="" />
      </div>
    </div>
  );
}

const imageContStyle: CSSProperties = {
  height: "100%",
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",
};

const imageStyle: CSSProperties = {
  marginTop: "auto",
  marginBottom: "0",
  height: "90%",
};

const rootStyle: CSSProperties = {
  background: "#08162C",
  padding: "0px !important",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%",
};

export default StartView;
