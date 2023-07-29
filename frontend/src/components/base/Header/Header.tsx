// components/Header.tsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-xl font-bold">Bookers2</h1>
          <nav>
            <ul className="flex space-x-4 text-white">
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
