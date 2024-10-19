import { FC, useState } from 'react';
import '../index.css';
import DefaultPfp from '../assets/default.png';

const StudentProfile: FC = () => {
  const [profilePicture, setProfilePicture] = useState<string | ArrayBuffer | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'jobs'>('about');
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const certifications = [
    'Certified JavaScript Developer',
    'React Certification',
    'Node.js Certified Developer',
    'AWS Certified Solutions Architect',
  ]; 
  const [bio, setBio] = useState('This section contains information about me.'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLookingForModalOpen, setIsLookingForModalOpen] = useState(false);
  const [jobPreferences, setJobPreferences] = useState<string[]>([]);

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

  const handleSaveBio = () => {
    setIsModalOpen(false);
  };

  const handleSaveJobPreferences = () => {
    setIsLookingForModalOpen(false);
  };

  const toggleJobPreference = (preference: string) => {
    if (jobPreferences.includes(preference)) {
      setJobPreferences(jobPreferences.filter(pref => pref !== preference));
    } else {
      setJobPreferences([...jobPreferences, preference]);
    }
  };

  return (
    <div className="profile-box p-6 bg-white border-2 border-gray flex flex-col items-center justify-center w-1/2 mx-auto my-12 rounded-xl">
      <div className="info-box bg-white w-full flex items-center space-x-4 mb-6">
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

        <div>
          <h2 className="text-xl font-bold mb-2">John Doe</h2>
          <div className="flex space-x-4">
            <a
              href="/path/to/resume.pdf" 
              className="bg-[#475299] text-white px-4 py-2 rounded hover:bg-[#38417a]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
            <a
              href="/path/to/cover-letter.pdf" 
              className="bg-[#475299] text-white px-4 py-2 rounded hover:bg-[#38417a]"
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
            <h3 className="text-lg font-bold">About Me</h3>
            <div className="bg-white border p-4 rounded shadow-md">
              <p className="whitespace-normal">{bio}</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 bg-[#475299] text-white px-4 py-2 rounded hover:bg-[#38417a]"
            >
              Edit
            </button>

            {/* Modal for Editing Bio */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-md">
                  <h4 className="text-lg font-bold mb-2">Edit Bio</h4>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full h-24"
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveBio}
                      className="bg-[#475299] text-white px-4 py-2 rounded hover:bg-[#38417a]"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Looking For Section */}
            <div className="mt-6">
              <h3 className="text-lg font-bold">Looking For</h3>
              <div className="border p-4 rounded shadow-md">
                <p className="whitespace-normal">{jobPreferences.length > 0 ? jobPreferences.join(', ') : 'No preferences set.'}</p>
              </div>
              <button
                onClick={() => setIsLookingForModalOpen(true)}
                className="mt-4 bg-[#475299] text-white px-4 py-2 rounded hover:bg-[#38417a]"
              >
                Edit
              </button>

              {/* Modal for Job Preferences */}
              {isLookingForModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded shadow-md">
                    <h4 className="text-lg font-bold mb-2">Select Job Preferences</h4>
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
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => setIsLookingForModalOpen(false)}
                        className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveJobPreferences}
                        className="bg-[#475299] text-white px-4 py-2 rounded hover:bg-[#38417a]"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-bold">Jobs</h3>
            <p>This section contains job listings or relevant information.</p>
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
            className="bg-[#475299] text-white px-4 py-2 rounded hover:bg-[#38417a]"
          >
            Add
          </button>
        </div>
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

      {/* Certifications Section with Placeholder Values */}
      <div className="certifications-section bg-white w-full p-4 mt-6 border-t-2 border-gray-200">
        <h3 className="text-lg font-bold mb-2">Certifications</h3>
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
    </div>
  );
};

export default StudentProfile;
