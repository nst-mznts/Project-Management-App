import './App.scss';
import { FC } from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { fetchAuthMe } from '../../redux/slices/auth';
import Header from '../Header/Header';
import Start from '../Start/Start';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Content from '../Content/Content';
import BoardTasks from '../BoardTasks/BoardTasks';

const App:FC = () => {
  const dispatch = useAppDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <Route path="/boards" element={<Content isSidebarOpen={isSidebarOpen} handleCloseSidebar={handleCloseSidebar}/> }/>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/boards/:id" element={<BoardTasks />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
