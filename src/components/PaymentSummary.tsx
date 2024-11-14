import React, { useState } from 'react';
import { CreditCard, Tag, X, Info } from 'lucide-react';

interface PaymentSummaryProps {
  movieTitle: string;
  theatreName: string;
  selectedDate: string;
  selectedTime: string;
  selectedSeats: string[];
  ticketPrice: number;
  addOnsTotal: number;
  onBack: () => void;
  onContinue: (couponCode: string) => void;
}

const AVAILABLE_COUPONS = [
  {
    code: 'FIRST50',
    description: 'Get ₹50 off on your first booking',
    discount: 50
  },
  {
    code: 'MOVIEMANIA',
    description: 'Special weekend offer - ₹150 off',
    discount: 150
  }
];

export default function PaymentSummary({
  movieTitle,
  theatreName,
  selectedDate,
  selectedTime,
  selectedSeats,
  ticketPrice,
  addOnsTotal,
  onBack,
  onContinue
}: PaymentSummaryProps) {
  const [couponCode, setCouponCode] = useState('');
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [showAvailableCoupons, setShowAvailableCoupons] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = selectedSeats.length * ticketPrice;
  const convenienceFee = selectedSeats.length * 25;
  const total = subtotal + addOnsTotal + convenienceFee - discount;

  const handleApplyCoupon = (code: string = couponCode) => {
    const coupon = AVAILABLE_COUPONS.find(c => c.code === code);
    if (coupon) {
      setDiscount(coupon.discount);
      setAppliedCoupon(code);
      setShowCouponInput(false);
      setShowAvailableCoupons(false);
    }
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setAppliedCoupon('');
    setCouponCode('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={onBack}
          className="text-purple-400 hover:text-purple-300 font-medium"
        >
          Back to Add-ons
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-700">
        <div className="flex items-center gap-2 mb-6">
          <CreditCard className="text-purple-400" />
          <h2 className="text-xl font-semibold text-gray-100">Payment Summary</h2>
        </div>

        <div className="border-b border-gray-700 pb-4 mb-4">
          <h3 className="font-semibold mb-2 text-gray-100">Booking Details</h3>
          <div className="text-sm space-y-2 text-gray-400">
            <p>Movie: {movieTitle}</p>
            <p>Theatre: {theatreName}</p>
            <p>Date: {selectedDate}</p>
            <p>Time: {selectedTime}</p>
            <p>Seats: {selectedSeats.join(", ")}</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-gray-300">
            <span>Tickets ({selectedSeats.length} × ₹{ticketPrice})</span>
            <span>₹{subtotal}</span>
          </div>
          {addOnsTotal > 0 && (
            <div className="flex justify-between text-gray-300">
              <span>Add-ons Total</span>
              <span>₹{addOnsTotal}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-300">
            <span>Convenience Fee</span>
            <span>₹{convenienceFee}</span>
          </div>
          
          {!showCouponInput && !appliedCoupon && (
            <button
              onClick={() => {
                setShowCouponInput(true);
                setShowAvailableCoupons(true);
              }}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
            >
              <Tag size={16} />
              Apply Coupon
            </button>
          )}

          {showCouponInput && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                />
                <button
                  onClick={() => handleApplyCoupon()}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  Apply
                </button>
              </div>

              {showAvailableCoupons && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Info size={14} />
                    <span>Available Coupons</span>
                  </div>
                  {AVAILABLE_COUPONS.map(coupon => (
                    <div
                      key={coupon.code}
                      className="p-3 border border-gray-700 rounded-lg hover:bg-gray-700/50 cursor-pointer"
                      onClick={() => handleApplyCoupon(coupon.code)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-purple-400">{coupon.code}</span>
                        <span className="text-green-400">-₹{coupon.discount}</span>
                      </div>
                      <p className="text-sm text-gray-400">{coupon.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {appliedCoupon && (
            <div className="flex justify-between items-center bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
              <div>
                <span className="text-purple-400 font-medium">{appliedCoupon}</span>
                <span className="text-purple-400 ml-2">-₹{discount}</span>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="text-gray-400 hover:text-gray-300"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="border-t border-gray-700 pt-4 flex justify-between font-bold text-gray-100">
            <span>Total Amount</span>
            <span>₹{total}</span>
          </div>
        </div>

        <button
          onClick={() => onContinue(appliedCoupon)}
          className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}