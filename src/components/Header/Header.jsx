import './Header.scss';
import Logo from '../Logo/Logo';
import SymbolToggle from '../SymbolToggle/SymbolToggle';
import { useState } from 'react';

function Header() {
  const [lang, setLang] = useState(false);

  return (
    <header className="header">
      <Logo />
      <SymbolToggle firstSymbol='EN' secondSymbol='RU' selectedSymbol={lang} setSelectedSymbol={setLang} />
      <div className="buttons-wrapper">
        <button className='button rectangular-button colored'>Log in</button>
        <button className='button rectangular-button bordered'>Sign up</button>
      </div>
    </header>
  );
}

export default Header;
