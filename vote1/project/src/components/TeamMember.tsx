import React from 'react';

type TeamMemberProps = {
  name: string;
  position: string;
  imageUrl: string;
  bio: string;
};

const TeamMember: React.FC<TeamMemberProps> = ({ name, position, imageUrl, bio }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <img 
        src={imageUrl} 
        alt={name} 
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-blue-600 font-medium mb-3">{position}</p>
        <p className="text-gray-600">{bio}</p>
      </div>
    </div>
  );
};

export default TeamMember;