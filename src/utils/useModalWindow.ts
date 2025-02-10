import { useState } from 'react';
import { ActionType } from './types/ActionType.types';

export default function useModalWindow() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState(ActionType.AddBoard);
  const [initialTitle, setInitialTitle] = useState('');
  const [boardIdForRemoving, setBoardIdForRemoving] = useState('');

  const openModal = (actionType: ActionType, id: string = '', initialTitle: string = ''): void => {
    setActionType(actionType);
    setBoardIdForRemoving(id);
    setInitialTitle(initialTitle);
    setModalOpen(true);
  };

  const closeModal = (): void => setModalOpen(false);

  return {
    isModalOpen,
    actionType,
    initialTitle,
    boardIdForRemoving,
    openModal,
    closeModal,
  };
}
