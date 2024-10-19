import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { chatSocket } from "../util/chat";
import { ChatMessage } from "../../../chat_service/types";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { getUserId } from "../util/authentication";

const DirectMessage: FC = () => {
  const { otherUser } = useParams();
  if (!otherUser) throw new Error("Missing other user ID");

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(chatSocket.connected);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const userId = getUserId();

  useEffect(() => {
    function onConnect() {
      chatSocket.emit("init", otherUser);
      setIsConnected(true);
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
  };

  return (
    <>
      <Box className="flex flex-col">
        {messages.map((msg) => (
          <Card className="my-2">
            <CardContent>
              <Typography variant="caption">
                {msg.username} ({new Date(msg.timestamp).toLocaleDateString()}{" "}
                {new Date(msg.timestamp).toLocaleTimeString()})
              </Typography>
              <Typography variant="body1">{msg.message}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box className="flex-row flex items-start p-4 fixed bottom-0 left-0 right-0 bg-white">
        <TextField
          className="flex-1"
          label="Message"
          onChange={(ev) => setCurrentMessage(ev.target.value)}
          disabled={!isConnected}
          helperText={isConnected ? undefined : "Cannot connect to server"}
        />
        <Button
          className="p-4 mx-2"
          variant="contained"
          disabled={!isConnected}
          onClick={() => sendMessage(currentMessage)}
        >
          Send
        </Button>
      </Box>
    </>
  );
};

export default DirectMessage;
