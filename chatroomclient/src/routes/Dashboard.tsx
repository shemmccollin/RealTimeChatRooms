import { useContext, useEffect } from "react";
import { getUser } from "../services/authService";
import { Outlet, useNavigate } from "react-router-dom";
import { ACTIONS } from "../constants/ACTIONS";
import { ChatRoomContext } from "../routes/Root";
import { ROLES } from "../constants/ROLES";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardSidebar from "../components/DashboardSidebar";

function Dashboard() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(ChatRoomContext);
  const { user } = state;

  useEffect(() => {
    const userData = getUser();

    if (!userData) {
      navigate("/");
    } else {
      if (!userData.roles.includes(ROLES.ROLE_ADMIN)) {
        navigate("/");
      }

      if (!user.username) {
        dispatch({ type: ACTIONS.LOGIN, payload: userData });
      }
    }
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col className="border-end p" style={{ maxWidth: "40vh" }}>
          <DashboardSidebar />
        </Col>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
