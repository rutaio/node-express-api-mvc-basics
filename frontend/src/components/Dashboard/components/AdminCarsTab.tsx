import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../constants/global';
import { Car } from '../../../types/CarTypes';
import { AdminAddCarModal } from './AdminAddCarModal';
import { AuthContext } from '../../../context/AuthContext';

export const AdminCarsTab = () => {
  const { access_token } = useContext(AuthContext);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // GET request:
  const fetchCars = async () => {
    try {
      const response = await axios.get(`${API_URL}/cars`);
      setCars(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCarSubmit = async (formData: Car) => {
    if (!access_token) {
      alert('You are not authorized to perform this action.');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    try {
      // PATCH request:
      if (selectedCar) {
        await axios.patch(
          `${API_URL}/cars/${selectedCar._id}`,
          formData,
          config
        );
      } else {
        // POST request:
        await axios.post(`${API_URL}/cars`, formData, config);
      }

      setIsModalOpen(false);
      fetchCars();
    } catch (error) {
      console.log(error);
      alert('Failed to add a car');
    }
  };

  const handleEditCar = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  // DELETE request:
  const handleDeleteCar = async (_id: string) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this car and reservations associated with it?'
    );

    if (!confirm) {
      return;
    }

    if (!access_token) {
      alert('You are not authorized to perform this action.');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    try {
      await axios.delete(`${API_URL}/cars/${_id}`, config);
      setCars(cars.filter((car) => car._id !== _id));
    } catch (error) {
      console.error('Error in deleting todo:', error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="admin-tab">
      <div className="admin-header">
        <h2>Car Management</h2>
        <button className="btn" onClick={() => setIsModalOpen(true)}>
          Add New Car
        </button>
      </div>

      {isLoading ? (
        <p>Is loading...</p>
      ) : (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Price/day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td>
                  <img src={car.image} alt={car.make} className="car-image" />
                </td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.price}€</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleEditCar(car)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteCar(car._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <AdminAddCarModal
          onModalClose={() => {
            setIsModalOpen(false);
            setSelectedCar(null);
          }}
          onSubmit={handleCarSubmit}
          selectedCar={selectedCar}
        />
      )}
    </div>
  );
};
