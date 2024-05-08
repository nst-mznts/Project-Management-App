import './Logo.scss';
import { PiStarFourFill } from "react-icons/pi";

function Logo() {
  return (
    <div className="logo">
      <PiStarFourFill className="logo-icon" size="2em"/>
      <h1 className="logo-header">PMApp</h1>
    </div>
  );
}

export default Logo;
