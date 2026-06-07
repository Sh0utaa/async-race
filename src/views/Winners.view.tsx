import { Link } from 'react-router-dom';

export default function WinnersView() {
  return (
    <div className="winners">
      <nav>
        <Link to="/winners">Winners</Link>
        <br />
        <Link to="/garage">Garage</Link>
      </nav>
    </div>
  );
}
