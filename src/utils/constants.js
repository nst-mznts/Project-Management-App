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
    'board-1': {
      id: 'board-1',
      title: 'first board 1',
      columnIds: ['column-1', 'column-2'],
    },
    'board-2': {
      id: 'board-2',
      title: 'second board 46436',
      columnIds: ['column-2'],
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      noteIds: ['note-1', 'note-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      noteIds: ['note-3'],
    },
  },
  notes: {
    'note-1': { id: 'note-1', content: 'Заметка 1' },
    'note-2': { id: 'note-2', content: 'Заметка 2' },
    'note-3': { id: 'note-3', content: 'Заметка 3' },
    'note-4': { id: 'note-4', content: 'Заметка 4' },
  },
};
