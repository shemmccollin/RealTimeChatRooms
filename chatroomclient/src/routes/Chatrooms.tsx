import { useEffect, useContext, useState, useTransition, useRef } from "react";
import { ChatRoomContext } from "../routes/Root";
import { ACTIONS } from "../constants/ACTIONS";
import { activateToast, getUser } from "../services/authService";
import { useLoaderData } from "react-router-dom";
import { Ichannel, Imessage } from "../models/interfaces";
import Channels from "../components/Channels";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import Chat from "../components/Chat";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { ROLES } from "../constants/ROLES";
import { MESSAGES } from "../constants/MESSAGES";
import { getLocalChannels, setLocalChannels } from "../services/chatService";

function Chatrooms() {
  const navigate = useNavigate();
  const { channelData, query }: any = useLoaderData();

  const [channels, setChannels] = useState<Ichannel[]>([]);
  const [updateChat, setUpdateChat] = useState<{}>({});
  const [activeKey, setActiveKey] = useState("");
  const [isPending, startTransition] = useTransition();

  const { state, dispatch } = useContext(ChatRoomContext);
  const { user } = state;

  const stompClient: any = useRef(null);
  const mainChannel: any = useRef(null);
  const chatroom: any = useRef(null);
  const q: any = useRef(null);
  const chatroomId: any = useRef(null);

  const [data, setData] = useState({
    channelId: "",
    channelName: "",
  });

  useEffect(() => {
    const userData = getUser();

    if (!userData) {
      navigate("/");
    } else {
      if (!user.username) {
        dispatch({ type: ACTIONS.LOGIN, payload: userData });
      }

      if (
        userData.roles.includes(ROLES.ROLE_USER) ||
        userData.roles.includes(ROLES.ROLE_ADMIN)
      ) {
        const Sock = new SockJS("http://localhost:8080/ws");
        stompClient.current = over(Sock);
        stompClient.current.connect({}, onConnected, onError);
        setChannels(channelData);
      } else {
        navigate("/");
      }
    }

    return onDisconnect;
  }, []);

  useEffect(() => {
    q.current = query;
    startTransition(() => {
      setChannels(channelData);
    });
  }, [query]);

  const onConnected = () => {
    if (stompClient.current.connected) {
      mainChannel.current = stompClient.current.subscribe(
        "/channels",
        onChannelReceived
      );
    }
  };

  const onDisconnect = () => {
    if (chatroom.current) {
      chatroom.current.unsubscribe();
      chatroom.current = null;
      chatroomId.current = null;
    }
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.disconnect();
      stompClient.current = null;
    }
  };

  const onError = (error: any) => {
    activateToast("error", error.message);
  };

  const onChannelReceived = (payload: any) => {
    let payloadData: Ichannel = JSON.parse(payload.body);

    switch (payloadData.status) {
      case MESSAGES.CREATE_CHANNEL: {
        const localChannels = getLocalChannels();
        let newChannels: Ichannel[] = [];

        if (localChannels) {
          newChannels = [...localChannels, payloadData];
          setLocalChannels(newChannels);
        }
        if (!q.current) {
          startTransition(() => {
            setChannels(newChannels);
          });
        } else if (
          payloadData.channel.toLowerCase().includes(q.current.toLowerCase())
        ) {
          startTransition(() => {
            setChannels([
              ...newChannels.filter((n) =>
                n.channel.toLowerCase().includes(q.current.toLowerCase())
              ),
            ]);
          });
        }

        break;
      }

      case MESSAGES.EDIT_CHANNEL: {
        const localChannels = getLocalChannels();
        let newChannels: Ichannel[] = [];

        if (localChannels) {
          newChannels = localChannels.map((c: Ichannel) =>
            c.id === payloadData.id ? payloadData : c
          );

          setLocalChannels(newChannels);

          if (chatroomId.current === payloadData.id) {
            setData({
              ...data,
              channelId: payloadData.id,
              channelName: payloadData.channel,
            });
          }
        }
        if (!q.current) {
          startTransition(() => {
            setChannels(newChannels);
          });
        } else if (
          payloadData.channel.toLowerCase().includes(q.current.toLowerCase())
        ) {
          startTransition(() => {
            setChannels([
              ...newChannels.filter((n) =>
                n.channel.toLowerCase().includes(q.current.toLowerCase())
              ),
            ]);
          });
        }
        break;
      }
      case MESSAGES.DELETE_CHANNEL: {
        const localChannels = getLocalChannels();
        let newChannels: Ichannel[] = [];

        if (localChannels) {
          newChannels = [
            ...localChannels.filter((c: Ichannel) => c.id !== payloadData.id),
          ];

          setLocalChannels(newChannels);
        }
        if (!q.current) {
          startTransition(() => {
            setChannels(newChannels);
          });
        } else if (
          payloadData.channel.toLowerCase().includes(q.current.toLowerCase())
        ) {
          startTransition(() => {
            setChannels([
              ...newChannels.filter((n) =>
                n.channel.toLowerCase().includes(q.current.toLowerCase())
              ),
            ]);
          });
        }

        if (payloadData.id === chatroomId.current) {
          chatroom.current.unsubscribe();
          chatroom.current = null;

          startTransition(() => {
            setData({ ...data, channelId: "", channelName: "" });
          });
        }

        break;
      }
      default: {
      }
    }
  };

  const onSubscribe = (id: any, channel: any) => {
    if (chatroom.current && id !== data.channelId) {
      userLeave();
      chatroom.current.unsubscribe();
      chatroom.current = null;
      chatroomId.current = null;
    }

    if (id !== data.channelId && stompClient.current) {
      chatroom.current = stompClient.current.subscribe(
        `/chatroom/${id}`,
        onMessageReceived
      );

      chatroomId.current = id;
      userJoin(id);
      startTransition(() => {
        setData({ ...data, channelId: id, channelName: channel });
      });
    }
  };

  const userJoin = (id: any) => {
    let chatMessage = {
      sender: user.username,
      channelId: id,
      message: `${user.username} has joined!`,
      status: "JOIN",
    };

    stompClient.current.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const userLeave = () => {
    let chatMessage = {
      sender: user.username,
      channelId: data.channelId,
      message: `${user.username} has left!`,
      status: "LEAVE",
    };

    stompClient.current.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload: any) => {
    let payloadData: Imessage = JSON.parse(payload.body);
    startTransition(() => {
      setUpdateChat(payloadData);
    });
  };

  const onChangeActive = (e: string) => {
    startTransition(() => {
      setActiveKey(e);
    });
  };

  return (
    <>
      <Container fluid>
        <Row style={{ minHeight: "80vh", maxHeight: "80vh" }}>
          <Col className="border-end p-2" style={{ maxWidth: "40vh" }}>
            <SearchBar query={query} />
            {channels.length > 0 ? (
              <Channels
                channels={channels}
                activeKey={activeKey}
                onChangeActive={onChangeActive}
                onSubscribe={onSubscribe}
              />
            ) : (
              <p>No Channels Available at this time.</p>
            )}
          </Col>
          <Col className="p-2">
            {data.channelId ? (
              <>
                <Chat
                  updateChat={updateChat}
                  stompClient={stompClient}
                  channelId={data.channelId}
                  channelName={data.channelName}
                  username={user.username}
                />
              </>
            ) : (
              <h3>No Channel selected</h3>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Chatrooms;
