import { ReservationItem } from './ReservationItem';
import { Reservation } from '../../../types/ReservationTypes';

interface ReservationListProps {
  reservations: Reservation[];
}

export const ReservationList = ({ reservations }: ReservationListProps) => {
  return (
    <div className="dashboard-card reservations-card">
      <h3>Your Reservations:</h3>
      <div className="reservations-list">
        {reservations.map((reservation) => (
          <ReservationItem key={reservation._id} reservation={reservation} />
        ))}
      </div>
    </div>
  );
};
