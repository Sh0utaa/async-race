import { Link } from 'react-router-dom';
import './styles/app.css';

export default function App() {
  return (
    <>
      <h1>Welcome to Async Race</h1>
      <ul>
        <li>
          <Link to="/garage">garage</Link>
        </li>
        <li>
          <Link to="/winners">winner</Link>
        </li>
      </ul>
    </>
  );
}
