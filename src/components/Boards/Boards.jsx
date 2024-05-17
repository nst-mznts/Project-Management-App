import './Boards.scss';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { MdAdd } from "react-icons/md";

function Boards() {
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
            </div>
        </main>
    );
}
  
Boards.propTypes = {
};
  
export default Boards;