import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  decrementGaragePage,
  decrementWinnersPage,
  incrementGaragePage,
  incrementWinnersPage,
} from '../redux/pageSlice';

export default function usePage() {
  const dispatch = useAppDispatch();
  const { garagePage, winnersPage } = useAppSelector((state) => state.page);

  const onGaragePageIncrement = async (): Promise<void> => {
    dispatch(incrementGaragePage());
  };

  const onGaragePageDecrement = async (): Promise<void> => {
    dispatch(decrementGaragePage());
  };

  const onWinnersPageIncrement = async (): Promise<void> => {
    dispatch(incrementWinnersPage());
  };

  const onWinnersPageDecrement = async (): Promise<void> => {
    dispatch(decrementWinnersPage());
  };

  return {
    garagePage,
    winnersPage,
    onGaragePageIncrement,
    onGaragePageDecrement,
    onWinnersPageIncrement,
    onWinnersPageDecrement,
  };
}
