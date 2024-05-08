import './App.scss';
import { SCREEN_TYPES } from '../../utils/constants';
import useScreenType from '../../utils/useScreenType';
import Header from '../Header/Header';
import Start from '../Start/Start';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';

function App() {
  const { screenType, openStartPage, openLoginPage } = useScreenType();

  return (
    <>
      <Header openStartPage={openStartPage} openLoginPage={openLoginPage} />
      {screenType === SCREEN_TYPES.START_PAGE && (
        <Start/>
      )}
      {screenType === SCREEN_TYPES.LOGIN_PAGE && (
        <Login openLoginPage={openLoginPage}/>
      )}
      <Footer/>
    </>
  )
}

export default App
