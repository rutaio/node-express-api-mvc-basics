import { useEffect, useState } from 'react';
import axios from 'axios';
import './review-page.css';
import { ReviewCard } from '../../components/ReviewCard/ReviewCard';
import { Review } from '../../types/ReviewTypes';
import { API_URL } from '../../constants/global';
import { ReviewModal } from '../../components/ReviewModal/ReviewModal';

export const ReviewPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // uzkrauna duomenis kai pasileidzia sis puslapis:
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <>
      <div className="hero">
        <h1>Techno Car Atsiliepimai</h1>
        <p>Skaitykite, ką sako mūsų vartotojai apie mūsų automobilius.</p>
        <button
          className="add-review-button"
          onClick={() => setIsModalVisible(true)}
        >
          Palikite Atsiliepima
        </button>
      </div>
      <div className="section">
        <h2>Naujausi atsiliepimai</h2>

        <div className="reviews-list">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
      {isModalVisible && (
        <ReviewModal onModalClose={() => setIsModalVisible(false)} />
      )}
    </>
  );
};
