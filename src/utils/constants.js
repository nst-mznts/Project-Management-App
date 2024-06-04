export const SCREEN_TYPES = {
  START_PAGE: 'START_PAGE',
  LOGIN_PAGE: 'LOGIN_PAGE',
  SIGNUP_PAGE: 'SIGNUP_PAGE',
  BOARDS_PAGE: 'BOARDS_PAGE',
  BOARD_TASKS: 'BOARD_TASKS',
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

export let listOfTasks = [
  {id: 1, title: 'first board', tasks: [{id: 1, title: 'title 1'}, {id: 2, title: 'title 2'}]},
  {id: 2, title: 'second board', tasks: [{id: 3, title: 'title 3'}]},
  {id: 3, title: 'third board', tasks: []},
];