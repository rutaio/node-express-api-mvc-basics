import './review-modal.css';
import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '../../constants/global';
import { Review } from '../../types/ReviewTypes';

interface ReviewModalProps {
  onModalClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ onModalClose }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await axios.post(`${API_URL}/${review.id}`, {
      name,
      description,
      rating,
    });

    window.location.reload();
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Palikite atsiliepima</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Vardas ir Pavarde</label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Atsiliepimas</label>
              <textarea
                id="description"
                rows={4}
                required
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Ivertinimas</label>
              <input
                type="number"
                id="rating"
                placeholder="nuo 1 iki 5"
                required
                value={rating}
                onChange={(event) => setRating(Number(event.target.value))}
              />
            </div>

            <div className="modal-actions">
              <button type="button" onClick={onModalClose}>
                Atsaukti
              </button>
              <button type="submit">Pateikti</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
