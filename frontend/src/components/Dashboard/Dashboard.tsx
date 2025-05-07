import { useContext, useState, useEffect } from 'react';
import './dashboard.css';
import { AuthContext } from '../../context/AuthContext';
import { AccountInfo } from './components/AccountInfo';
import { ReservationList } from './components/ReservationList';
import axios from 'axios';
import { API_URL } from '../../constants/global';
import { Reservation } from '../../types/ReservationTypes';

// Kaip atvaizduoti Rezervacijas Dashboarde:
// 0. Susikuriame API interface
// 1. Pasifetchinam rezervacijas su useEffect ir access token (?)
// 2. Perduodam rezervacijas i ReservationList komponenta (?)
// 3. ReservationList komponentas atvaizduoja rezervacijas

export const Dashboard = () => {
  const { user, access_token } = useContext(AuthContext);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // fetch paduodant access token:
  const fetchReservations = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      const response = await axios.get<Reservation[]>(
        `${API_URL}/reservations`,
        config
      );
      setReservations(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        error.response?.data.error || 'Ivyko klaida gaunant rezervacijas';
      }
    }
  };

  useEffect(() => {
    if (access_token) {
      fetchReservations();
    }
  }, [access_token]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="welcome-text">Welcome back, {user?.name}!</p>
      </div>

      <div className="dashboard-content">
        <AccountInfo user={user} />
        <ReservationList reservations={reservations} />
      </div>
    </div>
  );
};
