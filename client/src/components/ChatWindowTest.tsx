import { Box, Container } from "@mui/material";
import { CSSProperties } from "react";

function ChatWindowTest() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        bgcolor: "lightblue",
      }}
    >
      <h1>Ett chattnamn</h1>
      <Box sx={{ display: "flex", flexDirection: "row"}}>
        <form>
          <input
            style={inputStyle}
            type="text"
            name="message"
            placeholder="Write a message..."
            //   value={message}
            //   onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" style={btnStyle}>
            Send
          </button>
        </form>
      </Box>
    </Container>
  );
}



const inputStyle: CSSProperties = {
  borderRadius: "20rem",
  border: "none",
  background: "lightgrey",
  padding: "0.8rem",
  display: "flex",
  flex: 1,
  marginRight: "1rem",
};

const btnStyle: CSSProperties = {
  borderRadius: "20rem",
  border: "none",
  background: "pink",
  padding: "0.8rem",
  display: "flex",
  flex: 1,
};

export default ChatWindowTest;
