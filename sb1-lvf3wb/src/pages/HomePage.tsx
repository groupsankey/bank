import React from 'react';
import Hero from '../components/Hero';
import BenchFinder from '../components/BenchFinder';
import BarHopper from '../components/BarHopper';
import FoodFinder from '../components/FoodFinder';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <section id="bench-finder">
        <BenchFinder />
      </section>
      <section id="bar-hopper">
        <BarHopper />
      </section>
      <section id="food-finder">
        <FoodFinder />
      </section>
    </main>
  );
}