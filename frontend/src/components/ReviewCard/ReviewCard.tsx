import { useNavigate } from 'react-router-dom';
import { Review } from '../../types/ReviewTypes';
import './review-card.css';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const navigate = useNavigate();

  const handleReviewClick = () => {
    navigate(`/reviews/${review.id}`);
  };

  return (
    <div className="review-card" onClick={handleReviewClick}>
      <div className="review-card-content">
        <p>{review.description}</p>
        <h6>{review.name}</h6>
      </div>
    </div>
  );
};
