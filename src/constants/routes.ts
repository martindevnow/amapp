export const LANDING = "/";
export const SIGN_UP = "/signup";
export const SIGN_IN = "/signin";
export const HOME = "/home";
export const ACCOUNT = "/account";
export const ADMIN = "/admin";
export const PASSWORD_FORGET = "/pw-forget";
export const ROOM = "/room/:roomId";
export const ROOM_BY_ID = (roomId: string) => `/room/${roomId}`;
export const LOBBY = "/lobby";
// export const MS_SSO_REDIRECT = "/__/auth/handler"; // This is used by Firebase, but not by React app
