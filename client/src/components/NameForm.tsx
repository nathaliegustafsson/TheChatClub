import { Button, Box, TextField } from "@mui/material";
import { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

function NameForm() {
  const [username, setUsername] = useState("");
  const { saveUsername } = useSocket();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveUsername(username);
    navigate("/chat");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "0px !important",
        marginTop: "4rem",
      }}
    >
      <form style={rootStyle} onSubmit={handleSubmit}>
        <TextField
          id="username"
          type="text"
          name="username"
          label="Enter your username"
          value={username}
          onChange={handleChange}
           sx={{
            "& .MuiInputBase-input": {
              bgcolor: "#ECECEC",
              borderRadius: "20rem",
              color: (theme) => theme.palette.text.secondary,
              fontFamily: (theme) => theme.typography.body1,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        ></TextField>
        <Button
          variant="contained"
          type="submit"
          sx={{
            width: "25%",
            fontSize: "1rem",
          }}
        >
          Save
        </Button>
      </form>
    </Box>

  );
}

const rootStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  width: "100%",

};

export default NameForm;
