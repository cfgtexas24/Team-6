import { io } from "socket.io-client";
import { getToken } from "./authentication";

// Socket is singleton
export const chatSocket = io(`ws://${import.meta.env.VITE_CHAT_ADDRESS}`, {
  extraHeaders: {
    Authorization: `Bearer ${getToken()}`,
  },
});
