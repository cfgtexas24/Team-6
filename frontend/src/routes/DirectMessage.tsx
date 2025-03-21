import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChatMessage } from "../../../chat_service/types";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { getToken, getUserId } from "../util/authentication";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { io } from "socket.io-client";
import UserNavBar from "../components/UserNavBar";

const chatSocket = io(`ws://${import.meta.env.VITE_CHAT_ADDRESS}`, {
  extraHeaders: {
    Authorization: `Bearer ${getToken()}`,
  },
  autoConnect: false,
});

const DirectMessage: FC = () => {
  const { otherUser } = useParams();
  if (!otherUser) throw new Error("Missing other user ID");

  const navigate = useNavigate();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(chatSocket.connected);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const userId = getUserId();

  useEffect(() => {
    if (chatSocket.disconnected) chatSocket.connect();

    function onConnect() {
      chatSocket.emit("init", otherUser);
      setIsConnected(true);
      setMessages([]); // Clear messages since we will get them again
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onNewChat(messages: ChatMessage[]) {
      setMessages((prev) => [...prev, ...messages]);
    }

    chatSocket.on("connect", onConnect);
    chatSocket.on("disconnect", onDisconnect);
    chatSocket.on("chat", onNewChat);

    return () => {
      chatSocket.off("connect", onConnect);
      chatSocket.off("disconnect", onDisconnect);
      chatSocket.off("chat", onNewChat);
    };
  }, [otherUser]);

  const sendMessage = (message: string) => {
    const msg = {
      username: userId,
      message,
      timestamp: Date.now(),
    } as ChatMessage;
    chatSocket.emit("chat", otherUser, msg);
    setMessages((prev) => [...prev, msg]);
    setCurrentMessage("");
  };

  return (
    <>
      <UserNavBar />
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>
      <Box className="flex flex-col">
        {messages.map((msg) => (
          <Card
            className="m-2 bg-[#f0f0f0]"
            key={msg.message + msg.timestamp}
            elevation={3}
          >
            <CardContent>
              <Typography variant="caption">
                {msg.username} {new Date(msg.timestamp).toLocaleDateString()}{" "}
                {new Date(msg.timestamp).toLocaleTimeString()}
              </Typography>
              <Typography variant="body1" className="font-semibold">
                {msg.message}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Paper
        className="flex-row flex items-start p-4 fixed bottom-0 left-0 right-0 bg-[#f0f0f0]"
        elevation={3}
      >
        <TextField
          className="flex-1"
          label="Message"
          onChange={(ev) => setCurrentMessage(ev.target.value)}
          value={currentMessage}
          disabled={!isConnected}
          helperText={isConnected ? undefined : "Cannot connect to server"}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") sendMessage(currentMessage);
          }}
        />
        <Button
          className="p-4 mx-2"
          variant="contained"
          disabled={!isConnected}
          onClick={() => sendMessage(currentMessage)}
        >
          Send
        </Button>
      </Paper>
    </>
  );
};

export default DirectMessage;
