import React, { useState } from 'react';
import { Users2, Plus, X, Copy, Check } from 'lucide-react';

interface Friend {
  email: string;
  share: number;
}

interface CreateGroupProps {
  totalAmount: number;
  onClose: () => void;
}

export default function CreateGroup({ totalAmount, onClose }: CreateGroupProps) {
  const [friends, setFriends] = useState<Friend[]>([{ email: '', share: 0 }]);
  const [copied, setCopied] = useState(false);

  const addFriend = () => {
    setFriends([...friends, { email: '', share: 0 }]);
  };

  const removeFriend = (index: number) => {
    setFriends(friends.filter((_, i) => i !== index));
  };

  const updateFriend = (index: number, field: keyof Friend, value: string | number) => {
    const newFriends = [...friends];
    newFriends[index] = { ...newFriends[index], [field]: value };
    setFriends(newFriends);
  };

  const calculateShare = () => {
    const equalShare = Math.round(totalAmount / (friends.length + 1));
    return friends.map(friend => ({
      ...friend,
      share: equalShare
    }));
  };

  const splitEqually = () => {
    setFriends(calculateShare());
  };

  const getPaymentLink = () => {
    const baseUrl = window.location.origin;
    const groupId = Math.random().toString(36).substr(2, 9);
    return `${baseUrl}/group-payment/${groupId}`;
  };

  const copyLink = () => {
    navigator.clipboard.writeText(getPaymentLink());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl w-full max-w-lg p-6 relative border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Users2 className="text-purple-400" />
            <h2 className="text-xl font-semibold text-gray-100">Create Group</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 absolute top-4 right-4"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center text-gray-300">
            <p>Total Amount</p>
            <p className="font-semibold">₹{totalAmount}</p>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="flex justify-between items-center mb-4 text-gray-300">
              <p className="font-medium">Your Share</p>
              <p className="font-medium">₹{Math.round(totalAmount / (friends.length + 1))}</p>
            </div>

            {friends.map((friend, index) => (
              <div key={index} className="flex gap-3 mb-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={friend.email}
                    onChange={(e) => updateFriend(index, 'email', e.target.value)}
                    placeholder="Friend's email"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                  />
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    value={friend.share || ''}
                    onChange={(e) => updateFriend(index, 'share', parseInt(e.target.value))}
                    placeholder="Share"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                  />
                </div>
                <button
                  onClick={() => removeFriend(index)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={addFriend}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
            >
              <Plus size={16} />
              Add Friend
            </button>
            <button
              onClick={splitEqually}
              className="text-purple-400 hover:text-purple-300"
            >
              Split Equally
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={copyLink}
            className="w-full flex items-center justify-center gap-2 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            {copied ? (
              <>
                <Check size={16} />
                Link Copied!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy Payment Link
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="w-full border border-gray-700 text-gray-300 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}