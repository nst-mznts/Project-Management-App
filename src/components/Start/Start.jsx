import './Start.scss';
import main_img from './main.svg';

function Start() {

  return (
    <main className="start-page">
        <div className="start-page-content">
            <h2>Manage your daily tasks</h2>
            <p>Manage your daily tasks and perform them on time easily</p>
            <button className='button rectangular-button colored start-button'>Get started</button>
        </div>
      <img src={main_img} className='start-page-image' alt='people'/>
    </main>
  );
}

export default Start;