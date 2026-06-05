import { useEffect, useState } from 'react';
import useGarage from '../hooks/useGarage';
import type { UpdateCarDto } from '../utils/types';

export default function UpdateCarComponent() {
  const { selectedCar, onUpdateCar } = useGarage();
  const isSelected = selectedCar === null;

  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    if (selectedCar) {
      setName(selectedCar.name);
      setColor(selectedCar.color);
    } else {
      setName('');
      setColor('#000000');
    }
  }, [selectedCar]);

  const handleUpdateCar = async (): Promise<void> => {
    if (!selectedCar) return;

    const car: UpdateCarDto = {
      name,
      color,
    };

    onUpdateCar(selectedCar?.id, car);

    setName('');
    setColor('#000000');
  };

  return (
    <div className="garage-update-form">
      <input
        type="text"
        name="upd-name"
        placeholder="brand"
        disabled={isSelected}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <input
        type="color"
        name="upd-color"
        disabled={isSelected}
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
        }}
      />
      <button
        type="button"
        disabled={selectedCar === null}
        onClick={handleUpdateCar}
      >
        update
      </button>
    </div>
  );
}
