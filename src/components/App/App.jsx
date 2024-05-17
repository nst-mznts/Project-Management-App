import './App.scss';
import { SCREEN_TYPES } from '../../utils/constants';
import useScreenType from '../../utils/useScreenType';
import Header from '../Header/Header';
import Start from '../Start/Start';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Boards from '../Boards/Boards';
import { useState } from 'react';

function App() {
  const { screenType, openStartPage, openLoginPage, openSignupPage, openBoardsPage } = useScreenType();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header
        screenType ={screenType}
        openStartPage={openStartPage}
        openLoginPage={openLoginPage}
        openSignupPage={openSignupPage}
        openSidebar={openSidebar}
      />
      {screenType === SCREEN_TYPES.START_PAGE && (
        <Start openLoginPage={openLoginPage}/>
      )}
      {screenType === SCREEN_TYPES.LOGIN_PAGE && (
        <Login openSignupPage={openSignupPage} openBoardsPage={openBoardsPage}/>
      )}
      {screenType === SCREEN_TYPES.SIGNUP_PAGE && (
        <Signup openLoginPage={openLoginPage}  openBoardsPage={openBoardsPage}/>
      )}
      {screenType === SCREEN_TYPES.BOARDS_PAGE && (
        <Boards isSidebarOpen={isSidebarOpen} openSidebar={openSidebar} openStartPage={openStartPage}/>
      )}
      <Footer/>
    </>
  )
}

export default App
