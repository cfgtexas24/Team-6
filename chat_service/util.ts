import { JwtPayload } from "jsonwebtoken";
import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

/**
 * Retrieves the authorization token from a request object
 */
export function getTokenFromHeader(soc: Socket) {
  const header =
    soc.request.headers["Authorization"] ??
    soc.request.headers["authorization"];
  const prefix = "Bearer ";
  if (typeof header !== "string" || !header.startsWith(prefix)) return null;
  return header.slice(prefix.length);
}

export function getRoomID(userA: string, userB: string) {
  return [userA, userB].sort().join("-");
}

export function verifyJWT(token: string, secret: string): JwtPayload | null {
  try {
    const payload = jwt.verify(token, secret);
    if (!payload || typeof payload === "string") return null;
    return payload;
  } catch {
    return null;
  }
}
