import { Link, useLocation } from 'react-router-dom';
import GarageView from './views/Garage.view.tsx';
import WinnersView from './views/Winners.view.tsx';
import './styles/app.css';

export default function App() {
  const location = useLocation();

  const isGarageActive = location.pathname === '/garage';
  const isWinnersActive = location.pathname === '/winners';

  const isRaceView =
    location.pathname === '/garage' || location.pathname === '/winners';

  return (
    <>
      {!isRaceView && (
        <div className="landing">
          <h1>Welcome to Async Race</h1>
          <nav>
            <ul>
              <li>
                <Link to="/garage">garage</Link>
              </li>
              <li>
                <Link to="/winners">winner</Link>
              </li>
            </ul>
          </nav>
          <span>
            disclamer! please clone and run{' '}
            <a href="https://github.com/mikhama/async-race-api">this</a>{' '}
            repository before proceeding :)
          </span>
        </div>
      )}

      <main className="view-container">
        <div className={`view-pane ${isGarageActive ? 'active' : 'inactive'}`}>
          <GarageView />
        </div>

        <div className={`view-pane ${isWinnersActive ? 'active' : 'inactive'}`}>
          <WinnersView />
        </div>
      </main>
    </>
  );
}
