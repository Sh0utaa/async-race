import { fetchWinners } from '../redux/winnersSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export default function useWinners() {
  const dispatch = useAppDispatch();
  const { winnersMap, totalCount, args, raceStarted } = useAppSelector(
    (state) => state.winners,
  );

  const onFetchingWinners = () => {
    dispatch(fetchWinners(args));
  };

  return {
    winnersMap,
    totalCount,
    raceStarted,
    onFetchingWinners,
  };
}
