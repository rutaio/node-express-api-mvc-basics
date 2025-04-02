// Hooks:
// useParams - yra Hook, kuris yra naudojamas gauti URL parametrus, pvz id => :id
// - zino, kokiame mes puslapyje pagal id esame
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './car-details.css';
import { Car } from '../../types/types';

export const CarDetails = () => {
  // Hooks apsirasome virsuje
  const navigate = useNavigate();
  const { id } = useParams();
  const [car, setCar] = useState<Car[]>([]);

  const api = 'http://localhost:3000/api/cars';

  const handleBackClick = () => {
    navigate('/');
  };

  // fetchinam visus automobilius is backendo:
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${api}/${id}`);
        setCar(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="car-detail">
      <div className="car-detail-container">
        {/* Kaire puse */}
        <div className="car-detail-left">
          <img src={car.image} alt="" className="car-detail-image" />
        </div>

        {/* Desine puse */}
        <div className="car-detail-right">
          {/* header */}
          <div className="car-header"></div>
          <h2>
            {car.make} {car.model}
          </h2>
          <p className="car-year">{car.year} m.</p>
        </div>

        {/* */}
        <div className="car-description">
          <p>Nuostabus automobilis!</p>
        </div>
        <div className="car-specs">
          <div className="spec-item">
            <span className="spec-label">Pavaru deze: </span>
            <span className="spec-value">{car.transmission}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Kuro tipas: </span>
            <span className="spec-value">{car.fuelType}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Sedimu vietu: </span>
            <span className="spec-value">{car.seats}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Kaina per diena: </span>
            <span className="spec-value">${car.price}</span>
          </div>
        </div>
        <div className="car-actions">
          <button className="button button-primary">Rezervuoti</button>
          <button className="button button-secondary" onClick={handleBackClick}>
            Grizti i pagrindini
          </button>
        </div>
      </div>
    </div>
  );
};
