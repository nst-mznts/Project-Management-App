import './Header.scss';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../Logo/Logo';
import SymbolToggle from '../SymbolToggle/SymbolToggle';

function Header() {
  const [language, setLanguage] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (value) => {
    setLanguage(value);
    i18n.changeLanguage(value ? "ru" : "en");
  };

  return (
    <header className="header">
      <Logo />
      <SymbolToggle firstSymbol='EN' secondSymbol='RU' selectedSymbol={language} setSelectedSymbol={changeLanguage} />
      <div className="buttons-wrapper">
        <button className='button rectangular-button colored'>{t("login")}</button>
        <button className='button rectangular-button bordered'>{t("signup")}</button>
      </div>
    </header>
  );
}

export default Header;
