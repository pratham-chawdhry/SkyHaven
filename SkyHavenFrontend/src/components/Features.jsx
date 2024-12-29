import React from 'react';
import { Shield, Clock, Wallet } from 'lucide-react';

const Features = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
        <Wallet className="w-10 h-10 text-blue-600 mb-4" />
        <h3 className="text-xl font-semibold mb-3">Best Prices</h3>
        <p className="text-gray-600">Find the most competitive prices for your flights with our best price guarantee.</p>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
        <Clock className="w-10 h-10 text-blue-600 mb-4" />
        <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
        <p className="text-gray-600">Our dedicated customer service team is always here to help you, anytime, anywhere.</p>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
        <Shield className="w-10 h-10 text-blue-600 mb-4" />
        <h3 className="text-xl font-semibold mb-3">Flexible Booking</h3>
        <p className="text-gray-600">Change or cancel your flights with ease. Your travel plans are protected with us.</p>
      </div>
    </div>
  );
};

export default Features;