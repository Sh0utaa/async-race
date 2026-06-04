import { useState } from 'react';
import type { CreateCarDto } from '../utils/types';

interface CreateCarComponentProps {
  onCreate: (car: CreateCarDto) => void;
}

export default function CreateCarComponent({
  onCreate,
}: CreateCarComponentProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const handleCreate = async () => {
    const car: CreateCarDto = { name, color };
    await onCreate(car);

    setName('');
    setColor('');
  };

  return (
    <div className="garage-create-form">
      <input
        type="text"
        name="crt-name"
        placeholder="brand"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="color"
        name="crt-color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button onClick={handleCreate} type="button">
        create
      </button>
    </div>
  );
}
