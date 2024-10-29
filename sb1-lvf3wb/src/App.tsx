import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import BenchFinderApp from './pages/BenchFinderApp';
import BarHopperApp from './pages/BarHopperApp';
import FoodFinderApp from './pages/FoodFinderApp';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bench-finder/*" element={<BenchFinderApp />} />
          <Route path="/bar-hopper/*" element={<BarHopperApp />} />
          <Route path="/food-finder/*" element={<FoodFinderApp />} />
        </Routes>
      </div>
    </Router>
  );
}