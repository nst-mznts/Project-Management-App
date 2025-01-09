import './App.scss';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth, userName } from '../../redux/slices/auth';
import Header from '../Header/Header';
import Start from '../Start/Start';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Content2 from '../Content/Content2';
import BoardTasks from '../BoardTasks/BoardTasks';
import Sidebar from '../Sidebar/Sidebar';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { boards, columnIds } = useSelector(state => state.boards);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [initialTitle, setInitialTitle] = useState('');
  const [boardIdForRemoving, setBoardIdForRemoving] = useState('');

  const name = useSelector(userName);

  const openModal = (actionType, id='', initialTitle='') => {
    setActionType(actionType);
    setBoardIdForRemoving(id);
    setInitialTitle(initialTitle);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header onOpen={openSidebar} />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="/boards"
          element={
            <Content2 
              openModalWindow={openModal}
              isModalWindowOpened={isModalOpen}
              closeModalWindow={closeModal}
              actionType={actionType}
              boardIdForRemoving={boardIdForRemoving}
              initialTitle={initialTitle}
            />
          }
        />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route
          path="/boards/:id"
          element={
            <BoardTasks
              openModalWindow={openModal}
              isModalWindowOpened={isModalOpen}
              closeModalWindow={closeModal}
              actionType={actionType}
              boardIdForRemoving={boardIdForRemoving}
              initialTitle={initialTitle}
            />
          }
        />
      </Routes>
      {isSidebarOpen && (
        <Sidebar
          onClose={closeSidebar}
          userName={name.name}
          onOpen={openModal}
        />
      )}
      <Footer />
    </>
  )
}

export default App
