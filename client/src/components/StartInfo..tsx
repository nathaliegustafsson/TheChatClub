import { Container } from "@mui/material";
import NameForm from "./NameForm";
import Title from "./Title";

function StartInfo() {
  return (
    <Container
      maxWidth="xs"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: { xs: "2rem" },
      }}>
      <Title />
      <NameForm />
    </Container>
  );
}

export default StartInfo;
