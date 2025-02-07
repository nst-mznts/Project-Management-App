import { ActionType } from './types/ActionType.types';

interface createHandleConfirmProps {
  onSubmit: (title: string) => Promise<void>;
  onRemove: (id: string) => void;
  onEdit: (id: string, title: string) => Promise<void>;
  addTask?: (title: string, columnId: string) => Promise<void>;
  editTask?: (title: string) => Promise<void>;
  removeTask?: () => void;
  deleteProfile?: () => void;
  closeModal: () => void;
}

export const createHandleConfirm = ({
  onSubmit,
  onRemove,
  onEdit,
  addTask,
  editTask,
  removeTask,
  deleteProfile,
  closeModal,
}: createHandleConfirmProps) => {
  return (title: string, action: ActionType, id?: string) => {
    switch (action) {
      case ActionType.AddBoard:
      case ActionType.AddColumn:
        onSubmit(title);
        break;
      case ActionType.DeleteBoard:
      case ActionType.DeleteColumn:
        if (id) onRemove(id);
        break;
      case ActionType.RenameBoard:
      case ActionType.RenameColumn:
        if (id) onEdit(id, title);
        break;
      case ActionType.AddTask:
        if (addTask && id) addTask(title, id);
        break;
      case ActionType.RenameTask:
        if (editTask) editTask(title);
        break;
      case ActionType.DeleteTask:
        if (removeTask) removeTask();
        break;
      case ActionType.DeleteProfile:
        if (deleteProfile) deleteProfile();
        break;
      default:
        break;
    }
    closeModal();
  };
};
