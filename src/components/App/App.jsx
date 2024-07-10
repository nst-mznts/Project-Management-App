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
  const {
    boards,
    completelyDeleteBoard,
    handleSaveBoard,
    addNewColumn,
    completelyDeleteColumn,
    setCurrentItemId,
    handleSaveColumns,
  } = useBoardsState({openedBoard});

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

  const confirmActionForBoards = (title, actionType) => {
    console.log('actionType', actionType);
    switch (actionType) {
      case 'createBoard':
        handleSaveBoard({title: title});
        break;
      case 'renameBoard':
        handleSaveBoard({title: title});
        break;
      case 'deleteBoard':
        deleteBoard();
        break;
      case 'deleteProfile':
        deleteProfile();
        break;
      default:
        break;
    }
    closeModal();
  };

  const confirmActionCreatingNewColumn = (title, actionType) => {
    switch (actionType) {
      case 'addColumn':
        console.log('addColumn');
        handleSaveColumns({title: title});
        break;
      case 'renameColumn':
        handleSaveColumns({title: title});
        console.log(title);
        break;
      case 'deleteColumn':
        deleteColumn();
        break;
      default:
        break;
    }
    closeModal();
  }

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
    closeModal();
    closeSidebar();
    openStartPage();
  };

  const logOutAndCloseSidebar = () => {
    closeSidebar();
    openStartPage();
  }

  const deleteBoard = () => {
    completelyDeleteBoard();
    closeModal();
  }

  const deleteColumn = () => {
    completelyDeleteColumn();
    closeModal();
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
          onConfirm={confirmActionCreatingNewColumn}
          actionType={actionType}
          initialTitle={initialTitle}
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
