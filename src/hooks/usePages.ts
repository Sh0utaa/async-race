import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  decrementGaragePage,
  incrementGaragePage,
} from '../redux/paginationSlice';

export default function usePage() {
  const dispatch = useAppDispatch();
  const { garagePage } = useAppSelector((state) => state.page);

  const onGaragePageIncrement = async (): Promise<void> => {
    dispatch(incrementGaragePage());
  };

  const onGaragePageDecrement = async (): Promise<void> => {
    dispatch(decrementGaragePage());
  };

  return { garagePage, onGaragePageIncrement, onGaragePageDecrement };
}
