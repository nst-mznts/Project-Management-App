import './Start.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import main_img from './main.svg';

const Start: FC = () => {
  const { t } = useTranslation();

  return (
    <main className="start-page">
      <div className="start-page-content">
        <h2 className="start-title">{t('start-page-title')}</h2>
        <p className="start-description">{t('start-page-description')}</p>
        <Link className="start-button" to="/auth/login">
          <button className="button rectangular-button colored width100">
            {t('start-page-button')}
          </button>
        </Link>
      </div>
      <img src={main_img} className="start-page-image" alt="people" />
    </main>
  );
};

export default Start;
