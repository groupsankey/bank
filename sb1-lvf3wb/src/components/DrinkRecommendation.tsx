import React from 'react';
import { Beaker, Clock, Info } from 'lucide-react';
import type { DrinkRecommendation } from '../services/gemini';

interface Props {
  recommendation: DrinkRecommendation;
}

export default function DrinkRecommendation({ recommendation }: Props) {
  const { name, description, story, ingredients } = recommendation;

  return (
    <div className="bg-gray-800 rounded-xl p-6 space-y-4">
      <h3 className="text-2xl font-bold text-white">{name}</h3>
      
      <div className="flex items-start space-x-3">
        <Info className="text-blue-400 mt-1" size={20} />
        <p className="text-gray-300">{description}</p>
      </div>

      <div className="flex items-start space-x-3">
        <Clock className="text-purple-400 mt-1" size={20} />
        <p className="text-gray-300">{story}</p>
      </div>

      <div className="flex items-start space-x-3">
        <Beaker className="text-green-400 mt-1" size={20} />
        <div>
          <h4 className="text-white font-semibold mb-2">Ingredients:</h4>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}