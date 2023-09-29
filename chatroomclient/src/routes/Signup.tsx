import SignupForm from "../components/SignupForm";
import { useContext, useEffect } from "react";
import { ChatRoomContext } from "../routes/Root";
import { ACTIONS } from "../constants/ACTIONS";
import { getUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(ChatRoomContext);
  const { user } = state;

  useEffect(() => {
    const userData = getUser();

    if (userData && user.username) {
      navigate("/");
    } else if (userData && !user.username) {
      dispatch({ type: ACTIONS.LOGIN, payload: userData });
      navigate("/");
    }
  }, []);

  return (
    <>
      <SignupForm />
    </>
  );
}

export default Signup;
