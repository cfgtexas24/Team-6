import { jwtDecode } from "jwt-decode";

const authTokenKey = "auth_token";

export function getToken() {
  return window.localStorage.getItem(authTokenKey);
}

export function clearToken() {
  window.localStorage.removeItem(authTokenKey);
}

export function setToken(value: string) {
  window.localStorage.setItem(authTokenKey, value);
}

export function getUserId() {
  const token = getToken();
  if (!token) return null;
  const decoded = jwtDecode(token);
  if (!decoded.sub) return null;
  if (typeof decoded.sub === "string") return decoded.sub;
  return (decoded.sub as { username: string }).username;
}

export function checkUserAuth(): boolean {
  const token = getToken();

  // No token? Not authenticated?
  if (!token) return false;

  const decoded = jwtDecode(token);
  const isExpired = (decoded.exp ?? 0) > Date.now();
  if (isExpired) {
    clearToken();
    return false;
  }
  return true;
}

export async function login(username: string, password: string) {
  const url = new URL("/login", import.meta.env.VITE_API_ADDRESS);
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(res.statusText);
  if ("msg" in json) throw new Error(json.msg);
  if (!("access_token" in json))
    throw new Error("Missing access_token in response body");
  setToken(json.access_token);
  return json.access_token;
}

export async function logout() {
  clearToken();
}

type FetchParams = Parameters<typeof fetch>;

export function authenticatedFetch(
  input: FetchParams[0],
  init: FetchParams[1],
) {
  const token = getToken();
  if (!token) return fetch(input, init);
  else {
    return fetch(input, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        ...init?.headers,
      },
    });
  }
}
