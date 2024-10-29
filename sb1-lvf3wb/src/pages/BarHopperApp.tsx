import React, { useState } from 'react';
import { Beer, Star, MessageCircle, Loader2 } from 'lucide-react';
import { useVirtualMixologist } from '../hooks/useVirtualMixologist';
import DrinkRecommendation from '../components/DrinkRecommendation';

interface Drink {
  id: number;
  name: string;
  description: string;
  rating: number;
  reviews: string[];
}

export default function BarHopperApp() {
  const [selectedMood, setSelectedMood] = useState('');
  const { isLoading, error, recommendation, getRecommendation } = useVirtualMixologist();
  const [drinks] = useState<Drink[]>([
    {
      id: 1,
      name: "Classic Manhattan",
      description: "A sophisticated blend of whiskey, sweet vermouth, and bitters",
      rating: 4.8,
      reviews: ["Perfect balance!", "Best Manhattan in town"]
    }
  ]);

  const handleGetRecommendation = () => {
    if (selectedMood) {
      getRecommendation(selectedMood);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Virtual Mixologist */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Virtual Mixologist</h2>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-300">How are you feeling today?</span>
                  <select
                    value={selectedMood}
                    onChange={(e) => setSelectedMood(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  >
                    <option value="">Select your mood...</option>
                    <option value="happy">Celebratory</option>
                    <option value="relaxed">Relaxed</option>
                    <option value="adventurous">Adventurous</option>
                    <option value="contemplative">Contemplative</option>
                    <option value="stressed">Stressed</option>
                  </select>
                </label>
                <button 
                  className="btn btn-primary w-full disabled:opacity-50"
                  onClick={handleGetRecommendation}
                  disabled={isLoading || !selectedMood}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mr-2" size={20} />
                  ) : (
                    'Get Recommendation'
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/50 text-red-200 p-4 rounded-lg">
                {error}
              </div>
            )}

            {recommendation && <DrinkRecommendation recommendation={recommendation} />}
          </div>

          {/* Drink Reviews */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6">Top Rated Drinks</h2>
            <div className="space-y-4">
              {drinks.map(drink => (
                <div key={drink.id} className="border border-gray-700 rounded-lg p-4">
                  <h3 className="text-xl font-semibold">{drink.name}</h3>
                  <p className="text-gray-400 mt-2">{drink.description}</p>
                  <div className="flex items-center mt-3">
                    <Star className="text-yellow-400 mr-2" size={20} />
                    <span>{drink.rating}/5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}