// src/components/UserProfile.tsx
import React from 'react';

interface UserProfileProps {
  name: string;
  Url: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, Url }) => {
  return (
    <div className="flex flex-col items-center text-white ">
      {/* Logo Event */}
      <img 
        src="https://res.cloudinary.com/dnyw0exi5/image/upload/v1779456044/ony-teks_ybusxc.png" 
        alt="Millenium Logo" 
        className="w-32"
      />
      
      {/* Avatar User */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full border-4 border-yellow-400 overflow-hidden shadow-lg">
          <img 
            src={Url} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>


      <h2 className="text-2xl font-bold tracking-wide text-white">{name}</h2> 
    </div>
  );
};

export default UserProfile;