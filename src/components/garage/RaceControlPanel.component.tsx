import useGarage from '../../hooks/useGarage';

export default function RaceControlPanel() {
  const { generateCars } = useGarage();
  return (
    <button
      type="button"
      className="garage-generate-btn"
      onClick={generateCars}
    >
      generate cars
    </button>
  );
}
