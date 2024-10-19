import { FC, useState } from 'react';
import '../index.css';
import DefaultPfp from '../assets/default.png';
import CreateIcon from '@mui/icons-material/Create';
import EditProfileModal from './EditProfileModal'; // Import the new modal component

const StudentProfile: FC = () => {
  const [profilePicture, setProfilePicture] = useState<string | ArrayBuffer | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'jobs'>('about');
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [bio, setBio] = useState('This section contains information about me.');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [jobPreferences, setJobPreferences] = useState<string[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState('');
  const [coverLetterFileName, setCoverLetterFileName] = useState('');

  const certifications = [
    'Certified JavaScript Developer',
    'React Certification',
    'Node.js Certified Developer',
    'AWS Certified Solutions Architect',
  ];

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

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const toggleJobPreference = (preference: string) => {
    if (jobPreferences.includes(preference)) {
      setJobPreferences(jobPreferences.filter(pref => pref !== preference));
    } else {
      setJobPreferences([...jobPreferences, preference]);
    }
  };

  //functions to handle resume and cover letter changes
  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setResumeFileName(file.name);
    }
  };

  const handleCoverLetterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverLetterFile(file);
      setCoverLetterFileName(file.name); 
    }
  };

  const handleSaveProfile = () => {
    //handle the logic for saving profile updates
    setIsEditProfileOpen(false);
  };

  return (
    <div className="profile-box p-6 bg-white border-2 border-gray flex flex-col items-center justify-center w-1/2 mx-auto my-12 rounded-xl">
      <div className="info-box bg-white w-full flex items-center space-x-4">
        <label htmlFor="file-input">
          <img
            src={profilePicture ? (profilePicture as string) : DefaultPfp}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </label>

        <input
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        <div className='flex flex-col justify-center'>
          <div className='flex flex-row'>
            <h2 className="text-3xl font-bold">John Doe</h2>
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="text-gray-400 h-1/2 border rounded-full bg-white border-0 mt-8 hover:text-gray-600"
            >
              <CreateIcon className="text-gray" />
            </button>
          </div>
          <div className="flex space-x-4 mb-5">
            <a
              href={resumeFile ? URL.createObjectURL(resumeFile) : undefined} 
              className="bg-[#475299] text-white px-4 py-2 rounded hover:bg-[#38417a] no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
            <a
              href={coverLetterFile ? URL.createObjectURL(coverLetterFile) : undefined}
              className="bg-[#475299] text-white px-4 py-2 rounded hover:bg-[#38417a] no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cover Letter
            </a>
          </div>
        </div>
      </div>

      <hr className="w-full border-t border-gray-300 my-4" />

      {/* Tabs Section */}
      <div className="tabs-box bg-white w-full flex justify-between p-4 border-t-2 border-gray-200">
        <button
          onClick={() => setActiveTab('about')}
          className={`flex-1 text-center py-2 font-bold border rounded-full mr-2 ${activeTab === 'about' ? 'text-secondary border-2 border-secondary' : 'text-gray-500'}`}
        >
          About
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`flex-1 text-center py-2 font-bold border rounded-full ml-2 ${activeTab === 'jobs' ? 'text-secondary border-2 border-secondary' : 'text-gray-500'}`}
        >
          Jobs
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content bg-white w-full p-4">
        {activeTab === 'about' ? (
          <div>
            <h3 className="text-lg font-bold">About Me</h3>
            <div className="bg-white border p-4 rounded shadow-md">
              <p className="whitespace-normal">{bio}</p>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-bold">Jobs</h3>
            <p>This section contains job listings or relevant information.</p>
          </div>
        )}
      </div>

      <hr className="w-full border-t border-gray-300 my-4" />

      {/* Looking For Section */}
      <div className="w-full p-4">
        <h3 className="text-lg font-bold">Looking For</h3>
        <div className="border p-4 rounded shadow-md">
          <p className="whitespace-normal">{jobPreferences.length > 0 ? jobPreferences.join(', ') : 'No preferences set.'}</p>
        </div>
      </div>

      <hr className="w-full border-t border-gray-300 my-4" />

      {/* Skills Section */}
      <div className="skills-section bg-white w-full p-4 border-t-2 border-gray-200">
        <h3 className="text-lg font-bold mb-2 mt-2">Skills</h3>
        <div className="skills-list flex flex-wrap">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <div
                key={skill}
                onClick={() => handleRemoveSkill(skill)} 
                className="bg-[#35344A] text-white px-4 py-2 m-2 rounded cursor-pointer"
              >
                {skill}
              </div>
            ))
          ) : (
            <p>No skills added yet.</p>
          )}
        </div>
      </div>

      <hr className="w-full border-t border-gray-300 my-4" />

      {/* Certifications Section with Placeholder Values */}
      <div className="certifications-section bg-white w-full p-4 border-t-2 border-gray-200">
        <h3 className="text-lg font-bold mb-2 mt-2">Certifications</h3>
        <div className="certifications-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((certification) => (
            <div
              key={certification}
              className="bg-gray-200 border border-gray-300 p-4 rounded-lg shadow text-center"
            >
              {certification}
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        profilePicture={profilePicture}
        onProfilePictureChange={handleImageChange}
        bio={bio}
        setBio={setBio}
        jobPreferences={jobPreferences}
        toggleJobPreference={toggleJobPreference}
        newSkill={newSkill}
        setNewSkill={setNewSkill}
        skills={skills}
        handleAddSkill={handleAddSkill}
        handleRemoveSkill={handleRemoveSkill}
        onSave={handleSaveProfile}
        onResumeChange={handleResumeChange} 
        onCoverLetterChange={handleCoverLetterChange} 
        resumeFileName={resumeFileName} 
        coverLetterFileName={coverLetterFileName} 
      />
    </div>
  );
};

export default StudentProfile;