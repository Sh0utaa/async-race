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
