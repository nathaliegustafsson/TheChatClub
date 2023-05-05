import { Box, Button, Container, TextField } from "@mui/material";

function ChatWindow() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        bgcolor: "lightblue",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        alignContent: "space-between",
      }}
    >
      <h1>The Chat</h1>
      <ul style={{ background: "yellow" }}>
        {/* <!--- Injected via JS --> */}
      </ul>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "pink",
          width: "100%",
          flex: 1,
          "& .MuiTextField-root": {
            m: 2,
          },
        }}
      >
        <TextField
          fullWidth
          id="outlined-username-input"
          name="username"
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          // value={formik.values.username}
          // error={Boolean(formik.touched.username && formik.errors.username)}
          // helperText={formik.touched.username && formik.errors.username}
          sx={{
            bgcolor: "green",
            flex: 1,
            "& .MuiInputBase-input": {
              bgcolor: "#ECECEC",
              borderRadius: "20rem",
              height: "0.5rem",
              flex: 1,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "20rem",
              height: "2.5rem",
              flex: 1,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(218, 215, 215)",
              flex: 1,
            },
          }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ borderRadius: "3rem", height: "2.5rem", width: "8rem" }}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
}

export default ChatWindow;
