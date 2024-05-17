import { useState } from 'react';
import { SCREEN_TYPES } from './constants';

export default function useScreenType() {
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

  return {
    screenType,
    openStartPage,
    openLoginPage,
    openSignupPage,
    openBoardsPage,
  };
}
