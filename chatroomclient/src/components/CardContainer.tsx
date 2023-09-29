import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class CardContainer extends React.Component {
  render() {
    return (
      <>
        <Row className="g-4 mb-3">
          <Col className="d-flex align-items-stretch">
            <Card>
              <Card.Img
                variant="top"
                src="messaging.jpg"
                style={{ maxHeight: "350px" }}
              />
              <Card.Body>
                <Card.Title>Channels</Card.Title>
                <Card.Text>
                  Join other users as we discuss and explore different topics.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col className="d-flex align-items-stretch">
            <Card>
              <Card.Img
                variant="top"
                src="users.jpg"
                style={{ maxHeight: "350px" }}
              />
              <Card.Body>
                <Card.Title>Users</Card.Title>
                <Card.Text>
                  Creating an account has never been so easy, no email
                  verification, just register in less than 30 seconds and start
                  to chat.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col className="d-flex align-items-stretch">
            <Card>
              <Card.Img
                variant="top"
                src="react.jpg"
                style={{ maxHeight: "350px" }}
              />
              <Card.Body>
                <Card.Title>React</Card.Title>
                <Card.Text>
                  Built on top of React 18, a powerful javascript library for
                  building amazing websites. That means no page reloading, get
                  to where you to want faster.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4 g-4">
          <Col className="d-flex align-items-stretch">
            <Card>
              <Card.Img
                variant="top"
                src="websockets.jpg"
                style={{ maxHeight: "350px" }}
              />
              <Card.Body>
                <Card.Title>WebSockets</Card.Title>
                <Card.Text>
                  Powering this realtime chat on the backend is WebSockets.
                  WebSockets is a realtime technology that enables
                  bidirectional, full-duplex communication between client and
                  server over a persistent, single-socket connection.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col className="d-flex align-items-stretch">
            <Card>
              <Card.Img
                variant="top"
                src="sock.jpg"
                style={{ maxHeight: "350px" }}
              />
              <Card.Body>
                <Card.Title>SockJS</Card.Title>
                <Card.Text>
                  SockJS is a browser javascript library that provides a
                  WebSocket-like object. SockJS gives you a coherent,
                  cross-browser, Javascript API which creates a low latency,
                  full duplex, cross-domain communication channel between the
                  browser and the web server.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col className="d-flex align-items-stretch">
            <Card>
              <Card.Img
                variant="top"
                src="stomp.jpg"
                style={{ maxHeight: "350px" }}
              />
              <Card.Body>
                <Card.Title>StompJS</Card.Title>
                <Card.Text>
                  StompJS is a simple text-orientated messaging protocol. It
                  defines an interoperable wire format so that any of the
                  available Stomp clients can communicate with any Stomp message
                  broker to provide easy and widespread messaging
                  interoperability among languages and platforms.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default CardContainer;
