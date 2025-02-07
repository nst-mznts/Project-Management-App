import './Footer.scss';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer>
      <p>2024</p>
      <div className="git-profile">
        <span className="git-icon"></span>
        <a href="https://github.com/nst-mznts" target="blank">
          nst-mznts
        </a>
      </div>
    </footer>
  );
};

export default Footer;
