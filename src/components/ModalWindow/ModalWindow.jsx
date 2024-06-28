import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './ModalWindow.scss';
import Deletion from './Deletion';
import Editing from './Editing';

function ModalWindow({ openedBoard, onCancel, onDelete, deleteProfile, onSave, currentItem }) {
  const { t } = useTranslation();

  return (
    <div className="popup__bg">
        <div className="popup bordered">
            <div className="popup-content">
                {currentItem === 'delete' && (
                    <Deletion
                        message="delete-board-confirmation"
                        buttonText="delete-button"
                        onCancel={onCancel}
                        onDelete={onDelete}
                    />
                )}
                {currentItem === 'profile' && (
                    <Deletion
                        message="delete-profile-confirmation"
                        buttonText="delete-button"
                        onCancel={onCancel}
                        onDelete={deleteProfile}
                    />
                )}
                {currentItem === 'edit' && (
                    <Editing
                        openedBoard={openedBoard}
                        onCancel={onCancel}
                        onSave={onSave}
                    />
                )}
            </div>
        </div>
    </div>
  );
}

ModalWindow.propTypes = {
    openedBoard: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        columnIds: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    deleteProfile: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    currentItem: PropTypes.string.isRequired,
};

export default ModalWindow;
