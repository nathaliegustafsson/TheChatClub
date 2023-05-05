import { Button, Container, TextField } from "@mui/material";
import { CSSProperties } from "react";

function NameForm() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "0px !important",
        marginTop: "4rem",
      }}>
      <form style={rootStyle}>
        <TextField
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name"
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
          }}></TextField>
        <Button
          variant="contained"
          sx={{
            width: "25%",
            fontSize: "1rem",
          }}>
          Save
        </Button>
      </form>
    </Container>
  );
}

const rootStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

export default NameForm;
