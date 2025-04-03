import { useEffect, useState } from 'react';
import axios from 'axios';
import './review-page.css';
import { ReviewCard } from '../../components/ReviewCard/ReviewCard';
import { Review } from '../../types/ReviewTypes';

export const ReviewPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/reviews');
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
        <p>Skaitykite, ka sako musu vartotojai apie musu automobilius.</p>
      </div>
      <div className="section">
        <h2>Naujausi atsiliepimai</h2>
        <div className="reviews-list">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
    </>
  );
};
