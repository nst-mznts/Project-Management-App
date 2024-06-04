import './App.scss';
import { SCREEN_TYPES } from '../../utils/constants';
import { useState } from 'react';
import useScreenType from '../../utils/useScreenType';
import { listOfTasks } from '../../utils/constants'
import Header from '../Header/Header';
import Start from '../Start/Start';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Boards from '../Boards/Boards';
import BoardTasks from '../BoardTasks/BoardTasks';

function App() {
  const [boards, setBoards] = useState(listOfTasks);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [openedBoard, setOpenedBoard] = useState({});
  const {
    screenType,
    openStartPage,
    openLoginPage,
    openSignupPage,
    openBoardsPage,
    openBoardTasksPage
  } = useScreenType({setOpenedBoard});

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const getUserName = (name) => {
    setUserName(name);
  }

  return (
    <>
      <Header
        screenType ={screenType}
        openStartPage={openStartPage}
        openLoginPage={openLoginPage}
        openSignupPage={openSignupPage}
        onOpen={openSidebar}
      />
      {screenType === SCREEN_TYPES.START_PAGE && (
        <Start openLoginPage={openLoginPage}/>
      )}
      {screenType === SCREEN_TYPES.LOGIN_PAGE && (
        <Login
          openSignupPage={openSignupPage}
          openBoardsPage={openBoardsPage}
          getUserName={getUserName}
        />
      )}
      {screenType === SCREEN_TYPES.SIGNUP_PAGE && (
        <Signup openLoginPage={openLoginPage}  openBoardsPage={openBoardsPage}/>
      )}
      {screenType === SCREEN_TYPES.BOARDS_PAGE && (
        <Boards
          boards={boards}
          setBoards={setBoards}
          openedBoard={openedBoard}
          setOpenedBoard={setOpenedBoard}
          isSidebarOpen={isSidebarOpen}
          onClose={closeSidebar}
          openStartPage={openStartPage}
          userName={userName}
          openBoardTasksPage={openBoardTasksPage}
        />
      )}
      {screenType === SCREEN_TYPES.BOARD_TASKS && (
        <BoardTasks openBoardsPage={openBoardsPage} openedBoard={openedBoard}/>
      )}
      <Footer/>
    </>
  )
}

export default App
