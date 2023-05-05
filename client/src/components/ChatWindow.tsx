import { Box, Button, Container, TextField } from "@mui/material";

function ChatWindow() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "83vh",
      }}
    >
      <h1>The Chat</h1>
      <ul style={{ background: "yellow" }}>
        {/* <!--- Injected via JS --> */}
      </ul>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          flex: 1,
        }}
      >
        <TextField
          id="outlined-username-input"
          name="username"
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          // value={formik.values.username}
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
              fontFamily: (theme) => theme.typography.body2,
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
      </Box>
    </Container>
  );
}

export default ChatWindow;
