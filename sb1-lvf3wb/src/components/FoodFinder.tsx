import React from 'react';
import { UtensilsCrossed, Search, Heart } from 'lucide-react';

export default function FoodFinder() {
  return (
    <div className="min-h-screen bg-orange-50 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Discover Local Cuisine</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <UtensilsCrossed className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Hidden Gems</h3>
                  <p className="text-gray-600">Discover unique local eateries and specialty dishes.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Search className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Smart Search</h3>
                  <p className="text-gray-600">Find exactly what you're craving with our intelligent filters.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Heart className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Favorites</h3>
                  <p className="text-gray-600">Save and organize your favorite food spots.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80"
              alt="Delicious local cuisine"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}