import './Boards.scss';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { MdAdd } from "react-icons/md";
import Sidebar from '../Sidebar/Sidebar';

function Boards({ isSidebarOpen, openSidebar, openStartPage }) {
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
                {isSidebarOpen && <Sidebar openStartPage={openStartPage} openSidebar={openSidebar}/>}
            </div>
        </main>
    );
}
  
Boards.propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
    openSidebar: PropTypes.func.isRequired,
    openStartPage: PropTypes.func.isRequired,
};
  
export default Boards;