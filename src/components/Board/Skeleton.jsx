import './Board.scss';

function BoardSkeleton () {
    return (
      <div className="board-skeleton" >
        <div className="board-title-skeleton"></div>
        <div className="boards-buttons-wrapper">
            <div className='button round-button skeleton'></div>
            <div className='button round-button skeleton'></div>
        </div>
      </div>
    )
}
  
export default BoardSkeleton;