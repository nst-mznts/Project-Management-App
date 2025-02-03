import './Header.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../Logo/Logo';
import SymbolToggle from '../SymbolToggle/SymbolToggle';

interface HeaderProps {
  onOpenSidebar: () =>  void;
}

const Header:FC<HeaderProps> = ({ onOpenSidebar }) => {
  const [language, setLanguage] = useState(false);
  const { t, i18n } = useTranslation();
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  const changeLanguage = (value: boolean) => {
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
        <nav className="buttons-wrapper">
          <Link to="/" onClick={onClickLogOut}>
            <button
              className='button rectangular-button colored'
            >
              {t("logout")}
            </button>
          </Link>
          <button
            className='button rectangular-button bordered'
            onClick={onOpenSidebar}
          >
            {t("edit-profile")}
          </button>
        </nav>
      ) : (
        <nav className="buttons-wrapper">
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
        </nav>
      )}
    </header>
  );
}

export default Header;
