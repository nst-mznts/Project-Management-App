import './Logo.scss';
import { PiStarFourFill } from "react-icons/pi";

function Logo({ openStartPage }) {
  return (
    <div className="logo" onClick={openStartPage}>
      <PiStarFourFill className="logo-icon" size="2em"/>
      <h1 className="logo-header">PMApp</h1>
    </div>
  );
}

export default Logo;
