import './App.scss';
import { SCREEN_TYPES } from '../../utils/constants';
import { useState } from 'react';
import useScreenType from '../../utils/useScreenType';
import Header from '../Header/Header';
import Start from '../Start/Start';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Content from '../Content/Content';
import BoardTasks from '../BoardTasks/BoardTasks';
import Sidebar from '../Sidebar/Sidebar';
import useBoardsState from '../../utils/useBoardsState';

function App() {
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
  const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
  const [currentItem, setCurrentItem] = useState('');
  const openModalWindow = (board={}, action) => {
    setCurrentItem(action);
    setOpenedBoard(board);
    memoriseBoardIdForDeletion(board.id);
    setIsModalWindowOpened(true);
  };

  const closeModalWindow = () => {
    setIsModalWindowOpened(false);
    setOpenedBoard({});
    setCurrentItem('');
    memoriseBoardIdForDeletion(null);
  };

  const {
    boards,
    completelyDeleteBoard,
    handleSaveNote,
    memoriseBoardIdForDeletion
  } = useBoardsState({openedBoard, closeModalWindow});

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const getUserName = (name) => {
    setUserName(name);
  };

  const deleteProfile = () => {
    closeModalWindow();
    closeSidebar();
    openStartPage();
  };

  const logOutAndCloseSidebar = () => {
    closeSidebar();
    openStartPage();
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
        <Content
          boards={boards}
          openedBoard={openedBoard}
          openBoardTasksPage={openBoardTasksPage}
          onDelete={completelyDeleteBoard}
          onSave={handleSaveNote}
          openModalWindow={openModalWindow}
          isModalWindowOpened={isModalWindowOpened}
          closeModalWindow={closeModalWindow}
          deleteProfile={deleteProfile}
          currentItem={currentItem}
        />
      )}
      {screenType === SCREEN_TYPES.BOARD_TASKS && (
        <BoardTasks boards ={boards} openBoardsPage={openBoardsPage} openedBoard={openedBoard}/>
      )}
      {isSidebarOpen && (
        <Sidebar
          openStartPage={logOutAndCloseSidebar}
          onClose={closeSidebar}
          userName={userName}
          onOpen={openModalWindow}
        />
      )}
      <Footer/>
    </>
  )
}

export default App
