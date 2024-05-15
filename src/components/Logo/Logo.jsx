import './Logo.scss';
import PropTypes from 'prop-types';
import { PiStarFourFill } from "react-icons/pi";

function Logo({ openStartPage }) {
  return (
    <div className="logo" onClick={openStartPage}>
      <PiStarFourFill className="logo-icon" size="2em"/>
      <h1 className="logo-header">PMApp</h1>
    </div>
  );
}

Logo.propTypes = {
  openStartPage: PropTypes.func.isRequired,
};

export default Logo;
