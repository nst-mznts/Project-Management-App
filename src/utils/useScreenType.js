import { useState } from 'react';
import { SCREEN_TYPES } from './constants';
import PropTypes from 'prop-types';

export default function useScreenType({ setOpenedBoard }) {
  const [screenType, setScreenType] = useState(SCREEN_TYPES.START_PAGE);

  const openStartPage = () => {
    setScreenType(SCREEN_TYPES.START_PAGE);
  };

  const openLoginPage = () => {
    setScreenType(SCREEN_TYPES.LOGIN_PAGE);
  };

  const openSignupPage = () => {
    setScreenType(SCREEN_TYPES.SIGNUP_PAGE);
  };

  const openBoardsPage = () => {
    setScreenType(SCREEN_TYPES.BOARDS_PAGE);
  };

  const openBoardTasksPage = (board = {}) => {
    setOpenedBoard(board);
    setScreenType(SCREEN_TYPES.BOARD_TASKS);
  };

  return {
    screenType,
    openStartPage,
    openLoginPage,
    openSignupPage,
    openBoardsPage,
    openBoardTasksPage,
  };
}

useScreenType.propTypes = {
  setOpenedBoard: PropTypes.func.isRequired,
};
