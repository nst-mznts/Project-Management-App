import './Sidebar.scss';
import PropTypes from 'prop-types';
import { MdClose } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useTranslation } from 'react-i18next';

function Sidebar({ openStartPage, onClose, userName, onOpen }) {
    const { t } = useTranslation();

    return (
        <div className="sidenav">
            <div className="sidenav-header">
                <h2>{`${t("title-profile")}, ${userName}!`}</h2>
                <button className='button round-button additional-colored' onClick={onClose}>
                    <MdClose size="2em"/>
                </button>
            </div>
            <div
                className='profile-links additional-colored'
                onClick={openStartPage}
            >
                <MdLogout size="2em"/>
                {t("logout")}
            </div>
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
    openStartPage: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
    onOpen: PropTypes.func.isRequired,
};

export default Sidebar;
