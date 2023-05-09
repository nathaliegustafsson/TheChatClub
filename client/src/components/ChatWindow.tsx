import { Box, Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useSocket } from "../context/SocketContext";

function ChatWindow() {
  const [message, setMessage] = useState("");
  const { sendMessage, messages, room } = useSocket();

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "83vh",
      }}>
      {room === "" ? (
        <img
          src="/src/assets/yellowmailbox.png"
          alt="No active chat"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ) : (
        <>
          <h1>The Chat</h1>
          <ul>
            {messages.map((message, i) => (
              <li key={i} style={{ color: "black" }}>
                {message.username}: {message.message}
              </li>
            ))}
          </ul>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              flex: 1,
            }}>
            <form onSubmit={handlesubmit} style={{ display: "flex", flex: 1 }}>
              <TextField
                id="outlined-messages-input"
                name="messages"
                autoComplete="off"
                placeholder="Write here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{
                  flex: 1,
                  marginRight: "1rem",
                  "& .MuiInputBase-input": {
                    bgcolor: "#ECECEC",
                    borderRadius: "20rem",
                    height: "0.5rem",
                    color: (theme) => theme.palette.text.secondary,
                    fontFamily: (theme) => theme.typography.body1,
                  },
                  "& .MuiOutlinedInput-root": {
                    height: "2.5rem",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(218, 215, 215)",
                  },
                }}
              />
              <Button variant="contained" type="submit">
                Send
              </Button>
            </form>
          </Box>
        </>
      )}
    </Container>
  );
}

export default ChatWindow;
