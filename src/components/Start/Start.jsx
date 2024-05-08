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
            <button className='button rectangular-button colored start-button'>{t("start-page-button")}</button>
        </div>
      <img src={main_img} className='start-page-image' alt='people'/>
    </main>
  );
}

export default Start;