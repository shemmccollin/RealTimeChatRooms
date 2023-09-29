import { useTransition } from "react";
import { Imessage } from "../models/interfaces";
import { useEffect, useState } from "react";
import { getMessages } from "../services/chatService";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { MESSAGES } from "../constants/MESSAGES";
import ChatForm from "./ChatForm";
import Dropdown from "react-bootstrap/Dropdown";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

function Chat({
  updateChat,
  stompClient,
  channelId,
  channelName,
  username,
}: any) {
  const [chat, setChat] = useState<Imessage[]>([]);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState({
    message: "",
    messageId: "",
    timestamp: "",
  });

  useEffect(() => {
    getChannelMessages();
  }, [channelId]);

  useEffect(() => {
    startTransition(() => {
      console.log(updateChat);
      switch (updateChat.status) {
        case MESSAGES.JOIN:
          setChat([...chat, updateChat]);
          break;
        case MESSAGES.LEAVE:
          setChat([...chat, updateChat]);
          break;
        case MESSAGES.MESSAGE:
          setChat([...chat, updateChat]);
          break;
        case MESSAGES.DELETE_MESSAGE:
          setChat([...chat.filter((m) => m.id !== updateChat.id)]);
          break;
        case MESSAGES.EDIT_MESSAGE:
          const newChat = chat.map((m) =>
            m.id === updateChat.id ? updateChat : m
          );
          setChat(newChat);
          break;
        default: {
        }
      }
    });
  }, [updateChat]);

  async function getChannelMessages() {
    const message = await getMessages(channelId);

    startTransition(() => {
      setChat(message);
    });
  }

  const onSendMessage = (newMessage: string) => {
    if (!message.message) {
      if (stompClient.current) {
        let chatMessage = {
          sender: username,
          channelId: channelId,
          message: newMessage,
          status: MESSAGES.MESSAGE,
        };

        stompClient.current.send(
          "/app/message",
          {},
          JSON.stringify(chatMessage)
        );
      }
    } else {
      if (stompClient.current) {
        let chatMessage = {
          sender: username,
          channelId: channelId,
          message: newMessage,
          status: MESSAGES.EDIT_MESSAGE,
          timestamp: message.timestamp,
          id: message.messageId,
        };

        stompClient.current.send(
          "/app/message",
          {},
          JSON.stringify(chatMessage)
        );
        startTransition(() => {
          setMessage({ message: "", messageId: "", timestamp: "" });
        });
      }
    }
  };

  const onEdit = (e: Imessage) => {
    startTransition(() => {
      setMessage({
        message: e.message,
        messageId: e.id,
        timestamp: e.timestamp,
      });
    });
  };

  const onDelete = (e: Imessage) => {
    if (stompClient.current) {
      let chatMessage = {
        id: e.id,
        channelId: e.channelId,
        status: MESSAGES.DELETE_MESSAGE,
      };
      stompClient.current.send("/app/message", {}, JSON.stringify(chatMessage));
    }
  };

  return (
    <>
      <h3>{channelName}</h3>
      <hr />
      <div
        className="overflow-auto d-flex flex-column-reverse"
        style={{ minHeight: "65vh", maxHeight: "65vh" }}
      >
        <Container fluid>
          {chat.map((c: Imessage) => (
            <span key={c.id}>
              {c.status === MESSAGES.JOIN || c.status === MESSAGES.LEAVE ? (
                <p>
                  <i>{c.message}</i>
                </p>
              ) : username !== c.sender ? (
                <Row className="mb-2">
                  <Col className="d-flex flex-row">
                    <Image
                      className="border me-2"
                      src="./receiver.jpg"
                      roundedCircle
                      style={{ maxHeight: "4rem" }}
                    />
                    <Card
                      className="bg-dark text-white ms-2"
                      style={{ maxWidth: "40rem" }}
                    >
                      <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                          {c.sender} - {c.timestamp.substring(0, 10)}{" "}
                          {c.timestamp.substring(11, 16)}{" "}
                          {c.edited && "(edited)"}
                        </Card.Subtitle>
                        <Card.Text>{c.message}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              ) : (
                <Row className="mb-2">
                  <Col className="d-flex flex-row-reverse">
                    <Image
                      className="border ms-2"
                      src="./sender.jpg"
                      roundedCircle
                      style={{ maxHeight: "4rem" }}
                    />
                    <Card
                      className="bg-dark text-white me-2"
                      style={{ maxWidth: "40rem" }}
                    >
                      <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted d-flex flex-row">
                          {c.sender} - {c.timestamp.substring(0, 10)}{" "}
                          {c.timestamp.substring(11, 16)}{" "}
                          {c.edited && "(edited)"}
                          <Dropdown className="ms-auto">
                            <Dropdown.Toggle variant="dark">
                              ...
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="dark">
                              <Dropdown.Item
                                name="edit"
                                onClick={() => onEdit(c)}
                              >
                                <MdModeEditOutline className="mb-1" /> Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                name="delete"
                                onClick={() => onDelete(c)}
                              >
                                <AiFillDelete className="mb-1" /> Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Card.Subtitle>
                        <Card.Text>{c.message}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              )}
            </span>
          ))}
        </Container>
      </div>

      <ChatForm message={message} onSendMessage={onSendMessage} />
    </>
  );
}

export default Chat;
