import React from 'react';
import { Beer, Star, MessageCircle } from 'lucide-react';

export default function BarHopper() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Bar Hopper Experience</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-xl overflow-hidden shadow-xl order-2 md:order-1">
            <img 
              src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80"
              alt="Cozy bar atmosphere"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-amber-900/50 rounded-lg">
                  <Beer className="text-amber-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Drink Recommendations</h3>
                  <p className="text-gray-400">Get personalized drink suggestions from our virtual mixologist.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-amber-900/50 rounded-lg">
                  <Star className="text-amber-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Rate & Review</h3>
                  <p className="text-gray-400">Share your experiences and discover top-rated venues.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-amber-900/50 rounded-lg">
                  <MessageCircle className="text-amber-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Community Insights</h3>
                  <p className="text-gray-400">Connect with fellow bar enthusiasts and share recommendations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}