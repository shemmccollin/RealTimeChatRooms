import Nav from "react-bootstrap/esm/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { ImStatsDots } from "react-icons/im";
import { RiTableFill } from "react-icons/ri";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

function DashboardSidebar() {
  return (
    <>
      <h3 className="text-center">ChatRooms</h3>
      <h3 className="border-bottom text-center">Dashboard</h3>
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <LinkContainer to={"/dashboard"}>
            <Nav.Link className="text-center">
              <ImStatsDots className="me-2" />
              Statistics
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to={"/dashboard/viewchannels"}>
            <Nav.Link className="text-center">
              <RiTableFill className="me-2" />
              View Channels
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to={"/dashboard/addchannel"}>
            <Nav.Link className="text-center">
              <AiOutlineAppstoreAdd className="me-2" />
              Add Channel
            </Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default DashboardSidebar;
