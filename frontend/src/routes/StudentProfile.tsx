import { FC, useState } from 'react';
import '../index.css';
import DefaultPfp from '../assets/default.png';

const StudentProfile: FC = () => {
  const [profilePicture, setProfilePicture] = useState<string | ArrayBuffer | null>(null);

  { /* A function for reading in user files to set up a profile picture */}
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-box p-6 bg-white border-2 border-black flex flex-col items-center justify-center w-1/2 mx-auto my-12 rounded-xl">
      <div className="info-box bg-white w-full flex items-center space-x-4">
        <label htmlFor="file-input">
          <img
            src={profilePicture ? (profilePicture as string) : DefaultPfp}
            alt="Profile"
            className="w-24 h-24 rounded-full cursor-pointer"
          />
        </label>

        <input
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        <div>
          <h2 className="text-xl font-bold mb-2">John Doe</h2>
          <p>Resume:</p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
