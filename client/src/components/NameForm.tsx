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
        <TextField id="name" type="text" name="name" label="Name"></TextField>
        <Button
          variant="contained"
          sx={{
            width: "25%",
            fontSize: "1.5rem",
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
