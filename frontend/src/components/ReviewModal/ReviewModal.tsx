import './review-modal.css';
import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '../../constants/global';

// susikuriame papildoma propsa onSuccess:
interface ReviewModalProps {
  onModalClose: () => void;
  onSuccess: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  onModalClose,
  onSuccess,
}) => {
  // issitraukiu tai, ka zmogus nori issiust kaip review:
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [rating, setRating] = useState<number | null>(0);
  const [error, setError] = useState<string | null>(null);

  // siunciu duomenis:
  const handleFormSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();
    // siuncia request:
    try {
      await axios.post(`${API_URL}/reviews`, {
        name,
        description,
        rating,
      });
      // jei request yra sekmingas, iskvieciam funkcija is tevinio elemento ReviewPage:
      onModalClose();
      // kai forma sekmingai issiusta, iskvieciu papildoma propsa:
      onSuccess();
      setError(null);
    } catch (error) {
      // idedame atejusi error:
      if (axios.isAxiosError(error)) {
        // einu gilyn per objektus:
        const errorMessage = error.response?.data?.error || 'Ivyko klaida';
        setError(errorMessage);
      }
    }
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
              //  required
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Atsiliepimas</label>
              <textarea
                id="description"
                rows={4}
             //   required
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Ivertinimas</label>
              <input
                type="number"
                id="rating"
                placeholder="nuo 1 iki 5"
              //  required
                onChange={(event) => setRating(Number(event.target.value))}
              />
            </div>

            {error && <div className="error-container">{error}</div>}

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
