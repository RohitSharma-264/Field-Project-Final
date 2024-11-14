import React from 'react';
import { MapPin, Calendar, Clock, CheckCircle2 } from 'lucide-react';

interface Theatre {
  id: number;
  name: string;
  price: number;
}

interface TheatreSelectionProps {
  theatres: Theatre[];
  showDates: string[];
  showTimes: string[];
  selectedTheatre: number | null;
  selectedDate: string;
  selectedTime: string;
  onTheatreSelect: (id: number) => void;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function TheatreSelection({
  theatres,
  showDates,
  showTimes,
  selectedTheatre,
  selectedDate,
  selectedTime,
  onTheatreSelect,
  onDateSelect,
  onTimeSelect,
  onContinue,
  onBack
}: TheatreSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="text-purple-400" />
            <h2 className="text-xl font-semibold text-gray-100">Select Theatre</h2>
          </div>
          <button
            onClick={onBack}
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Back to Movies
          </button>
        </div>
        <div className="space-y-4">
          {theatres.map(theatre => (
            <div
              key={theatre.id}
              onClick={() => onTheatreSelect(theatre.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedTheatre === theatre.id
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-700 hover:bg-gray-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-100">{theatre.name}</h3>
                  <p className="text-sm text-gray-400">₹{theatre.price} onwards</p>
                </div>
                {selectedTheatre === theatre.id && (
                  <CheckCircle2 className="text-purple-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTheatre && (
        <div className="bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="text-purple-400" />
            <h2 className="text-xl font-semibold text-gray-100">Select Date</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {showDates.map(date => (
              <button
                key={date}
                onClick={() => onDateSelect(date)}
                className={`px-6 py-3 rounded-lg whitespace-nowrap transition-colors ${
                  selectedDate === date
                    ? 'bg-purple-500 text-white'
                    : 'border border-gray-700 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && (
        <div className="bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="text-purple-400" />
            <h2 className="text-xl font-semibold text-gray-100">Select Time</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {showTimes.map(time => (
              <button
                key={time}
                onClick={() => onTimeSelect(time)}
                className={`px-4 py-2 rounded-lg text-center transition-colors ${
                  selectedTime === time
                    ? 'bg-purple-500 text-white'
                    : 'border border-gray-700 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedTime && (
        <button
          onClick={onContinue}
          className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors"
        >
          Continue to Seat Selection
        </button>
      )}
    </div>
  );
}