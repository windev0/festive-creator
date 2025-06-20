const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  VERIFY: "/verify",
  APP: "/app",
  AUTH_CALLBACK: "/auth/callback",
  WAITING_VERIFICATION: "/waiting-verification",
  CREATE_EVENT: "/create-event",
  VIDEO_PREVIEW_PAGE: "/video_preview",
  EVENT_SHARED: "/events/shared/:id",
  EVENTS: "/events",
  NOT_FOUND: "/404",
};

const LOGIN_TYPE = {
  EMAIL_PASSWORD: "email_password",
  OAUTH: "oauth",
};

export { ROUTES, LOGIN_TYPE };
