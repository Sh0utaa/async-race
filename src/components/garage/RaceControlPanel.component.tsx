import useGarage from '../../hooks/useGarage';

export default function RaceControlPanel() {
  const { onCarGeneration } = useGarage();
  return (
    <button
      type="button"
      className="garage-generate-btn"
      onClick={onCarGeneration}
    >
      generate cars
    </button>
  );
}
