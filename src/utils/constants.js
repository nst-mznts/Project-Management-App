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

export let listOfTasks = {
  boards: {
    'board1': {
      id: 'board1',
      title: 'first board 1',
      columnIds: ['column1', 'column2'],
    },
    'board2': {
      id: 'board2',
      title: 'second board 46436',
      columnIds: ['column2'],
    },
  },
  columns: {
    'column1': {
      id: 'column1',
      title: 'To do',
      noteIds: ['note1', 'note2'],
    },
    'column2': {
      id: 'column2',
      title: 'In progress',
      noteIds: ['note3'],
    },
  },
  notes: {
    'note1': { id: 'note1', content: 'Заметка 1' },
    'note2': { id: 'note2', content: 'Заметка 2' },
    'note3': { id: 'note3', content: 'Заметка 3' },
    'note4': { id: 'note4', content: 'Заметка 4' },
  },
};