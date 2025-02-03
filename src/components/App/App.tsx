import './App.scss';
import { FC } from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAuthMe, userName } from '../../redux/slices/auth';
import Header from '../Header/Header';
import Start from '../Start/Start';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Content from '../Content/Content';
import BoardTasks from '../BoardTasks/BoardTasks';
import Sidebar from '../Sidebar/Sidebar';
import useModalWindow from '../../utils/useModalWindow';

const App:FC = () => {
  const dispatch = useAppDispatch();
  const { openModal } = useModalWindow();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const name = useAppSelector(userName);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  const handleOpenSidebar = () =>  setIsSidebarOpen(true);
  const handleCloseSidebar = () =>  setIsSidebarOpen(false);

  return (
    <>
      <Header onOpenSidebar={handleOpenSidebar} />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/boards" element={<Content /> }/>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/boards/:id" element={<BoardTasks />} />
      </Routes>
      {isSidebarOpen && (
        <Sidebar
          onClose={handleCloseSidebar}
          userName={name.name}
          onOpen={openModal}
        />
      )}
      <Footer />
    </>
  )
}

export default App;
