import { useContext, useEffect } from "react";
import { ChatRoomContext } from "../routes/Root";
import { ACTIONS } from "../constants/ACTIONS";
import { getUser } from "../services/authService";
import JumboContainer from "../components/JumboContainer";
import CardContainer from "../components/CardContainer";
import Container from "react-bootstrap/Container";

function Home() {
  const { state, dispatch } = useContext(ChatRoomContext);
  const { user } = state;

  useEffect(() => {
    const userData = getUser();

    if (userData && !user.username) {
      dispatch({ type: ACTIONS.LOGIN, payload: userData });
    }
  }, []);

  return (
    <>
      <Container>
        <JumboContainer>
          <CardContainer />
        </JumboContainer>
      </Container>
      <br />
      <br />
    </>
  );
}

export default Home;
