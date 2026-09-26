import { Star } from 'lucide-react';

const StarRating = ({ rating = 0, max = 5, size = 'sm', interactive = false, onChange }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          className={`${sizes[size]} transition-colors ${
            i < Math.round(rating) ? 'text-accent-500 fill-accent-500' : 'text-charcoal-300'
          } ${interactive ? 'cursor-pointer hover:text-accent-400' : ''}`}
          onClick={() => interactive && onChange?.(i + 1)}
        />
      ))}
    </div>
  );
};

export default StarRating;
