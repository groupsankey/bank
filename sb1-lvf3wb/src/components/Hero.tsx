import React from 'react';
import { MapPin, Star, Users } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1533293046890-f1ab67e1b07e?auto=format&fit=crop&q=80)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          filter: 'brightness(0.7)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your Perfect Spot
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200">
            Rate and explore the best benches, bars, and local cuisine in your area.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: MapPin, title: 'Find Benches', description: 'Discover peaceful spots with amazing views' },
              { icon: Star, title: 'Rate Places', description: 'Share your experiences with the community' },
              { icon: Users, title: 'Connect', description: 'Join others who appreciate quality spaces' },
            ].map(({ icon: Icon, title, description }) => (
              <div 
                key={title}
                className="backdrop-blur-md bg-white/10 rounded-xl p-6 transform transition-transform hover:scale-105"
              >
                <div className="flex justify-center mb-4">
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-200">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}