import React from 'react';
import { Vote } from 'lucide-react';

type VoteListProps = {
  candidates: string[];
  onVote: (candidate: string) => void;
  votedFor?: string | null;
};

const VoteList: React.FC<VoteListProps> = ({ candidates, onVote, votedFor }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Available Candidates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {candidates.map((name) => (
          <div 
            key={name}
            className={`p-4 border rounded-lg shadow-sm ${
              votedFor === name 
                ? 'bg-green-50 border-green-200' 
                : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
            } transition-all duration-200`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">{name}</span>
              <button 
                onClick={() => onVote(name)}
                disabled={!!votedFor}
                className={`px-4 py-2 rounded-md flex items-center transition-colors duration-200 ${
                  votedFor 
                    ? votedFor === name 
                      ? 'bg-green-500 text-white cursor-default' 
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Vote className="h-4 w-4 mr-1" />
                {votedFor === name ? 'Voted' : 'Vote'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoteList;