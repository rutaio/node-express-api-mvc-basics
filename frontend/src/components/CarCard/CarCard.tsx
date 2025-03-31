import './car-card.css';
import { Car } from '../../types/types';

interface CarCardProps {
  car: Car;
}

export const CarCard = ({car}: CarCardProps) => {
  return (
    <div className="card-card">
      <img src={car.image} alt="car image" className="card-card-image" />
      <div className="car-card-content">
        <h3>
          {car.make} {car.model}
        </h3>
        <p>{car.description}</p>
      </div>
    </div>
  );
};
