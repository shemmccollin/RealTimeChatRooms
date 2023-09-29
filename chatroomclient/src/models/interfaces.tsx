import { ROLES } from "../constants/ROLES";

export interface Iuser {
  id: string;
  roles: ROLES[];
  token: string;
  type: string;
  username: string;
}

export interface Ichannel {
  id: string;
  channel: string;
  status: string;
  timestamp: string;
}

export interface Imessage {
  id: string;
  channelId: string;
  sender: string;
  message: string;
  status: string;
  edited: boolean;
  timestamp: string;
}
