import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ChatRoomContext } from "./Root";
import { useEffect, useContext } from "react";
import { getUser } from "../services/authService";
import { ROLES } from "../constants/ROLES";
import { ACTIONS } from "../constants/ACTIONS";
import { FaUsers } from "react-icons/fa";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { TbMessage } from "react-icons/tb";

function Stats() {
  const stats: any = useLoaderData();

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
    <>
      <Row className="p-3 mb-4 g-4">
        <Col>
          <Card bg="primary" text="light">
            <Card.Body>
              <Card.Title>
                # Users
                <FaUsers className="ms-2" />
              </Card.Title>
              <Card.Text className="text-center">{stats.noUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card bg="success" text="light">
            <Card.Body>
              <Card.Title>
                # Channels <BsFillChatSquareDotsFill className="ms-1" />
              </Card.Title>
              <Card.Text className="text-center">{stats.noChannels}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card bg="danger" text="light">
            <Card.Body>
              <Card.Title>
                # Messages
                <TbMessage className="ms-2" />
              </Card.Title>
              <Card.Text className="text-center">{stats.noMessages}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Stats;
