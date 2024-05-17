import './App.scss';
import { SCREEN_TYPES } from '../../utils/constants';
import useScreenType from '../../utils/useScreenType';
import Header from '../Header/Header';
import Start from '../Start/Start';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Boards from '../Boards/Boards';

function App() {
  const { screenType, openStartPage, openLoginPage, openSignupPage, openBoardsPage } = useScreenType();

  return (
    <>
      <Header
        screenType ={screenType}
        openStartPage={openStartPage}
        openLoginPage={openLoginPage}
        openSignupPage={openSignupPage}
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
        <Boards />
      )}
      <Footer/>
    </>
  )
}

export default App
