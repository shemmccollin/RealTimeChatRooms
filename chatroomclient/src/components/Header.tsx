import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { activateToast, getUser, signOut } from "../services/authService";
import { useEffect, useContext } from "react";
import { ChatRoomContext } from "../routes/Root";
import { ACTIONS } from "../constants/ACTIONS";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFillChatSquareDotsFill, BsFillTreeFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

function Header() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(ChatRoomContext);
  const { user, showUser, showAdmin } = state;

  useEffect(() => {
    const userData = getUser();

    if (userData && !user.username) {
      dispatch({ type: ACTIONS.LOGIN, payload: userData });
    }
  }, []);

  const onSignOut = () => {
    signOut();
    dispatch({ type: ACTIONS.LOGOUT, payload: null });
    activateToast("success", "User successfully sign out!");
    navigate("/");
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt=""
                src="/logo.png"
                height="40"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to={"/"}>
                <Nav.Link>
                  <AiFillHome className="mb-1 me-1" />
                  Home
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to={"/componenttree"}>
                <Nav.Link>
                  <BsFillTreeFill className="mb-1 me-1" />
                  Component Tree
                </Nav.Link>
              </LinkContainer>

              {showUser && (
                <LinkContainer to={"/chatrooms"}>
                  <Nav.Link>
                    <BsFillChatSquareDotsFill className="me-1" />
                    Chatrooms
                  </Nav.Link>
                </LinkContainer>
              )}
              {showAdmin && (
                <LinkContainer to={"/dashboard"}>
                  <Nav.Link>
                    <MdDashboard className="me-1" />
                    Dashboard
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            <Nav className="d-flex">
              {user.username ? (
                <>
                  {" "}
                  <LinkContainer to={"/profile"}>
                    <Nav.Link className="me-3">
                      <FaUserCircle className="mb-1 me-1" />
                      Welcome {user.username}
                    </Nav.Link>
                  </LinkContainer>
                  <Button variant="outline-danger" onClick={onSignOut}>
                    <FaSignOutAlt className="me-1" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <LinkContainer to={"/login"}>
                    <Button className="me-3" variant="outline-primary">
                      <FiLogIn className="me-1" />
                      Log In
                    </Button>
                  </LinkContainer>
                  <LinkContainer to={"/signup"}>
                    <Button variant="outline-success">
                      <FiUserPlus className="me-1 mb-1" />
                      Sign Up
                    </Button>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
