import './App.scss';
import { FC } from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAuthMe, userName } from '../../redux/slices/auth';
import { ModalProvider } from '../../utils/ModalContext';
import Header from '../Header/Header';
import Start from '../Start/Start';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Content from '../Content/Content';
import BoardTasks from '../BoardTasks/BoardTasks';
import Sidebar from '../Sidebar/Sidebar';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const userData = useAppSelector(userName);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <ModalProvider>
        <Header onOpenSidebar={handleOpenSidebar} />
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/boards" element={<Content />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/boards/:id" element={<BoardTasks />} />
        </Routes>
        <Footer />
        {isSidebarOpen && <Sidebar onClose={handleCloseSidebar} userName={userData!.name} />}
      </ModalProvider>
    </>
  );
};

export default App;
