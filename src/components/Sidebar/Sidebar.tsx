import './Sidebar.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, selectIsAuth } from '../../redux/slices/auth';
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
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const { openModal } = useModal();

  const onClickLogOut = () => {
    onClose();
    localStorage.removeItem('token');
    dispatch(logout());
  };

  const handleClickButton = () => {
    onClose();
  };

  return (
    <div className="sidenav">
      <div className="sidenav-header">
        {isAuth ? (
          <>
            <h2 className="sidenav-header-title">
              {`${t('title-profile')}, `}
              <span className="sidenav-header-username">{userName}</span>
              {'!'}
            </h2>
            <button className="button round-button additional-colored" onClick={onClose}>
              <MdClose size="2em" />
            </button>
          </>
        ) : (
          <>
            <h2 className="sidenav-header-title">{t('menu')}</h2>
            <button className="button round-button additional-colored" onClick={onClose}>
              <MdClose size="2em" />
            </button>
          </>
        )}
      </div>
      {isAuth ? (
        <>
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
        </>
      ) : (
        <>
          <Link
            to="/auth/login"
            className="button rectangular-button colored mobile-menu--button"
            onClick={handleClickButton}
          >
            {t('login')}
          </Link>
          <Link
            to="/auth/signup"
            className="button rectangular-button bordered mobile-menu--button"
            onClick={handleClickButton}
          >
            {t('signup')}
          </Link>
        </>
      )}
    </div>
  );
};

export default Sidebar;
