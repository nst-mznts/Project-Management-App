import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './ModalWindow.scss';

function ModalWindow ({ isOpen, actionType, onClose, onConfirm, initialTitle = '' }) {
    const [title, setTitle] = useState('');
    const { t } = useTranslation();
  
    useEffect(() => {
        if (isOpen) {
            setTitle(initialTitle);
        }
    }, [isOpen, initialTitle]);
  
    if (!isOpen) return null;

    let modalContent = '';
  
    switch (actionType) {
        case 'addColumn':
            modalContent = t("new-column-title");
            break;
        case 'addTask':
            modalContent = t("new-task-title");
            break;
        case 'createBoard':
            modalContent = t("add-new-board");
            break;
        case 'renameBoard':
            modalContent = t("new-board-title");
            break;
        case 'renameColumn':
            modalContent = t("new-column-title");
            break;
        case 'renameTask':
            modalContent = t("new-task-title");
            break;
        case 'deleteBoard':
            modalContent = t("delete-board-confirmation");
            break;
        case 'deleteColumn':
            modalContent = t("delete-column-confirmation");
            break;
        case 'deleteTask':
            modalContent = t("delete-task-confirmation");
            break;
        case 'deleteProfile':
            modalContent = t("delete-profile-confirmation");
            break;
        default:
            break;
    }
  
    const handleConfirm = () => {
        onConfirm(title, actionType);
        setTitle('');
    };
  
    return (
      <div className="popup__bg">
        <div className="popup bordered">
            <div className="popup-content">
                <h4 className="title">{modalContent}</h4>
                {(actionType !== 'deleteBoard' && actionType !== 'deleteColumn' && actionType !== 'deleteTask' && actionType !== 'deleteProfile') && (
                    <input
                        className="form-input"
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder={t("new-title")}
                    />
                )}
                <div className="buttons-wrapper">
                    <button
                        type="button"
                        className="button rectangular-button bordered"
                        onClick={onClose}
                    >
                        {t("cancel-button")}
                    </button>
                    <button
                        type="button"
                        className="button rectangular-button colored"
                        onClick={handleConfirm}
                    >
                        {t("confirm-button")}
                    </button>
                </div>
            </div>
        </div>
      </div>
    );
};

ModalWindow.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    actionType: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    initialTitleactionType: PropTypes.string,
};
  
export default ModalWindow;