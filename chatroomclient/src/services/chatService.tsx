import axios from "axios";
import { activateToast, getHeader, isAdmin, isUser } from "./authService";
import { Ichannel } from "../models/interfaces";

axios.defaults.baseURL = "http://localhost:8080/api/v1";

export async function channelsLoader({ request }: any) {
  try {
    if (isUser() || isAdmin()) {
      const url = new URL(request.url);
      let query = url.searchParams.get("query") || "";

      if (!query) {
        const channels = await axios.get("/chatroom/getchannels", {
          headers: { Authorization: getHeader() },
        });

        if (channels) {
          const channelData = channels.data;

          localStorage.setItem("channels", JSON.stringify(channelData));
          return { channelData, query };
        } else {
          const channelData: Ichannel[] = [];
          return { channelData, query };
        }
      } else {
        if (localStorage.getItem("channels")) {
          let channelData: Ichannel[] = JSON.parse(
            localStorage.getItem("channels") || ""
          );
          channelData = channelData.filter((c) =>
            c.channel.toLowerCase().includes(query.toLowerCase())
          );

          return { channelData, query };
        } else {
          const channels = await axios.get("/chatroom/getchannels", {
            headers: { Authorization: getHeader() },
          });

          if (channels) {
            let channelData: Ichannel[] = channels.data;

            localStorage.setItem("channels", JSON.stringify(channelData));
            channelData = channelData.filter((c) =>
              c.channel.toLowerCase().includes(query.toLowerCase())
            );
            return { channelData, query };
          } else {
            const channelData = null;
            return { channelData, query };
          }
        }
      }
    } else {
      const channelData: Ichannel[] = [];
      const query = "";
      return { channelData, query };
    }
  } catch (error: any) {
    activateToast("error", error.message);
    const channelData: Ichannel[] = [];
    const query = "";
    return { channelData, query };
  }
}

export async function viewChannelsLoader() {
  try {
    if (isAdmin()) {
      const channels = await axios.get("/chatroom/getchannels", {
        headers: { Authorization: getHeader() },
      });

      if (channels) {
        const channelData = channels.data;

        return channelData;
      }
    } else {
      const channelData: Ichannel[] = [];
      return channelData;
    }
  } catch (error: any) {
    activateToast("error", error.message);
    const channelData: Ichannel[] = [];
    return channelData;
  }
}

export async function channelLoader(id: any) {
  const { params }: any = id;
  try {
    if (isAdmin()) {
      const channel = await axios.get(`/chatroom/getchannel/${params.id}`, {
        headers: { Authorization: getHeader() },
      });

      if (channel) {
        const channelData = channel.data;

        return channelData;
      }
    } else {
      return {};
    }
  } catch (error: any) {
    activateToast("error", error.message);
    return {};
  }
}

export function setLocalChannels(channels: Ichannel[]) {
  localStorage.setItem("channels", JSON.stringify(channels));
}

export function getLocalChannels() {
  return JSON.parse(localStorage.getItem("channels") || "");
}

export async function getMessages(id: string) {
  try {
    if (isUser() || isAdmin()) {
      const channels = await axios.get(`/chatroom/getmessages/${id}`, {
        headers: { Authorization: getHeader() },
      });

      const cData = channels ? channels.data : null;
      return cData;
    } else {
      return null;
    }
  } catch (error: any) {
    activateToast("error", error.message);
    return null;
  }
}

export async function statsLoader() {
  try {
    if (isAdmin()) {
      const stats = await axios.get("/chatroom/getstats", {
        headers: { Authorization: getHeader() },
      });

      const cData = stats ? stats.data : null;
      return cData;
    } else {
      return [];
    }
  } catch (error: any) {
    activateToast("error", error.message);
    return [];
  }
}
