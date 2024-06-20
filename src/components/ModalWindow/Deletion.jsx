import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './ModalWindow.scss';

function Deletion({ message, buttonText, onCancel, onDelete }) {
  const { t } = useTranslation();

  return (
    <>
        <h4 className="title">{t(message)}</h4>
        <div className="buttons-wrapper">
            <button
                type="button"
                className="button rectangular-button bordered"
                onClick={() => onCancel()}
            >
                {t("cancel-button")}
            </button>
            <button
                type="button"
                className="button rectangular-button colored"
                onClick={onDelete}
            >
                {t(buttonText)}
            </button>
        </div>
    </>
  );
}

Deletion.propTypes = {
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Deletion;
