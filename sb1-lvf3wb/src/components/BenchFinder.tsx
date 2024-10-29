import React from 'react';
import { MapPin, ThumbsUp, Camera } from 'lucide-react';

export default function BenchFinder() {
  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Find Your Perfect Bench</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <MapPin className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Location Rating</h3>
                  <p className="text-gray-600">Rate benches based on their location, view, and surroundings.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <ThumbsUp className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Comfort Score</h3>
                  <p className="text-gray-600">Evaluate bench comfort, condition, and accessibility.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Camera className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Share Memories</h3>
                  <p className="text-gray-600">Capture and share your favorite moments at each location.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80"
              alt="Peaceful bench in nature"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}