import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageViewer } from './components/ImageViewer';
import { generateHeadshot } from './services/geminiService';
import type { UploadedImage, Gender } from './types';
import { DownloadIcon, RedoIcon, SparklesIcon } from './components/Icons';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<UploadedImage | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [gender, setGender] = useState<Gender | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (image: UploadedImage) => {
    setOriginalImage(image);
    setGeneratedImage(null);
    setError(null);
    setGender(null);
  };

  const handleGenerate = useCallback(async () => {
    if (!originalImage || !gender) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const newImage = await generateHeadshot(originalImage.data, originalImage.mimeType, gender);
      setGeneratedImage(newImage);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, gender]);

  const reset = () => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setError(null);
    setIsLoading(false);
    setGender(null);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-6 sm:p-8 lg:p-12 flex flex-col items-center">
        {!originalImage ? (
          <div className="w-full max-w-2xl my-auto">
            <ImageUploader onImageSelect={handleImageSelect} />
          </div>
        ) : (
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <ImageViewer title="Original" imageUrl={originalImage.dataUrl} />
              <ImageViewer title="AI Headshot" imageUrl={generatedImage} isLoading={isLoading} />
            </div>

            <div className="mt-10 text-center">
              <p className="text-xl font-medium text-slate-100 mb-4">Step 1: Select a gender</p>
              <div className="flex justify-center items-center gap-4" role="group">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`px-8 py-3 w-48 font-semibold border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    gender === 'male'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600'
                  }`}
                >
                  Male (Add Suit)
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`px-8 py-3 w-48 font-semibold border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    gender === 'female'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600'
                  }`}
                >
                  Female (Keep Clothes)
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-8 text-center bg-red-900/50 border-l-4 border-red-500 text-red-300 p-4 rounded-md" role="alert">
                <p className="font-bold">Generation Failed</p>
                <p>{error}</p>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={handleGenerate}
                disabled={isLoading || !gender}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-sm hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <SparklesIcon className="w-5 h-5" />
                {isLoading ? 'Generating...' : 'Step 2: Generate Headshot'}
              </button>
              
              {generatedImage && (
                <a
                  href={generatedImage}
                  download="ai-headshot.png"
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-emerald-500 text-white font-semibold py-3 px-6 rounded-lg shadow-sm hover:bg-emerald-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <DownloadIcon className="w-5 h-5" />
                  Download
                </a>
              )}
            </div>
             <div className="mt-6 text-center">
               <button
                  onClick={reset}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-slate-400 font-semibold py-3 px-6 rounded-lg hover:bg-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                >
                  <RedoIcon className="w-5 h-5"/>
                  Start Over
                </button>
              </div>
          </div>
        )}
      </main>
      <footer className="text-center p-6 text-slate-400 text-sm">
        <p>Powered by Google Gemini. UI designed for a modern web experience.</p>
      </footer>
    </div>
  );
};

export default App;