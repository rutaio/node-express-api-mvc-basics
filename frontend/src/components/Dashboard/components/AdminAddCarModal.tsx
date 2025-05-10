import '../../ReservationModal/reservation-modal.css';
import { useState } from 'react';
import { Car } from '../../../types/CarTypes';

interface AdminAddCarModalProps {
  onModalClose: () => void;
  onSubmit: (formData: Car) => void;
}

export const AdminAddCarModal = ({
  onModalClose,
  onSubmit,
}: AdminAddCarModalProps) => {
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(30);
  const [features, setFeatures] = useState<string[]>([]);
  const [transmission, setTransmission] = useState<string>('manual');
  const [fuelType, setFuelType] = useState<string>('petrol');
  const [seats, setSeats] = useState<number>(2);
  const [year, setYear] = useState<number>(2000);
  const [image, setImage] = useState<string>('');

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFeatures(value.split(',').map((item) => item.trim()));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      make,
      model,
      description,
      price,
      features,
      transmission,
      fuelType,
      seats,
      year,
      image,
    };

    onSubmit(formData);
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <span className="close" onClick={onModalClose}>
            x
          </span>
          <h2>Add New Car</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="make">Make:</label>
              <input
                type="text"
                id="make"
                value={make}
                required
                onChange={(e) => setMake(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="model">Model:</label>
              <input
                type="text"
                id="model"
                value={model}
                required
                onChange={(e) => setModel(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                rows={3}
                id="description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price per day in euros:</label>
              <input
                type="number"
                id="price"
                value={price}
                required
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="features">Features (comma separated):</label>
              <input
                type="text"
                id="features"
                value={features.join(',')}
                required
                onChange={handleFeaturesChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="transmission">Transmission:</label>
              <select
                id="transmission"
                required
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
              >
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="fuel-type">Fuel type:</label>
              <select
                id="fuel-type"
                value={fuelType}
                required
                onChange={(e) => setFuelType(e.target.value)}
              >
                <option value="petrol">Petrol</option>
                <option value="gas">Gas</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="seats">Seats:</label>
              <input
                type="number"
                id="seats"
                value={seats}
                required
                onChange={(e) => setSeats(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="year">Year:</label>
              <input
                type="number"
                id="year"
                value={year}
                required
                onChange={(e) => setYear(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image as a link:</label>
              <input
                type="text"
                id="image"
                value={image}
                required
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button type="submit">Add Car</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
