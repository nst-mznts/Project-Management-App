import './EditAndDeleteButtons.scss';
import { FC } from 'react';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

interface EditAndDeleteButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
  buttonStyle: string;
}

const EditAndDeleteButtons: FC<EditAndDeleteButtonsProps> = ({ onEdit, onDelete, buttonStyle }) => {
  return (
    <div className="boards-buttons-wrapper">
      <button className={`button round-button ${buttonStyle}`} onClick={onEdit}>
        <MdEdit size="2em" />
      </button>
      <button className={`button round-button ${buttonStyle}`} id="delete-board" onClick={onDelete}>
        <MdDelete size="2em" />
      </button>
    </div>
  );
};

export default EditAndDeleteButtons;
