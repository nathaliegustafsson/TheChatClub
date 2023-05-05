import { Container } from "@mui/material";
import NameForm from "./NameForm";
import Title from "./Title";

function StartInfo() {
  return (
    <Container
      maxWidth="xs"
      sx={{
        marginLeft: "2rem",
        marginRight: "0",
        marginTop: "20%",
        flexGrow: "1",
      }}>
      <Title />
      <NameForm />
    </Container>
  );
}

export default StartInfo;
