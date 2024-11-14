import React, { useState } from 'react';
import { MessageCircle, Plus, X, Search, Users } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  members: number;
  lastMessage: string;
  time: string;
}

const SAMPLE_GROUPS: Group[] = [
  {
    id: '1',
    name: 'Pushpa 2 Fans',
    members: 156,
    lastMessage: "Can't wait for the release!",
    time: '2m ago'
  },
  {
    id: '2',
    name: 'Movie Buffs Hyderabad',
    members: 342,
    lastMessage: 'Anyone up for first day first show?',
    time: '15m ago'
  },
  {
    id: '3',
    name: 'Devara Discussion',
    members: 89,
    lastMessage: 'The trailer looks amazing!',
    time: '1h ago'
  }
];

interface MovieGroupsProps {
  onClose: () => void;
}

export default function MovieGroups({ onClose }: MovieGroupsProps) {
  const [groups, setGroups] = useState<Group[]>(SAMPLE_GROUPS);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      const newGroup: Group = {
        id: Math.random().toString(36).substr(2, 9),
        name: newGroupName,
        members: 1,
        lastMessage: 'Group created',
        time: 'Just now'
      };
      setGroups([newGroup, ...groups]);
      setNewGroupName('');
      setShowCreateGroup(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl w-full max-w-md p-6 relative border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <MessageCircle className="text-purple-400" />
            <h2 className="text-xl font-semibold text-gray-100">Movie Groups</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search groups"
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-400"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto">
          {groups.map(group => (
            <div
              key={group.id}
              className="p-3 rounded-lg border border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-gray-100">{group.name}</h3>
                <span className="text-xs text-gray-400">{group.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400 truncate">{group.lastMessage}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Users size={12} />
                  {group.members}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showCreateGroup ? (
          <button
            onClick={() => setShowCreateGroup(true)}
            className="w-full flex items-center justify-center gap-2 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Plus size={18} />
            Create New Group
          </button>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Enter group name"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-400"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={handleCreateGroup}
                className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Create
              </button>
              <button
                onClick={() => setShowCreateGroup(false)}
                className="flex-1 border border-gray-700 text-gray-300 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}