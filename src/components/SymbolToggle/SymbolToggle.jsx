import './SymbolToggle.scss';
import PropTypes from 'prop-types';

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

SymbolToggle.propTypes = {
  firstSymbol: PropTypes.node.isRequired,
  secondSymbol: PropTypes.node.isRequired,
  selectedSymbol: PropTypes.bool.isRequired,
  setSelectedSymbol: PropTypes.func.isRequired,
};

export default SymbolToggle;
