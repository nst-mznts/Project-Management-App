import './Boards.scss';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { MdAdd } from "react-icons/md";
import Sidebar from '../Sidebar/Sidebar';
import { useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';

function Boards({ isSidebarOpen, openSidebar, openStartPage, userName }) {
    const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
    const { t } = useTranslation();

    return (
        <main className="boards-page">
            <div className="boards-page-content">
                <div className='start-button'>
                    <button className='button rectangular-button colored'>
                        <MdAdd size="2em"/>
                        {t("add-board-button")}
                    </button>
                </div>
                {isModalWindowOpened && (
                    <ModalWindow
                        message="delete-confirmation"
                        buttonText="delete-button"
                        onCancel={setIsModalWindowOpened}
                        onReset={openStartPage}
                    />
                )}
                {isSidebarOpen && (
                    <Sidebar
                        openStartPage={openStartPage}
                        openSidebar={openSidebar}
                        userName={userName}
                        onOpen={setIsModalWindowOpened}
                    />
                )}
            </div>
        </main>
    );
}
  
Boards.propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
    openSidebar: PropTypes.func.isRequired,
    openStartPage: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
};
  
export default Boards;