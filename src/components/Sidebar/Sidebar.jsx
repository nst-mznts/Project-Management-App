import './Sidebar.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/auth';
import { MdClose } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useTranslation } from 'react-i18next';

function Sidebar({ onClose, userName, onOpen }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const onClickLogOut = () => {
        localStorage.removeItem('token');
        dispatch(logout());
    };

    return (
        <div className="sidenav">
            <div className="sidenav-header">
                <h2 className="sidenav-header-title">
                    {`${t("title-profile")}, `}
                    <span className="sidenav-header-username">{userName}</span>
                    {'!'}
                </h2>
                <button className='button round-button additional-colored' onClick={onClose}>
                    <MdClose size="2em"/>
                </button>
            </div>
            <Link
                className='profile-links additional-colored'
                to="/"
                onClick={onClickLogOut}
            >
                <MdLogout size="2em"/>
                {t("logout")}
            </Link>
            <div
                className='profile-links additional-colored'
                onClick={() => onOpen({}, 'deleteProfile')}
            >
                <MdDelete size="2em"/>
                {t("delete-profile")}
            </div>
        </div>
    )
}

Sidebar.propTypes = {
    onClose: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
    onOpen: PropTypes.func.isRequired,
};

export default Sidebar;
