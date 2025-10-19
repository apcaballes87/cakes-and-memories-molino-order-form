import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4 mb-6">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Cakes and Memories</h1>
          <p className="text-sm text-grayText">Molino Branch Order Form</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-grayText">For orders and inquiries:</p>
          <p className="font-semibold text-primary">0917 123 4567</p>
        </div>
      </div>
    </header>
  );
};