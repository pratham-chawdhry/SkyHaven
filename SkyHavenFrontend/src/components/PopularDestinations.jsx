import React from 'react';
import { destinations } from './data/destination';

const PopularDestinations = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {destinations.map((destination) => (
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={destination.image}
                alt={`${destination.city}, ${destination.country}`}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{destination.city}</h3>
                  <p className="text-sm text-gray-200">{destination.country}</p>
                  <p className="text-sm font-semibold mt-1 text-blue-400">{destination.price}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;