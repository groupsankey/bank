import React, { useState } from 'react';
import { UtensilsCrossed, Search, Heart } from 'lucide-react';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  specialties: string[];
  image: string;
}

export default function FoodFinderApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [restaurants] = useState<Restaurant[]>([
    {
      id: 1,
      name: "Hidden Sushi Gem",
      cuisine: "Japanese",
      rating: 4.7,
      specialties: ["Omakase", "Fresh Uni"],
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80"
    }
  ]);

  return (
    <div className="pt-16 min-h-screen bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for cuisines, dishes, or restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <Search className="absolute right-3 top-3 text-gray-400" size={24} />
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map(restaurant => (
            <div key={restaurant.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white">
                  <Heart className="text-red-500" size={20} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                <p className="text-gray-600">{restaurant.cuisine}</p>
                <div className="flex items-center mt-2">
                  <UtensilsCrossed className="text-orange-500 mr-2" size={16} />
                  <span>{restaurant.rating}/5</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {restaurant.specialties.map(specialty => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}