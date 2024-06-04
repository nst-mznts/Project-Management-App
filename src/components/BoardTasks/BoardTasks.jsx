import './BoardTasks.scss';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function BoardTasks({ openBoardsPage, openedBoard }) {
    const { t } = useTranslation();

    return (
        <main className="boards-page">
            <div className="boards-page-content">
                <div className='board-tasks-button-wrapper'>
                    <div className='board-tasks-buttons'>
                        <button
                            type="button"
                            className="button rectangular-button bordered"
                            onClick={openBoardsPage}
                        >
                            {t("back-button")}
                        </button>
                    </div>
                    <h3 className='board-tasks-title'>{openedBoard.title}</h3>
                    <div className='board-tasks-buttons'>
                        <button 
                            type="button"
                            className="button rectangular-button colored"
                        >
                            {t("add-column-button")}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

BoardTasks.propTypes = {
    openBoardsPage: PropTypes.func.isRequired,
    openedBoard: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        tasks: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
        })),
    }).isRequired,
};

export default BoardTasks;
