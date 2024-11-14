import React, { useState } from 'react';
import { Search, Menu, User, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MovieGroups from './MovieGroups';

export default function Navbar() {
  const navigate = useNavigate();
  const [showGroups, setShowGroups] = useState(false);

  return (
    <>
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 
                onClick={() => navigate('/')} 
                className="text-2xl font-bold text-purple-500 cursor-pointer"
              >
                CineTix
              </h1>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for Movies, Events, Plays, Sports"
                  className="w-96 bg-gray-800 rounded-md py-1.5 pl-10 pr-4 text-sm border border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-gray-100"
                />
                <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <select className="bg-gray-800 text-sm border border-gray-700 rounded-md px-2 py-1 text-gray-100">
                <option>Hyderabad</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
              </select>
              <button
                onClick={() => setShowGroups(true)}
                className="flex items-center gap-2 text-gray-300 hover:text-purple-400"
              >
                <MessageCircle size={20} />
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 bg-purple-500 px-4 py-1 rounded-md text-sm hover:bg-purple-600 transition-colors"
              >
                <User size={16} />
                {localStorage.getItem('isLoggedIn') ? 'My Account' : 'Sign In'}
              </button>
              <Menu className="h-6 w-6 text-gray-300" />
            </div>
          </div>
        </div>
      </nav>

      {showGroups && <MovieGroups onClose={() => setShowGroups(false)} />}
    </>
  );
}