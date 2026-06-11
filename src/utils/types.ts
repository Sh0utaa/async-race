export interface Car {
  name: string;
  color: string;
  id: number;
}

export type Engine = {
  carId: number;
  status: EngineStatus;
  velocity: number;
  distance: number;
  duration: number;
  driveRequestId?: string;
};

export type EngineStatus =
  | 'stopped'
  | 'started'
  | 'driving'
  | 'broken'
  | 'finished'
  | 'pending';

export interface EngineData {
  carId: number;
  velocity: number;
  distance: number;
}

export interface DriveResponse {
  success: boolean;
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
