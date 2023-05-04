import { Container } from "@mui/material";
import NameForm from "./NameForm";
import Title from "./Title";

function StartInfo() {
  return (
    <Container
      maxWidth="xs"
      sx={{
        marginLeft: "0",
        marginRight: "0",
      }}>
      <Title />
      <NameForm />
    </Container>
  );
}

export default StartInfo;
