import { FC } from 'react';

//data type defintions for modal/profile inputs
interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profilePicture: string | ArrayBuffer | null;
  onProfilePictureChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  bio: string;
  setBio: (bio: string) => void;
  jobPreferences: string[];
  toggleJobPreference: (preference: string) => void;
  newSkill: string;
  setNewSkill: (skill: string) => void;
  skills: string[];
  handleAddSkill: () => void;
  handleRemoveSkill: (skillToRemove: string) => void;
  onSave: () => void;
  onResumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCoverLetterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resumeFileName: string;
  coverLetterFileName: string;
}

const EditProfileModal: FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  onProfilePictureChange,
  bio,
  setBio,
  jobPreferences,
  toggleJobPreference,
  newSkill,
  setNewSkill,
  skills,
  handleAddSkill,
  handleRemoveSkill,
  onSave,
  onResumeChange,
  onCoverLetterChange,
  resumeFileName,
  coverLetterFileName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-1/2">
        <h4 className="text-lg font-bold mb-2">Edit Profile</h4>
        <div className="flex items-center mb-4">
          <label htmlFor="profile-picture" className="mr-4">Profile Picture:</label>
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            onChange={onProfilePictureChange}
            className="border border-gray-300 rounded p-2 flex-1"
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="block mb-1">Resume:</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={onResumeChange}
            className="border border-gray-300 rounded p-2 flex-1 mb-2"
          />
          <p>{resumeFileName}</p>
        </div>
        <div className="flex items-center mb-4">
          <label className="block mb-1">Cover Letter:</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={onCoverLetterChange}
            className="border border-gray-300 rounded p-2 flex-1 mb-2"
          />
          <p>{coverLetterFileName}</p>
        </div>
        <div className="mb-4">
          <label className="block mb-1">About Me:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full h-24"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Job Preferences:</label>
          <div className="flex flex-col">
            {['Intern', 'Full-time', 'Part-time'].map(preference => (
              <label key={preference} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={jobPreferences.includes(preference)}
                  onChange={() => toggleJobPreference(preference)}
                  className="mr-2"
                />
                {preference}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Skills:</label>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a new skill"
              className="border border-gray-300 rounded p-2 mr-2 flex-1"
            />
            <button
              onClick={handleAddSkill}
              className="bg-[#475299] text-white px-4 py-2 rounded hover:bg-[#38417a]"
            >
              Add
            </button>
          </div>
          <div className="skills-list flex flex-wrap">
            {skills.map((skill) => (
              <div
                key={skill}
                onClick={() => handleRemoveSkill(skill)} 
                className="bg-[#35344A] text-white px-4 py-2 m-2 rounded cursor-pointer"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-[#475299] text-white px-4 py-2 rounded hover:bg-[#38417a]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;