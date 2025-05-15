import './App.scss';
import { FC } from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAuthMe, userName } from '../../redux/slices/auth';
import { ModalProvider } from '../../utils/ModalContext';
import Header from '../Header/Header';
import Auth from '../Auth/Auth';
import Start from '../Start/Start';
import Content from '../Content/Content';
import BoardTasks from '../BoardTasks/BoardTasks';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import ProtectedRoute from '../../utils/ProtectedRoute';
import Page404 from '../Page404/Page404';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const userData = useAppSelector(userName);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setIsMobileMenuOpen(false);
  }

  const handleOpenMobileMenu = () => {
    setIsMobileMenuOpen(true);
    handleOpenSidebar();
  }

  return (
    <>
      <ModalProvider>
        <Header onOpenSidebar={handleOpenSidebar} onOpenMobileMenu={handleOpenMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/auth/login" element={<Auth />} />
          <Route path="/auth/signup" element={<Auth />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/boards" element={<Content />} />
            <Route path="/boards/:id" element={<BoardTasks />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
        {isSidebarOpen && <Sidebar onClose={handleCloseSidebar} userName={userData?.name || ''}/>}
      </ModalProvider>
    </>
  );
};

export default App;
