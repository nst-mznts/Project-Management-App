import './Start.scss';
import { useTranslation } from 'react-i18next';
import main_img from './main.svg';

function Start() {
  const { t } = useTranslation();

  return (
    <main className="start-page">
        <div className="start-page-content">
            <h2>{t("start-page-title")}</h2>
            <p>{t("start-page-description")}</p>
            <div className='start-button'>
              <button className='button rectangular-button colored'>{t("start-page-button")}</button>
            </div>
        </div>
      <img src={main_img} className='start-page-image' alt='people'/>
    </main>
  );
}

export default Start;