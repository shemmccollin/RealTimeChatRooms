import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChatRoomContext } from "./Root";
import { useEffect, useContext } from "react";
import { getUser, activateToast } from "../services/authService";
import { ROLES } from "../constants/ROLES";
import { ACTIONS } from "../constants/ACTIONS";
import ChannelForm from "../components/ChannelForm";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { MESSAGES } from "../constants/MESSAGES";

function AddChannel() {
  const navigate = useNavigate();
  const stompClient: any = useRef(null);
  const mainChannel: any = useRef(null);
  const { state, dispatch } = useContext(ChatRoomContext);
  const { user } = state;
  const initialValues = {
    id: "",
    channel: "",
    status: "",
    timestamp: "",
  };

  useEffect(() => {
    const userData = getUser();

    if (!userData) {
      navigate("/");
    } else {
      if (!user.username) {
        dispatch({ type: ACTIONS.LOGIN, payload: userData });
      }

      if (userData.roles.includes(ROLES.ROLE_ADMIN)) {
        const Sock = new SockJS("http://localhost:8080/ws");
        stompClient.current = over(Sock);
        stompClient.current.connect({}, onConnected, onError);
      } else {
        navigate("/");
      }
    }
    return onDisconnect;
  }, []);

  const onConnected = () => {
    if (stompClient.current.connected) {
      mainChannel.current = stompClient.current.subscribe(
        "/channels",
        onChannelReceived
      );
    }
  };

  const onChannelReceived = () => {};
  const onError = (error: any) => {
    console.log(error);
  };

  const onDisconnect = () => {
    if (mainChannel.current) {
      mainChannel.current.unsubscribe();
      mainChannel.current = null;
    }
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.disconnect();
      stompClient.current = null;
    }
  };

  const onSendMessage = (newChannel: any) => {
    if (stompClient.current) {
      let channelMessage = {
        channel: newChannel.channel,
        status: MESSAGES.CREATE_CHANNEL,
        timestamp: "",
      };

      stompClient.current.send(
        "/app/channels",
        {},
        JSON.stringify(channelMessage)
      );

      activateToast("success", "Channel successfully added!");
    }
  };

  return (
    <>
      <ChannelForm
        initialValues={initialValues}
        onSendMessage={onSendMessage}
      />
    </>
  );
}

export default AddChannel;
