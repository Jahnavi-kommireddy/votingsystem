import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

type ElectionContextType = {
  elections: Election[];
  addElection: (election: Omit<Election, 'id' | 'votes' | 'votedUsers' | 'isActive'>) => void;
  removeElection: (id: string) => void;
  castVote: (electionId: string, candidateName: string, userId: string) => boolean;
  getElectionResults: (electionId: string) => Record<string, number> | null;
  getCurrentElections: () => Election[];
  getPastElections: () => Election[];
  getUpcomingElections: () => Election[];
};

const ElectionContext = createContext<ElectionContextType | undefined>(undefined);

export const useElection = () => {
  const context = useContext(ElectionContext);
  if (context === undefined) {
    throw new Error('useElection must be used within an ElectionProvider');
  }
  return context;
};

type ElectionProviderProps = {
  children: ReactNode;
};

export const ElectionProvider = ({ children }: ElectionProviderProps) => {
  const [elections, setElections] = useState<Election[]>(() => {
    const savedElections = localStorage.getItem('elections');
    return savedElections ? JSON.parse(savedElections) : [];
  });

  useEffect(() => {
    localStorage.setItem('elections', JSON.stringify(elections));
  }, [elections]);

  const addElection = (electionData: Omit<Election, 'id' | 'votes' | 'votedUsers' | 'isActive'>) => {
    const newElection: Election = {
      ...electionData,
      id: crypto.randomUUID(),
      votes: {},
      votedUsers: [],
      isActive: false
    };

    // Initialize vote count for each candidate
    newElection.candidates.forEach(candidate => {
      newElection.votes[candidate.name] = 0;
    });

    setElections(prev => [...prev, newElection]);
  };

  const removeElection = (id: string) => {
    setElections(prev => prev.filter(election => election.id !== id));
  };

  const castVote = (electionId: string, candidateName: string, userId: string): boolean => {
    const election = elections.find(e => e.id === electionId);
    
    if (!election || !isElectionActive(election) || election.votedUsers.includes(userId)) {
      return false;
    }

    setElections(prev => prev.map(e => {
      if (e.id === electionId) {
        return {
          ...e,
          votes: {
            ...e.votes,
            [candidateName]: (e.votes[candidateName] || 0) + 1
          },
          votedUsers: [...e.votedUsers, userId]
        };
      }
      return e;
    }));

    return true;
  };

  const isElectionActive = (election: Election): boolean => {
    const now = new Date();
    const start = new Date(election.startDate);
    const end = new Date(election.endDate);
    return now >= start && now <= end;
  };

  const getElectionResults = (electionId: string): Record<string, number> | null => {
    const election = elections.find(e => e.id === electionId);
    if (!election) return null;

    const now = new Date();
    const end = new Date(election.endDate);

    // Only return results if election has ended
    return now > end ? election.votes : null;
  };

  const getCurrentElections = (): Election[] => {
    const now = new Date();
    return elections.filter(election => {
      const start = new Date(election.startDate);
      const end = new Date(election.endDate);
      return now >= start && now <= end;
    });
  };

  const getPastElections = (): Election[] => {
    const now = new Date();
    return elections.filter(election => {
      const end = new Date(election.endDate);
      return now > end;
    });
  };

  const getUpcomingElections = (): Election[] => {
    const now = new Date();
    return elections.filter(election => {
      const start = new Date(election.startDate);
      return now < start;
    });
  };

  const value = {
    elections,
    addElection,
    removeElection,
    castVote,
    getElectionResults,
    getCurrentElections,
    getPastElections,
    getUpcomingElections
  };

  return <ElectionContext.Provider value={value}>{children}</ElectionContext.Provider>;
};