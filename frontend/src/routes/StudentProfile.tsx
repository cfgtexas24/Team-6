import { FC, useState } from 'react';
import '../index.css';
import DefaultPfp from '../assets/default.png';

const StudentProfile: FC = () => {
  const [profilePicture, setProfilePicture] = useState<string | ArrayBuffer | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'jobs'>('about');
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  const certifications = [
    'Cybersecurity',
    'Retail',
    'Data Analytics',
    'Digital Marketing & E-commerce',
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

  return (
    <div className="profile-box p-6 bg-white border-2 border-gray flex flex-col items-center justify-center w-1/2 mx-auto my-12 rounded-xl">
      <div className="info-box bg-white w-full flex items-center space-x-4 mb-6">
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
          <div className="flex space-x-4">
            <a
              href="/path/to/resume.pdf" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
            <a
              href="/path/to/cover-letter.pdf"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cover Letter
            </a>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tabs-box bg-white w-full flex justify-between p-4 border-t-2 border-gray-200">
        <button
          onClick={() => setActiveTab('about')}
          className={`flex-1 text-center py-2 font-bold ${activeTab === 'about' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
        >
          About
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`flex-1 text-center py-2 font-bold ${activeTab === 'jobs' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
        >
          Jobs
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content bg-white w-full p-4">
        {activeTab === 'about' ? (
          <div>
            <p>This section contains information about me.</p>
          </div>
        ) : (
          <div>
            <p>Database will display jobs</p>
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div className="skills-section bg-white w-full p-4 mt-6 border-t-2 border-gray-200">
        <h3 className="text-lg font-bold mb-2">Skills</h3>
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <div className="skills-list flex flex-wrap">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <div
                key={skill}
                onClick={() => handleRemoveSkill(skill)} // Remove skill on click
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

      {/* Certifications */}
      <div className="certifications-section bg-white w-full p-4 mt-6 border-t-2 border-gray-200">
        <h3 className="text-lg font-bold mb-2">Certifications</h3>
        <div className="certifications-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
          {certifications.map((certification) => (
            <div
              key={certification}
              className="bg-gray-200 border border-gray-300 p-4 rounded-lg shadow"
            >
              {certification}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
