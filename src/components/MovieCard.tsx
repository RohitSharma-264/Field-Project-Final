import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  title: string;
  image: string;
  rating: number;
  languages: string[];
}

export default function MovieCard({ title, image, rating, languages }: MovieCardProps) {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/movie/${encodeURIComponent(title)}`);
  };

  return (
    <div className="group cursor-pointer bg-gray-800 rounded-lg overflow-hidden" onClick={handleBookClick}>
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-[360px] object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <div className="flex items-center gap-2">
            <span className="bg-black/80 text-green-400 px-2 py-0.5 rounded text-sm">
              {rating}★
            </span>
            <span className="text-gray-200 text-sm">
              {languages.join(", ")}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg text-gray-100">{title}</h3>
      </div>
    </div>
  );
}