export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface CarsResponse {
  cars: Car[];
  totalCount: number;
}

export interface CreateCarDto {
  name: string;
  color: string;
}

export interface UpdateCarDto {
  name?: string;
  color?: string;
}

export const listOfCars: string[] = [
  'Mercedes',
  'BMW',
  'Audi',
  'Volkswagen',
  'Porsche',
  'Ferrari',
  'Lamborghini',
  'Alfa Romeo',
  'Fiat',
  'Maserati',
  'Bentley',
  'Jaguar',
  'Peugeot',
  'Renault',
  'Volvo',
  'Škoda',
  'Toyota',
  'Lexus',
  'Honda',
  'Nissan',
  'Mazda',
  'Subaru',
  'Mitsubishi',
];

export const listOfColors: string[] = [
  'red',
  'blue',
  'green',
  'yellow',
  'orange',
  'purple',
  'pink',
  'cyan',
  'magenta',
  'lime',
  'teal',
  'indigo',
  'violet',
  'gold',
  'silver',
  'brown',
  'black',
  'white',
  'gray',
  'turquoise',
];
