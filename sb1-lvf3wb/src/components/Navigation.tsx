import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Beer, UtensilsCrossed } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navItems = [
    { icon: MapPin, label: 'Bench Finder', href: '/bench-finder' },
    { icon: Beer, label: 'Bar Hopper', href: '/bar-hopper' },
    { icon: UtensilsCrossed, label: 'Food Finder', href: '/food-finder' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isHome ? 'bg-transparent' : 'bg-white shadow-md'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            <span className={`bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
              Bench Finder
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navItems.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                to={href}
                className={`flex items-center space-x-2 p-2 transition-colors duration-200
                  ${isHome ? 'text-white hover:text-gray-200' : 'text-gray-800 hover:text-gray-600'}`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}