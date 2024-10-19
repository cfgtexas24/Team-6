import { config } from "dotenv";
import { ChatMessage } from "./types";
import { Server } from "socket.io";
import { getRoomID, getTokenFromHeader, verifyJWT } from "./util";

// Use the secret from the normal API
config({ path: "../backend/.env" });

const secret = process.env.secret;
if (!secret) {
  throw new Error(
    "Could not load .env from backend directory. Make sure it exists with the secret variable"
  );
}

// Super basic in-memory database (AKA a normal object)
const chatDB: Record<string, ChatMessage[]> = {};

const io = new Server(5080, {
  cors: {
    // Allow all origins
    origin: "*",
  },
});

console.log("Listening...");

io.on("connection", (socket) => {
  const token = getTokenFromHeader(socket);
  if (!token) {
    socket.disconnect(true);
    return;
  }

  const payload = verifyJWT(token, secret);
  if (!payload || !payload.sub) {
    socket.disconnect(true);
    return;
  }

  const userId =
    typeof payload.sub === "string"
      ? payload.sub
      : (payload.sub as { username: string }).username;

  socket.on("init", (otherUser: string) => {
    // Can't be in a room by yourself
    if (otherUser === userId) return;

    const roomId = getRoomID(userId, otherUser);
    socket.join(roomId);
    if (roomId in chatDB) {
      socket.emit("chat", chatDB[roomId]);
    } else {
      chatDB[roomId] = [];
    }
  });

  socket.on("chat", (otherUser: string, message: ChatMessage) => {
    const roomId = getRoomID(userId, otherUser);
    socket.to(roomId).emit("chat", [message]);
    if (!(roomId in chatDB)) chatDB[roomId] = [];
    chatDB[roomId].push(message);
  });
});
