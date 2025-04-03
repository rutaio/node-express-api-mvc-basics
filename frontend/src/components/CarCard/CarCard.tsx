// sis hook pades nusiust vartotoja i kita puslapi, jam paspaudus ant masinos korteles:
import { useNavigate } from 'react-router-dom';
import './car-card.css';
import { Car } from '../../types/CarTypes';

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  // naudojant hooks, reikia prisilyginti konstantai:
  const navigate = useNavigate();

  const handleCardClick = () => {
    // navigate hook'as - nuveda i kita puslapio, jo neperkraunant:
    navigate(`/cars/${car.id}`);

    // jei noretume tiesiog nusiusti vartotoja i ta puslapi:
    //  window.location.href = '/cars' + car.id;
    // bet siuo atveju perkrauna puslapi...
  };

  return (
    <div className="car-card" onClick={handleCardClick}>
      <img src={car.image} alt="car image" className="car-card-image" />
      <div className="car-card-content">
        <h3>
          {car.make} {car.model}
        </h3>
        <p>{car.description}</p>
      </div>
    </div>
  );
};
