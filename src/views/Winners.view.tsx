import { useEffect, useMemo, useState } from 'react';
import CarIcon from '../assets/svg/car.svg?react';
import Navbar from '../components/Navbar.component';
import useWinners from '../hooks/useWinners';
import { fetchWinners } from '../redux/winnersSlice';
import type { WinnersConfig, Car } from '../utils/types'; // Assumed Car is exported here
import { useAppDispatch } from '../redux/hooks';
import '../styles/winners.css';
import usePage from '../hooks/usePages';
import PaginationComponent from '../components/winners/WinnersPagination.component';
import useGarage from '../hooks/useGarage';

type SortBy = 'wins' | 'time';
type SortOrder = 'ASC' | 'DESC';

export default function WinnersView() {
  const { winnersMap } = useWinners();
  const { winnersPage } = usePage();
  const dispatch = useAppDispatch();
  const { getCarsByIds } = useGarage();

  const [sort, setSort] = useState<SortBy>('wins');
  const [order, setOrder] = useState<SortOrder>('DESC');

  const [carsMap, setCarsMap] = useState<Record<number, Car>>({});

  useEffect(() => {
    const args: WinnersConfig = {
      page: winnersPage,
      limit: 10,
      sort,
      order,
    };
    dispatch(fetchWinners(args));
  }, [dispatch, winnersPage, sort, order]);

  const winnersList = useMemo(
    () =>
      Object.values(winnersMap).sort((a, b) => {
        const valueA = a[sort];
        const valueB = b[sort];

        return order === 'ASC' ? valueA - valueB : valueB - valueA;
      }),
    [winnersMap, sort, order],
  );

  useEffect(() => {
    if (winnersList.length === 0) return;

    const carIds = winnersList.map((winner) => winner.id);

    getCarsByIds(carIds)
      .then((carsData) => {
        const newCarsMap = carsData.reduce(
          (acc, car) => {
            acc[car.id] = car;
            return acc;
          },
          {} as Record<number, Car>,
        );

        setCarsMap(newCarsMap);
      })
      .catch((err) =>
        console.error('Error fetching car details for winners:', err),
      );
  }, [winnersList, getCarsByIds]);

  return (
    <div className="winners">
      <Navbar />

      <div className="winners__container">
        <div className="winners__header-row">
          <h1 className="winners__title">Winners</h1>

          <div className="winners__sort-container">
            <div className="winners__sort-group">
              <label htmlFor="sort-by" className="winners__sort-label">
                Sort by
                <select
                  id="sort-by"
                  className="winners__sort-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortBy)}
                >
                  <option value="wins">Wins</option>
                  <option value="time">Best Time</option>
                </select>
              </label>
            </div>

            <div className="winners__sort-group">
              <label htmlFor="sort-order" className="winners__sort-label">
                Order
                <select
                  id="sort-order"
                  className="winners__sort-select"
                  value={order}
                  onChange={(e) => setOrder(e.target.value as SortOrder)}
                >
                  <option value="ASC">Ascending</option>
                  <option value="DESC">Descending</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <table className="winners__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Car</th>
              <th>Name</th>
              <th>Wins</th>
              <th>Best Time (sec)</th>
            </tr>
          </thead>

          <tbody>
            {winnersList.map((winner) => {
              const carDetails = carsMap[winner.id];

              return (
                <tr key={winner.id}>
                  <td>{winner.id}</td>
                  <td className="winners__car-cell">
                    <CarIcon
                      style={{
                        width: '60px',
                        height: 'auto',
                        color: carDetails?.color || '#ccc',
                        zIndex: 5,
                      }}
                    />
                  </td>
                  <td className="winners__name-cell">
                    {carDetails ? carDetails.name : `Car ${winner.id}`}
                  </td>
                  <td>{winner.wins}</td>
                  <td>{winner.time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <PaginationComponent />
      </div>
    </div>
  );
}
