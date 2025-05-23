// Hooks:
// useParams - yra Hook, kuris yra naudojamas gauti URL parametrus, pvz id => :id
// - zino, kokiame mes puslapyje pagal id esame
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './car-details.css';
import { Car } from '../../types/CarTypes';
import { API_URL } from '../../constants/global';
import { AuthContext } from '../../context/AuthContext';
import { ReservationModal } from '../ReservationModal/ReservationModal';

export const CarDetails = () => {
  // Hooks apsirasome virsuje
  const navigate = useNavigate();
  const { id } = useParams();
  // apsirasome null, tuo atveju jeigu ieskomo automobilio nebutu, tada duomenu tipas butu "null":
  const [car, setCar] = useState<Car | null>(null);
  const { user } = useContext(AuthContext);
  const [isReservationModalVisible, setIsReservationModalVisible] =
    useState(false);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleReserveClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsReservationModalVisible(true);
  };

  // fetchinam visus automobilius is backendo:
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${API_URL}/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCars();
  }, []);

  // tuo atveju jeigu ieskomo automobilio nebutu, tada rodytu error zinute:
  if (!car) {
    return <div>Nera tokio automobilio!</div>;
  }

  return (
    <div className="car-detail">
      <div className="car-detail-container">
        {/* Kaire puse */}
        <div className="car-detail-left">
          <img
            src={car?.image}
            alt="Automobilio paveikslelis"
            className="car-detail-image"
          />
        </div>
        {/* Desine puse */}
        <div className="car-detail-right">
          {/* header */}
          <div className="car-header">
            <h2>
              {car?.make} {car?.model}
            </h2>
            <p className="car-year">{car?.year} m.</p>
          </div>
          <div className="car-description">
            <p>Nuostabus automobilis!</p>
          </div>
          <div className="car-specs">
            <div className="spec-item">
              <span className="spec-label">Pavaru deze: </span>
              <span className="spec-value">{car?.transmission}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Kuro tipas: </span>
              <span className="spec-value">{car?.fuelType}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Sedimu vietu: </span>
              <span className="spec-value">{car?.seats}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Kaina per diena: </span>
              <span className="spec-value">
                ${car?.price ?? 'Ivyko klaida'}
              </span>
            </div>
          </div>
          <div className="car-actions">
            <button
              className="button button-primary"
              onClick={handleReserveClick}
            >
              Rezervuoti
            </button>
            <button
              className="button button-secondary"
              onClick={handleBackClick}
            >
              Grizti i pagrindini
            </button>
          </div>
        </div>
      </div>
      {isReservationModalVisible && car && (
        <ReservationModal
          onModalClose={() => setIsReservationModalVisible(false)}
          car={car}
        />
      )}
    </div>
  );
};
