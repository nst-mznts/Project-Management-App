import './Start.scss';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import main_img from './main.svg';

function Start({ openLoginPage }) {
  const { t } = useTranslation();

  return (
    <main className="start-page">
        <div className="start-page-content">
            <h2>{t("start-page-title")}</h2>
            <p>{t("start-page-description")}</p>
            <div className='start-button'>
              <button className='button rectangular-button colored' onClick={openLoginPage}>{t("start-page-button")}</button>
            </div>
        </div>
      <img src={main_img} className='start-page-image' alt='people'/>
    </main>
  );
}

Start.propTypes = {
  openLoginPage: PropTypes.func.isRequired,
};

export default Start;
