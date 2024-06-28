import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ModalWindow.scss';

function Editing({ openedBoard, onCancel, onSave }) {
    const [boardTitle, setBoardTitle] = useState(openedBoard.title || '');
    const { t } = useTranslation();

    return (
        <>
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
        </>
    );
}

Editing.propTypes = {
    openedBoard: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        columnIds: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default Editing;
