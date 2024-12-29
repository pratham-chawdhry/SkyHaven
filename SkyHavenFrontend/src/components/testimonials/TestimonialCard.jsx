import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ name, location, text, rating, image }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">{location}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-600">{text}</p>
    </div>
  );
};

export default TestimonialCard;
