import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './ModalWindow.scss';

function ModalWindow({ message, buttonText, onCancel, onReset }) {
  const { t } = useTranslation();

  return (
    <div className="popup__bg">
      <div className="popup bordered">
        <div className="popup-content">
          <h4 className="title">{t(message)}</h4>
          <div className="buttons-wrapper">
            <button
              type="button"
              className="button rectangular-button bordered"
              onClick={() => onCancel(false)}
            >
              {t("cancel-button")}
            </button>
            <button
              type="button"
              className="button rectangular-button colored"
              onClick={onReset}
            >
              {t(buttonText)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ModalWindow.propTypes = {
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default ModalWindow;
