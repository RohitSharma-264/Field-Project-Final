import React, { useState } from 'react';
import { CheckCircle2, Calendar, Clock, MapPin, Ticket, Map, Users2, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CreateGroup from './CreateGroup';
import Carpooling from './Carpooling';

interface BookingConfirmationProps {
  movieTitle: string;
  theatreName: string;
  selectedDate: string;
  selectedTime: string;
  selectedSeats: string[];
  totalAmount: number;
  bookingId: string;
}

export default function BookingConfirmation({
  movieTitle,
  theatreName,
  selectedDate,
  selectedTime,
  selectedSeats,
  totalAmount,
  bookingId
}: BookingConfirmationProps) {
  const navigate = useNavigate();
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showCarpooling, setShowCarpooling] = useState(false);
  const encodedAddress = encodeURIComponent(theatreName);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-400">Your tickets have been booked successfully</p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-center gap-3">
              <Ticket className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Booking ID</p>
                <p className="font-medium text-gray-100">{bookingId}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-400">Theatre</p>
                <p className="font-medium text-gray-100">{theatreName}</p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm mt-1"
                >
                  <Map size={14} />
                  View on Google Maps
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Date</p>
                <p className="font-medium text-gray-100">{selectedDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Show Time</p>
                <p className="font-medium text-gray-100">{selectedTime}</p>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Seats</p>
                  <p className="font-medium text-gray-100">{selectedSeats.join(", ")}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Amount Paid</p>
                  <p className="font-medium text-gray-100">₹{totalAmount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {/* Add download ticket logic */}}
              className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Download Ticket
            </button>
            
            <button
              onClick={() => setShowGroupModal(true)}
              className="w-full flex items-center justify-center gap-2 border border-purple-500 text-purple-400 py-3 rounded-lg hover:bg-purple-500/10 transition-colors"
            >
              <Users2 size={18} />
              Split Payment with Friends
            </button>

            <button
              onClick={() => setShowCarpooling(true)}
              className="w-full flex items-center justify-center gap-2 border border-purple-500 text-purple-400 py-3 rounded-lg hover:bg-purple-500/10 transition-colors"
            >
              <Car size={18} />
              Find Carpool
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full border border-gray-700 text-gray-300 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {showGroupModal && (
        <CreateGroup
          totalAmount={totalAmount}
          onClose={() => setShowGroupModal(false)}
        />
      )}

      {showCarpooling && (
        <Carpooling
          theatreName={theatreName}
          showTime={`${selectedDate} ${selectedTime}`}
          onClose={() => setShowCarpooling(false)}
        />
      )}
    </>
  );
}