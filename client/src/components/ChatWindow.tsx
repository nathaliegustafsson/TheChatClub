import { Avatar, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useSocket } from "../context/SocketContext";

function ChatWindow() {
  const [message, setMessage] = useState("");
  const { sendMessage, messages, username } = useSocket();
  // const { sendMessage, messages, username, room, setMessages } = useSocket();

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  // useEffect(() => {
  //   // Clear messages when the room changes
  //   setMessages([]);
  // }, [room]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        height: "82vh",
      }}
    >
      <ul
        style={{
          margin: 0,
          marginTop: "0.5rem",
          padding: 0,
          overflowY: "scroll",
        }}
      >
        {messages.map((message, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                username === message.username ? "flex-end" : "flex-start",
              marginRight: "2rem",
            }}
          >
            <li
              style={{
                display: "flex",
                color: "black",
                listStyle: "none",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      username === message.username ? "flex-end" : "flex-start",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="./lilafigur.png/"
                    sx={{ marginRight: "0.9rem", marginBottom: "0.5rem" }}
                  />
                  <p
                    style={{
                      color: "black",
                      margin: 0,
                      marginBottom: "0.3rem",
                      fontSize: "0.95rem",
                      textAlign: "left",
                    }}
                  >
                    {message.username}
                  </p>
                </div>
                <div style={{ marginLeft: "3.1rem" }}>
                  <div
                    style={{
                      backgroundColor:
                        username === message.username ? "#FFEAFA" : "#CDDDF4",
                      borderRadius: "2rem",
                      padding: "0.7rem",
                      marginBottom: "0.8rem",
                      height: "auto",
                      maxWidth: "20rem",
                    }}
                  >
                    {message.message}
                  </div>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          flex: 1,
        }}
      >
        <form
          onSubmit={handlesubmit}
          style={{
            display: "flex",
            flex: 1,
            marginBottom: "0.5rem",
            marginTop: "1rem",
          }}
        >
          <TextField
            id="outlined-messages-input"
            name="messages"
            autoComplete="off"
            placeholder="Write here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            // onBlur={handleBlur}
            // error={Boolean(formik.touched.username && formik.errors.username)}
            // helperText={formik.touched.username && formik.errors.username}
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
    </Box>
  );
}

export default ChatWindow;
