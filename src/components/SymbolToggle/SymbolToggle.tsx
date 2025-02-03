import './SymbolToggle.scss';
import { FC } from 'react';

type SymbolToggleProps = {
  firstSymbol: string;
  secondSymbol: string;
  selectedSymbol: boolean;
  setSelectedSymbol: (value: boolean) => any;
}

const SymbolToggle:FC<SymbolToggleProps> = ({ firstSymbol, secondSymbol, selectedSymbol, setSelectedSymbol }) => {
  return (
    <div
      className={`swith-button ${selectedSymbol ? 'switch-active' : ''}`}
      onClick={() => setSelectedSymbol(!selectedSymbol)}
    >
      <div className="swith-item">{firstSymbol}</div>
      <div className="swith-item">{secondSymbol}</div>
    </div>
  );
}

export default SymbolToggle;
