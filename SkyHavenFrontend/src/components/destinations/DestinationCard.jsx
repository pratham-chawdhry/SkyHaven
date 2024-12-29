import React from 'react';

const DestinationCard = ({ city, country, image, price }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={image}
          alt={`${city}, ${country}`}
          className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-semibold">{city}</h3>
            <p className="text-sm text-gray-200">{country}</p>
            <p className="text-sm font-semibold mt-1 text-blue-400">{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
