export interface Reservation {
  _id: string;
  carId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  car: {
    _id: string;
    make: string;
    model: string;
    seats: number;
    image: string;
  };
}
