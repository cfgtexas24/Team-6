import { queryClient } from "./queryclient";

export function checkUserAuth() {
  // TODO: Actual user auth check when API is setup
  return true;
}

export async function login() {
  // TODO: Actual login function when API is setup
  queryClient.invalidateQueries({ queryKey: ["checkUserAuth"] });
}

export async function logout() {
  // TODO: Actual logout function when API is setup
  queryClient.invalidateQueries({ queryKey: ["checkUserAuth"] });
}
