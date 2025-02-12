import './Sidebar.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/slices/auth';
import { MdClose } from 'react-icons/md';
import { MdLogout } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { ActionType } from '../../utils/types/ActionType.types';
import { useModal } from '../../utils/ModalContext';

type SidebarProps = {
  onClose: () => any;
  userName: string;
};

const Sidebar: FC<SidebarProps> = ({ onClose, userName }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { openModal } = useModal();

  const onClickLogOut = () => {
    onClose();
    localStorage.removeItem('token');
    dispatch(logout());
  };

  return (
    <div className="sidenav">
      <div className="sidenav-header">
        <h2 className="sidenav-header-title">
          {`${t('title-profile')}, `}
          <span className="sidenav-header-username">{userName}</span>
          {'!'}
        </h2>
        <button className="button round-button additional-colored" onClick={onClose}>
          <MdClose size="2em" />
        </button>
      </div>
      <Link className="profile-links additional-colored" to="/" onClick={onClickLogOut}>
        <MdLogout size="2em" />
        {t('logout')}
      </Link>
      <div
        className="profile-links additional-colored"
        onClick={() => openModal(ActionType.DeleteProfile)}
      >
        <MdDelete size="2em" />
        {t('delete-profile')}
      </div>
    </div>
  );
};

export default Sidebar;
