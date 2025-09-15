import React, { useCallback, useState } from 'react';
import type { UploadedImage } from '../types';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  onImageSelect: (image: UploadedImage) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [isDragging, setIsDragging] = useState(false);

  const fileToBase64 = useCallback((file: File): Promise<UploadedImage> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const base64Data = dataUrl.split(',')[1];
        resolve({ data: base64Data, mimeType: file.type, dataUrl: dataUrl });
      };
      reader.onerror = (error) => reject(error);
    });
  }, []);

  const handleFileChange = useCallback(async (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      const image = await fileToBase64(file);
      onImageSelect(image);
    }
  }, [fileToBase64, onImageSelect]);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  return (
    <div className="bg-slate-800 p-10 rounded-2xl shadow-sm border border-slate-700 text-center">
      <h2 className="text-3xl font-bold text-slate-100 mb-2">Generate Your Professional Headshot</h2>
      <p className="text-slate-400 mb-8">Upload a photo and let our AI create a polished, studio-quality portrait.</p>
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        className={`relative border-2 border-dashed border-slate-600 rounded-xl p-12 flex flex-col items-center justify-center transition-all duration-300 ${isDragging ? 'border-blue-500 bg-slate-700' : 'bg-slate-900/50'}`}
      >
        <UploadIcon className="w-12 h-12 text-slate-500 mb-4" />
        <p className="text-slate-300 font-semibold">Drag & drop your photo here</p>
        <p className="text-slate-400 text-sm mt-1">or</p>
        <label
          htmlFor="file-upload"
          className="mt-4 cursor-pointer bg-blue-600 text-white font-semibold py-2.5 px-5 rounded-lg shadow-sm hover:bg-blue-700 transition-colors duration-300"
        >
          Browse Files
        </label>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          accept="image/png, image/jpeg, image/webp"
          onChange={(e) => handleFileChange(e.target.files)}
        />
      </div>
       <div className="mt-8 text-sm text-slate-400">
        <p className="font-semibold">Photo Tips for Best Results:</p>
        <ul className="list-disc list-inside text-left max-w-md mx-auto mt-2 space-y-1">
            <li>Use a high-resolution, well-lit image.</li>
            <li>Ensure your face is clearly visible and looking towards the camera.</li>
            <li>A simple background is preferred but not required.</li>
        </ul>
       </div>
    </div>
  );
};