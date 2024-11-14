import React, { useState } from 'react';

interface PaymentFormsProps {
  method: string;
  onSubmit: () => void;
}

export default function PaymentForms({ method, onSubmit }: PaymentFormsProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bank, setBank] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const inputClassName = "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-400";
  const labelClassName = "block text-sm font-medium text-gray-300 mb-1";
  const buttonClassName = "w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors";
  const selectClassName = "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100";
  const walletButtonClassName = "p-4 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors text-center text-gray-300";

  const renderCreditDebitForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClassName}>Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
          className={inputClassName}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClassName}>Expiry Date</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            className={inputClassName}
            required
          />
        </div>
        <div>
          <label className={labelClassName}>CVV</label>
          <input
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            maxLength={3}
            className={inputClassName}
            required
          />
        </div>
      </div>
      <button type="submit" className={buttonClassName}>Pay Now</button>
    </form>
  );

  const renderUPIForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClassName}>UPI ID</label>
        <input
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          placeholder="username@upi"
          className={inputClassName}
          required
        />
      </div>
      <button type="submit" className={buttonClassName}>Pay Now</button>
    </form>
  );

  const renderNetBankingForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClassName}>Select Bank</label>
        <select
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          className={selectClassName}
          required
        >
          <option value="">Select a bank</option>
          <option value="sbi">State Bank of India</option>
          <option value="hdfc">HDFC Bank</option>
          <option value="icici">ICICI Bank</option>
          <option value="axis">Axis Bank</option>
        </select>
      </div>
      <button type="submit" className={buttonClassName}>Pay Now</button>
    </form>
  );

  const renderWalletsForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {['Paytm', 'PhonePe', 'Amazon Pay', 'Google Pay'].map((wallet) => (
          <button
            key={wallet}
            type="submit"
            className={walletButtonClassName}
          >
            {wallet}
          </button>
        ))}
      </div>
    </form>
  );

  switch (method) {
    case 'credit':
    case 'debit':
      return renderCreditDebitForm();
    case 'upi':
      return renderUPIForm();
    case 'netbanking':
      return renderNetBankingForm();
    case 'wallet':
      return renderWalletsForm();
    default:
      return null;
  }
}