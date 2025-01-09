import './Header.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../Logo/Logo';
import SymbolToggle from '../SymbolToggle/SymbolToggle';

function Header({ onOpen }) {
  const [language, setLanguage] = useState(false);
  const { t, i18n } = useTranslation();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const changeLanguage = (value) => {
    setLanguage(value);
    i18n.changeLanguage(value ? "ru" : "en");
  };

  const onClickLogOut = () => {
    localStorage.removeItem('token');
    dispatch(logout());
  };

  return (
    <header className="header">
      <Logo />
      <SymbolToggle
        firstSymbol='EN'
        secondSymbol='RU'
        selectedSymbol={language}
        setSelectedSymbol={changeLanguage}
      />
      {isAuth ? (
        <div className="buttons-wrapper">
          <Link to="/" onClick={onClickLogOut}>
            <button
              className='button rectangular-button colored'
            >
              {t("logout")}
            </button>
          </Link>
          <Link>
            <button
              className='button rectangular-button bordered'
              onClick={onOpen}
            >
              {t("edit-profile")}
            </button>
          </Link>
        </div>
      ) : (
        <div className="buttons-wrapper">
          <Link to="/auth/login">
            <button
              className='button rectangular-button colored'
            >
              {t("login")}
            </button>
          </Link>
          <Link to="/auth/signup">
            <button
              className='button rectangular-button bordered'
            >
              {t("signup")}
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  onOpen: PropTypes.func.isRequired,
};

export default Header;
