import './SymbolToggle.scss';

function SymbolToggle({ firstSymbol, secondSymbol, selectedSymbol, setSelectedSymbol }) {
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
