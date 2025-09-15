import React from 'react';
import { Spinner } from './Spinner';
import { ImageIcon } from './Icons';

interface ImageViewerProps {
  title: string;
  imageUrl: string | null;
  isLoading?: boolean;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ title, imageUrl, isLoading = false }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-slate-200 mb-3 text-center">{title}</h3>
      <div className="relative w-full aspect-square bg-slate-800 rounded-2xl shadow-sm border border-slate-700 flex items-center justify-center overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-10 transition-opacity duration-300">
            <Spinner />
            <p className="text-white mt-4 font-medium text-lg">Generating your headshot...</p>
            <p className="text-white/80 mt-1 text-sm">This may take a moment.</p>
          </div>
        )}
        {!imageUrl && !isLoading && (
          <div className="text-center text-slate-500 p-4">
            <ImageIcon className="w-16 h-16 mx-auto" />
            <p className="mt-2 font-medium">Your AI Headshot will appear here</p>
          </div>
        )}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="object-contain w-full h-full"
          />
        )}
      </div>
    </div>
  );
};