import React from 'react';
import { BarChart3 } from 'lucide-react';

type ResultProps = {
  votes: Record<string, number>;
};

const Result: React.FC<ResultProps> = ({ votes }) => {
  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);
  
  // Find the maximum vote count to calculate the width of the bars
  const maxVotes = Math.max(...Object.values(votes), 1);

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-bold">Current Results</h2>
      </div>
      
      <p className="text-gray-600 mb-4">Total votes: {totalVotes}</p>
      
      <div className="space-y-4">
        {Object.entries(votes).map(([name, count]) => {
          const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
          
          return (
            <div key={name} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">{name}</span>
                <span className="text-sm text-gray-600">{count} vote{count !== 1 ? 's' : ''} ({percentage.toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(count / maxVotes) * 100}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Result;