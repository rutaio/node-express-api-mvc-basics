import { Reservation } from '../../../types/ReservationTypes';

interface ReservationItemProps {
  reservation: Reservation | null;
}

export const ReservationItem = ({ reservation }: ReservationItemProps) => {
  return (
    <div className="reservation-item">
      <div className="reservation-car-info">
        <h4>
          {reservation?.car.make} {reservation?.car.model}
        </h4>
        <p>Seats: {reservation?.car.seats}</p>
        <img
          src={reservation?.car.image}
          alt="car"
          className="reservation-car-image"
        />
      </div>

      <div className="reservation-details">
        <p>
          <strong>From:</strong> {reservation?.startDate}
        </p>
        <p>
          <strong>To:</strong> {reservation?.endDate}
        </p>
        <p>
          <strong>Total price:</strong> {reservation?.totalPrice}€
        </p>
        <p>
          <strong>Booked on:</strong> {reservation?.createdAt}
        </p>
      </div>
      <div className="reservation-actions">
        <button className="delete-button">Cancel</button>
      </div>
    </div>
  );
};
