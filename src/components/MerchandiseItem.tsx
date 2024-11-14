import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface MerchandiseItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
  onQuantityChange: (id: number, quantity: number) => void;
}

export default function MerchandiseItem({
  id,
  name,
  price,
  image,
  description,
  quantity,
  onQuantityChange
}: MerchandiseItemProps) {
  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/50">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-100">{name}</h3>
        <p className="text-sm text-gray-400 mb-3">{description}</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-100">₹{price}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuantityChange(id, Math.max(0, quantity - 1))}
              className="p-1 rounded-full hover:bg-gray-700 text-gray-300"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center text-gray-100">{quantity}</span>
            <button
              onClick={() => onQuantityChange(id, quantity + 1)}
              className="p-1 rounded-full hover:bg-gray-700 text-gray-300"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}