import React from 'react';
import { Calendar, Clock, Users, Trash2 } from 'lucide-react';

type Candidate = {
  name: string;
  position: string;
  bio: string;
};

type Election = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  candidates: Candidate[];
  votes: Record<string, number>;
  votedUsers: string[];
  isActive: boolean;
};

type ElectionListProps = {
  elections: Election[];
  onDelete?: (id: string) => void;
  showResults?: boolean;
  isAdmin?: boolean;
};

const ElectionList: React.FC<ElectionListProps> = ({ 
  elections, 
  onDelete, 
  showResults = false,
  isAdmin = false 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  const getStatus = (election: Election) => {
    const now = new Date();
    const start = new Date(election.startDate);
    const end = new Date(election.endDate);

    if (now < start) {
      return { text: 'Upcoming', color: 'bg-yellow-100 text-yellow-800' };
    } else if (now > end) {
      return { text: 'Ended', color: 'bg-red-100 text-red-800' };
    } else {
      return { text: 'Active', color: 'bg-green-100 text-green-800' };
    }
  };

  return (
    <div className="space-y-6">
      {elections.map(election => {
        const status = getStatus(election);
        const totalVotes = Object.values(election.votes).reduce((sum, count) => sum + count, 0);
        const isEnded = new Date() > new Date(election.endDate);

        return (
          <div key={election.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{election.title}</h3>
                  <span className={`inline-block px-2 py-1 rounded text-sm font-medium mt-2 ${status.color}`}>
                    {status.text}
                  </span>
                </div>
                {isAdmin && onDelete && (
                  <button
                    onClick={() => onDelete(election.id)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>

              <p className="mt-4 text-gray-600">{election.description}</p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Start: {formatDate(election.startDate)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>End: {formatDate(election.endDate)}</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3">Candidates</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {election.candidates.map((candidate, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium">{candidate.name}</h5>
                      <p className="text-sm text-blue-600 mb-2">{candidate.position}</p>
                      <p className="text-sm text-gray-600">{candidate.bio}</p>
                      {showResults && isEnded && (
                        <div className="mt-2 text-sm font-medium text-gray-900">
                          Votes: {election.votes[candidate.name] || 0}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>Total Votes: {totalVotes}</span>
              </div>
            </div>
          </div>
        );
      })}

      {elections.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No elections found.
        </div>
      )}
    </div>
  );
};

export default ElectionList;