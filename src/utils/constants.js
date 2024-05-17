export const SCREEN_TYPES = {
  START_PAGE: 'START_PAGE',
  LOGIN_PAGE: 'LOGIN_PAGE',
  SIGNUP_PAGE: 'SIGNUP_PAGE',
  BOARDS_PAGE: 'BOARDS_PAGE',
};

export const SIGNUP_FORM_INPUTS = [
  {
    id: "name",
    value: "signup-page-name",
    type: "text",
    minLength: 1
  },
  {
    id: "login",
    value: "login-page-login",
    type: "text",
    minLength: 4
  },
  {
    id: "password",
    value: "login-page-password",
    type: "password",
    minLength: 8
  },
  {
    id: "confirm-password",
    value: "signup-page-confirm-password",
    type: "password",
    minLength: 8
  },
];

export const LOGIN_FORM_INPUTS = [
  {
    id: "login",
    value: "login-page-login",
    type: "text",
    minLength: 4
  },
  {
    id: "password",
    value: "login-page-password",
    type: "password",
    minLength: 8
  },
];