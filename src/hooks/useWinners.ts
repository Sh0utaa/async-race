import type { Winner } from '../utils/types';
import { fetchWinners } from '../redux/winnersSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export default function useWinners() {
  const dispatch = useAppDispatch();
  const { winners, totalCount, args, currentWinner, raceStarted } =
    useAppSelector((state) => state.winner);

  const onFetchingWinners = () => {
    dispatch(fetchWinners(args));
  };

  const handleWinner = async (winner: Winner) => {
    // if winner in winners
    // update winner stats
    // else create new winner
    // re-render page
  };

  return [
    winners,
    totalCount,
    currentWinner,
    raceStarted,
    onFetchingWinners,
    handleWinner,
  ];
}
