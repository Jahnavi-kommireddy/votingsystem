import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useElection } from '../context/ElectionContext';
import ElectionForm from '../components/ElectionForm';
import ElectionList from '../components/ElectionList';
import VoteList from '../components/VoteList';
import Result from '../components/Result';
import VoteChart from '../components/VoteChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { 
    addElection, 
    removeElection,
    getCurrentElections,
    getPastElections,
    getUpcomingElections,
    castVote,
    getElectionResults
  } = useElection();

  const [activeTab, setActiveTab] = useState('current');
  const [selectedElection, setSelectedElection] = useState<string | null>(null);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const currentElections = getCurrentElections();
  const pastElections = getPastElections();
  const upcomingElections = getUpcomingElections();

  const handleVote = (electionId: string, candidateName: string) => {
    if (currentUser) {
      castVote(electionId, candidateName, currentUser.username);
    }
  };

  return (
    <div className="page-transition max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome, {currentUser.name}</h1>
            <p className="text-gray-600 mt-1">
              {currentUser.isAdmin ? 'Election Management Dashboard' : 'Voter Dashboard'}
            </p>
          </div>
        </div>
      </div>

      {currentUser.isAdmin && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Create New Election</h2>
          <ElectionForm onSubmit={addElection} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="current">Current Elections</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Elections</TabsTrigger>
            <TabsTrigger value="past">Past Elections</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            {currentElections.map(election => (
              <div key={election.id} className="mb-8">
                <ElectionList 
                  elections={[election]}
                  onDelete={currentUser.isAdmin ? removeElection : undefined}
                  showResults={false}
                  isAdmin={currentUser.isAdmin}
                />
                {!currentUser.isAdmin && (
                  <VoteList
                    candidates={election.candidates.map(c => c.name)}
                    onVote={(candidateName) => handleVote(election.id, candidateName)}
                    votedFor={election.votedUsers.includes(currentUser.username) ? 
                      election.candidates.find(c => 
                        election.votes[c.name] > 0 && 
                        election.votedUsers.includes(currentUser.username)
                      )?.name : undefined}
                  />
                )}
              </div>
            ))}
            {currentElections.length === 0 && (
              <p className="text-gray-600 text-center py-4">No current elections</p>
            )}
          </TabsContent>

          <TabsContent value="upcoming">
            <ElectionList 
              elections={upcomingElections}
              onDelete={currentUser.isAdmin ? removeElection : undefined}
              showResults={false}
              isAdmin={currentUser.isAdmin}
            />
          </TabsContent>

          <TabsContent value="past">
            {pastElections.map(election => (
              <div key={election.id} className="mb-12">
                <ElectionList 
                  elections={[election]}
                  onDelete={currentUser.isAdmin ? removeElection : undefined}
                  showResults={true}
                  isAdmin={currentUser.isAdmin}
                />
                <Result votes={election.votes} />
                <VoteChart votes={election.votes} />
              </div>
            ))}
            {pastElections.length === 0 && (
              <p className="text-gray-600 text-center py-4">No past elections</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;