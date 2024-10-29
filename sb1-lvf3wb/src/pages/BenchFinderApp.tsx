import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, ThumbsUp, Camera } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface Bench {
  id: number;
  location: [number, number];
  name: string;
  rating: number;
  comfort: number;
  accessibility: number;
  memories: string[];
}

export default function BenchFinderApp() {
  const [benches] = useState<Bench[]>([
    {
      id: 1,
      location: [51.505, -0.09],
      name: "Hyde Park Corner",
      rating: 4.5,
      comfort: 4,
      accessibility: 5,
      memories: ["Perfect sunset spot!", "Great for reading"]
    }
  ]);

  return (
    <div className="pt-16 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="p-4 bg-white shadow-lg overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Nearby Benches</h2>
          {benches.map(bench => (
            <div key={bench.id} className="p-4 border rounded-lg mb-4">
              <h3 className="font-semibold">{bench.name}</h3>
              <div className="flex items-center mt-2">
                <ThumbsUp className="text-blue-500 mr-2" size={16} />
                <span>{bench.rating}/5</span>
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="col-span-2 relative">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {benches.map(bench => (
              <Marker key={bench.id} position={bench.location}>
                <Popup>
                  <div>
                    <h3 className="font-semibold">{bench.name}</h3>
                    <p>Rating: {bench.rating}/5</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}