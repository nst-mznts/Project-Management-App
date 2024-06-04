import './EditForm.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function EditForm({ openedBoard, onCancel, onSave }) {
    const [boardTitle, setBoardTitle] = useState(openedBoard.title || '');
    const { t } = useTranslation();
    console.log('openedBoard: ', openedBoard);

    return (
        <div className="popup__bg">
            <div className="popup bordered">
                <div className="popup-content">
                    <h4 className="title">{t("add-new-board")}</h4>
                    <input
                        id="edit-board-input"
                        name="edit-board-input"
                        className="form-input"
                        type="text"
                        placeholder={t("new-board-title")}
                        value={boardTitle}
                        onChange={event => setBoardTitle(event.target.value)}
                    />
                    <div className="buttons-wrapper">
                        <button
                            type="button"
                            className="button rectangular-button bordered"
                            onClick={onCancel}
                        >
                            {t("cancel-button")}
                        </button>
                        <button
                            type="button"
                            className="button rectangular-button colored"
                            onClick={() => onSave({title: boardTitle})}
                        >
                            {t("save-button")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

EditForm.propTypes = {
    openedBoard: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        tasks: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
        })),
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default EditForm;
