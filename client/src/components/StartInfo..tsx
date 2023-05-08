import { Box } from "@mui/material";
import NameForm from "./NameForm";
import Title from "./Title";

function StartInfo() {
  return (
    <Box
      maxWidth={"sm"}
      sx={{
        height: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: { xs: "2rem" },
      }}>
      <Title />
      <NameForm />
    </Box>
  );
}

export default StartInfo;
