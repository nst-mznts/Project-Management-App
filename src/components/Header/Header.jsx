import './Header.scss';
import PropTypes from 'prop-types';
import { SCREEN_TYPES } from '../../utils/constants';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../Logo/Logo';
import SymbolToggle from '../SymbolToggle/SymbolToggle';

function Header({ screenType, openStartPage, openLoginPage, openSignupPage }) {
  const [language, setLanguage] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (value) => {
    setLanguage(value);
    i18n.changeLanguage(value ? "ru" : "en");
  };

  return (
    <header className="header">
      <Logo openStartPage={openStartPage}/>
      <SymbolToggle firstSymbol='EN' secondSymbol='RU' selectedSymbol={language} setSelectedSymbol={changeLanguage} />
      <div className="buttons-wrapper">
        <button
          className='button rectangular-button colored'
          onClick={openLoginPage}
        >
          {screenType === SCREEN_TYPES.BOARDS_PAGE ? t("logout") : t("login")}
        </button>
        <button
          className='button rectangular-button bordered'
          onClick={openSignupPage}
        >
          {screenType === SCREEN_TYPES.BOARDS_PAGE ? t("edit-profile") : t("signup")}
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  screenType: PropTypes.string.isRequired,
  openStartPage: PropTypes.func.isRequired,
  openLoginPage: PropTypes.func.isRequired,
  openSignupPage: PropTypes.func.isRequired,
};

export default Header;
