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
  const [isModalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [initialTitle, setInitialTitle] = useState('');
  const {
    screenType,
    openStartPage,
    openLoginPage,
    openSignupPage,
    openBoardsPage,
    openBoardTasksPage
  } = useScreenType({setOpenedBoard});

  const openModal = (board={}, actionType, initialTitle = '', currentId = '') => {
    setOpenedBoard(board);
    setActionType(actionType);
    setInitialTitle(initialTitle);
    setCurrentItemId(currentId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentItemId('');
  };

  const deleteProfile = () => {
    closeModal();
    closeSidebar();
    openStartPage();
  };

  const {
    boards,
    setCurrentItemId,
    confirmActionForBoards,
    confirmActionForColumn,
    addNewNote,
  } = useBoardsState({openedBoard, closeModal, deleteProfile, setOpenedBoard});

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const getUserName = (name) => {
    setUserName(name);
  };

  const logOutAndCloseSidebar = () => {
    closeSidebar();
    openStartPage();
  };

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
          openBoardTasksPage={openBoardTasksPage}
          openModalWindow={openModal}
          isModalWindowOpened={isModalOpen}
          closeModalWindow={closeModal}
          onConfirm={confirmActionForBoards}
          actionType={actionType}
          initialTitle={initialTitle}
        />
      )}
      {screenType === SCREEN_TYPES.BOARD_TASKS && (
        <BoardTasks
          boards ={boards}
          openBoardsPage={openBoardsPage}
          openedBoard={openedBoard}
          openModalWindow={openModal}
          isModalWindowOpened={isModalOpen}
          closeModalWindow={closeModal}
          onConfirm={confirmActionForColumn}
          actionType={actionType}
          initialTitle={initialTitle}
          addNewNote={addNewNote}
        />
      )}
      {isSidebarOpen && (
        <Sidebar
          openStartPage={logOutAndCloseSidebar}
          onClose={closeSidebar}
          userName={userName}
          onOpen={openModal}
        />
      )}
      <Footer/>
    </>
  )
}

export default App
