import './ModalWindow.scss';
import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionType } from '../../utils/types';

interface ModalWindowProps {
    actionType: ActionType;
    onClose: () => void;
    onConfirm: (title: string, actionType: ActionType) => void;
    initialTitle?: string;
}

const ModalWindow:FC<ModalWindowProps> = ({ actionType, onClose, onConfirm, initialTitle }) => {
    const [title, setTitle] = useState(initialTitle || '');
    const { t } = useTranslation();

    useEffect(() => {
        setTitle(initialTitle || '');
    }, [initialTitle]);

    const getModalTitle = () => {
        const titles: Record<ActionType, string> = {
            [ActionType.AddColumn]: t("new-column-title"),
            [ActionType.AddTask]: t("new-task-title"),
            [ActionType.AddBoard]: t("add-new-board"),
            [ActionType.RenameBoard]: t("new-board-title"),
            [ActionType.RenameColumn]: t("column-title"),
            [ActionType.RenameTask]: t("task-title"),
            [ActionType.DeleteBoard]: t("delete-board-confirmation"),
            [ActionType.DeleteColumn]: t("delete-column-confirmation"),
            [ActionType.DeleteTask]: t("delete-task-confirmation"),
            [ActionType.DeleteProfile]: t("delete-profile-confirmation"),
        };
        return titles[actionType];
    };

    const isTextArea = actionType === ActionType.AddTask || actionType === ActionType.RenameTask;
    const isInput = actionType === ActionType.AddColumn || actionType === ActionType.AddBoard || actionType === ActionType.RenameBoard || actionType === ActionType.RenameColumn;

    const handleConfirm = () => {
        onConfirm(title, actionType);
        setTitle('');
    };

    return (
        <div className="popup__bg">
            <div className="popup bordered">
                <div className="popup-content">
                    <h4 className="title">{getModalTitle()}</h4>
                    {actionType !== ActionType.DeleteProfile && (
                        isTextArea ? (
                            <textarea
                                className="popup-textarea"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={t("textarea-placeholder")}
                            />
                        ) : isInput ? (
                            <input
                                className="form-input"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={t("input-placeholder")}
                            />
                        ) : null
                    )}
                    <div className="buttons-wrapper">
                        <button
                            type="button"
                            className="button rectangular-button bordered width100"
                            onClick={onClose}
                        >
                            {t("cancel-button")}
                        </button>
                        <button
                            type="button"
                            className="button rectangular-button colored width100"
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

export default ModalWindow;
