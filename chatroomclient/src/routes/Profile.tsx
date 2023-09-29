import { useContext, useEffect } from "react";
import ProfileData from "../components/ProfileData";
import { getUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { ACTIONS } from "../constants/ACTIONS";
import { ChatRoomContext } from "../routes/Root";
import { ROLES } from "../constants/ROLES";

function Profile() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(ChatRoomContext);
  const { user } = state;

  useEffect(() => {
    const userData = getUser();

    if (!userData) {
      navigate("/");
    } else {
      if (
        !userData.roles.includes(ROLES.ROLE_ADMIN) &&
        !userData.roles.includes(ROLES.ROLE_USER)
      ) {
        navigate("/");
      }

      if (!user.username) {
        dispatch({ type: ACTIONS.LOGIN, payload: userData });
      }
    }
  }, []);

  return (
    <>
      <ProfileData />
    </>
  );
}

export default Profile;
