import './reservation-modal.css';
import { Car } from '../../types/CarTypes';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { useNavigate } from 'react-router-dom';

interface ReservationModalProps {
  onModalClose: () => void;
  car: Car;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  onModalClose,
  car,
}) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // Gauname siandienos data:
  const today = new Date().toISOString().split('T')[0];
  // Pasiimame token is localStorage:
  const token = localStorage.getItem('access_token');

  // funkcija sius duomenis i backend:
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Skaiciuojame kiek dienu rezervuotis:
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differentInDays = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );

      await axios.post(
        `${API_URL}/reservations`,
        {
          totalDays: differentInDays,
          startDate: start.toISOString(),
          endDate: end.toISOString(),
          carId: car._id,
        },
        config
      );
      setError(null);
      navigate('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data.error || 'Ivyko klaida rezervacijos metu';
        setError(errorMessage);
      }
    }
  };

  // apskaiciuojame total price:
  // kai keisis datos, kaina bus perskaiciuojama automatiskai:
  // useEffect turi viena tiksla - stebeti konstantu pasikeitimus (startDate, endDate) ir paleisti koda is jo vidaus (kai kazkas pasikeis, atlikt ta darba)
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const differenceInTime = Math.abs(end.getTime() - start.getTime());
      const differenceInDays = Math.ceil(
        differenceInTime / (1000 * 60 * 60 * 24)
      );
      setTotalPrice(differenceInDays * car.price);
    }
  }, [startDate, endDate]);

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>
            Rezervuoti {car.make} {car.model}
          </h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="startDate">Pradzios data</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                min={today}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">Pabaigos data</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                min={startDate || today}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            <div className="booking-summary">
              <div className="price-info">
                <p>
                  Kaina per diena: <strong>{car.price}€</strong>
                </p>
                <p className="total-price">
                  Bendra kaina: <strong>{totalPrice}€</strong>
                </p>
              </div>
            </div>

            {error && <div className="error-container">{error}</div>}

            <div className="modal-actions">
              <button type="button" onClick={onModalClose}>
                Atsaukti
              </button>
              <button type="submit">Reservuoti</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
