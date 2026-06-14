import { useEffect } from 'react';
import Navbar from '../components/Navbar.component';
import useWinners from '../hooks/useWinners';
import { fetchWinners } from '../redux/winnersSlice';
import type { WinnersConfig } from '../utils/types';
import { useAppDispatch } from '../redux/hooks';

export default function WinnersView() {
  const { winnersMap } = useWinners();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const args: WinnersConfig = {
      page: 1,
      limit: 10,
      sort: 'wins',
      order: 'ASC',
    };
    dispatch(fetchWinners(args));
  }, [dispatch]);

  const winnersList = Object.values(winnersMap);

  return (
    <div className="winners">
      <Navbar />
      <table border={1}>
        <thead>
          <tr>
            <th>id</th>
            <th>wins</th>
            <th>time</th>
          </tr>
        </thead>
        <tbody>
          {winnersList.map((winner) => (
            <tr key={winner.id}>
              <td>{winner.id}</td>
              <td>{winner.wins}</td>
              <td>{winner.time}s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
