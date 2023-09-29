import withProfileData from "./withProfileData";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

function ProfileData({ user }: any) {
  return (
    <>
      <Container
        fluid
        style={{ height: "100ch" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Card style={{ width: "100ch" }}>
          <Row className="g-0">
            <Col className="col-md-4">
              <Image
                src="./sender.jpg"
                thumbnail
                style={{ maxHeight: "20rem" }}
              />
            </Col>
            <Col className="col-md-8">
              <Card.Body>
                <Card.Title className="mb-3">
                  Username: {user.username}
                </Card.Title>
                <Card.Text as="div">
                  <p>Id: {user.id}</p>
                  <p>Email: {user.email}</p>
                  <p>
                    Roles: {user.roles ? user.roles.join(", ") : user.roles}
                  </p>
                  <p>Token: {user.token}</p>
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}

export default withProfileData(ProfileData);
