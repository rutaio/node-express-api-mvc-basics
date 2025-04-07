import { useState, useEffect } from 'react';
import './car-list.css';
import axios from 'axios';
import { CarCard } from '../CarCard/CarCard';
import { Car } from '../../types/CarTypes';
import { API_URL } from '../../constants/global';

export const CarList = () => {
  const [cars, setCars] = useState<Car[]>([]);

  // fetchinam visus automobilius is backendo:
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${API_URL}/cars`);
        setCars(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCars();
  }, []);

  // atvaizduojam visus automobilius kortelese:
  return (
    <>
      <div className="hero">
        <h1>Automobiliu Nuomos Platforma - Techno Car</h1>
        <p>Atraskite musu atrinktu automobiliu kolekcija!</p>
      </div>
      <div className="section">
        <div className="section-title">
          <h2>Nuomos pasiulymai</h2>
          <p>Perziurekite musu automobiliu kolekcija</p>
        </div>
        <div className="car-list">
          {cars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </div>
    </>
  );
};
