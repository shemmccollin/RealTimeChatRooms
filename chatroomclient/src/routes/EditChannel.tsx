import { useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ChatRoomContext } from "./Root";
import { useEffect, useContext } from "react";
import { activateToast, getUser } from "../services/authService";
import { ROLES } from "../constants/ROLES";
import { ACTIONS } from "../constants/ACTIONS";
import ChannelForm from "../components/ChannelForm";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { MESSAGES } from "../constants/MESSAGES";

function EditChannel() {
  const navigate = useNavigate();
  const channelData = useLoaderData();

  const stompClient: any = useRef(null);
  const mainChannel: any = useRef(null);
  const { state, dispatch } = useContext(ChatRoomContext);
  const { user } = state;

  useEffect(() => {
    const userData = getUser();

    if (!userData) {
      navigate("/");
    } else {
      if (!user.username) {
        dispatch({ type: ACTIONS.LOGIN, payload: userData });
      }

      if (user.roles.includes(ROLES.ROLE_ADMIN)) {
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
    activateToast("error", error.message);
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

  const onSendMessage = (channel: any) => {
    if (stompClient.current) {
      let channelMessage = {
        id: channel.id,
        channel: channel.channel,
        status: MESSAGES.EDIT_CHANNEL,
        timestamp: channel.timestamp,
      };

      stompClient.current.send(
        "/app/channels",
        {},
        JSON.stringify(channelMessage)
      );

      activateToast("success", "Channel successfully edited!");
      navigate("/dashboard/viewchannels");
    }
  };

  return (
    <>
      <ChannelForm initialValues={channelData} onSendMessage={onSendMessage} />
    </>
  );
}

export default EditChannel;
