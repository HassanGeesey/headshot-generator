import React from 'react';
import { CameraIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
        <CameraIcon className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-slate-50">
          AI Headshot Generator
        </h1>
      </div>
    </header>
  );
};