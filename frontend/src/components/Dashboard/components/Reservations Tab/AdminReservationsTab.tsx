import axios from 'axios';
import { API_URL } from '../../../../constants/global';
import { useState, useEffect } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { useContext } from 'react';
import { AllReservations } from '../../../../types/ReservationTypes';
import { formatDate } from '../../../../utlis/date';

export const AdminReservationsTab = () => {
  const { access_token } = useContext(AuthContext);
  const [reservations, setReservations] = useState<AllReservations[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      const response = await axios.get<AllReservations[]>(
        `${API_URL}/reservations/all`,
        config
      );
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (access_token) {
      fetchReservations();
    }
  }, [access_token]);

  return (
    <div className="admin-tab">
      <h2>All Reservations</h2>

      {isLoading ? (
        <p>Is loading...</p>
      ) : (
        <table className="primary-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Car</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Price</th>
              <th>Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.user.email}</td>
                <td>
                  <div className="car-details">
                    <img
                      src={reservation.car.image}
                      alt="car image"
                      className="car-image"
                    ></img>
                    <div>
                      {' '}
                      {reservation.car.make} {reservation.car.model}
                    </div>
                  </div>
                </td>
                <td>{formatDate(reservation.startDate)}</td>
                <td>{formatDate(reservation.endDate)}</td>
                <td>{reservation.totalPrice}€</td>
                <td>{formatDate(reservation.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
