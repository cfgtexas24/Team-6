import { FC, useState, useEffect } from 'react';

const EmployerStudentSearchPage: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState<string[]>([]);
  const [location, setLocation] = useState<string[]>([]);
  const [workPreference, setWorkPreference] = useState<string[]>([]);
  const [skillsCategory, setSkillsCategory] = useState<'all' | 'technical' | 'languages' | 'certifications' | 'soft skills'>('all');
  const [selectedSkill, setSelectedSkill] = useState<string[]>([]);
  const [selectedJobSeeker, setSelectedJobSeeker] = useState<any | null>(null);
  const [dropdownStates, setDropdownStates] = useState<{ [key: string]: boolean }>({
    skills: false,
    jobType: false,
    location: false,
    workPreference: false,
    technicalSkills: false,
    codingLanguages: false,
    languages: false,
    certifications: false,
    softSkills: false,
  });

  //mock data
  const jobSeekers = [
    { id: 1, name: 'John Doe', location: 'San Francisco, CA', workPreference: 'remote', skills: ['Java', 'Teamwork', 'Leadership'], jobType: 'full-time', photo: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Jane Smith', location: 'Los Angeles, CA', workPreference: 'on-site', skills: ['Python', 'Adaptability', 'Critical Thinking'], jobType: 'internship', photo: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Bob Johnson', location: 'Chicago, IL', workPreference: 'hybrid', skills: ['C++', 'Problem Solving', 'Communication'], jobType: 'part-time', photo: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Alice Brown', location: 'Austin, TX', workPreference: 'remote', skills: ['JavaScript', 'Creativity', 'Collaboration'], jobType: 'full-time', photo: 'https://via.placeholder.com/150' },
  ];

  const filteredJobSeekers = jobSeekers.filter(jobSeeker => {
    // Filter by Job Type
    const jobTypeMatches = jobType.length === 0 || jobType.includes(jobSeeker.jobType);

    // Filter by Location
    const locationMatches = location.length === 0 || location.includes(jobSeeker.location);

    // Filter by Work Preference
    const workPreferenceMatches = workPreference.length === 0 || workPreference.includes(jobSeeker.workPreference);

    // Filter by Skills
    let skillsMatch = true;
    if (selectedSkill.length > 0) {
      skillsMatch = selectedSkill.every(skill => {
        if (skill === 'technical') {
          // If "technical" is selected, check if the job seeker has any technical skills
          const technicalSkills = ['Java', 'Python', 'JavaScript', 'C++', 'C#', 'Ruby', 'Swift', 'PHP'];
          return technicalSkills.some(techSkill => jobSeeker.skills.includes(techSkill));
        } else if (skill === 'coding languages') {
          // If "coding languages" is selected, check if the job seeker has any coding languages
          const codingLanguages = ['Java', 'Python', 'JavaScript', 'C++', 'C#', 'Ruby', 'Swift', 'PHP'];
          return codingLanguages.some(lang => jobSeeker.skills.includes(lang));
        } else {
          // For specific skills, check if the job seeker has that skill
          return jobSeeker.skills.includes(skill);
        }
      });
    }

    // Filter by Search Term
    const searchTermMatches = jobSeeker.name.toLowerCase().includes(searchTerm.toLowerCase());

    return jobTypeMatches && locationMatches && workPreferenceMatches && skillsMatch && searchTermMatches;
  });

  useEffect(() => {
    // If the selected job seeker is no longer in the filtered list, deselect them
    if (selectedJobSeeker && !filteredJobSeekers.some(jobSeeker => jobSeeker.id === selectedJobSeeker.id)) {
      setSelectedJobSeeker(null);
    }
  }, [filteredJobSeekers, selectedJobSeeker]);

  const toggleSelection = (value: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(value)) {
      setList(list.filter(item => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const toggleDropdown = (dropdownKey: string) => {
    setDropdownStates(prev => ({
      ...prev,
      [dropdownKey]: !prev[dropdownKey],
    }));
  };

  const FilterDropdown: FC<{ title: string; options: string[]; selected: string[]; setSelected: (value: string[]) => void; dropdownKey: string }> = ({
    title,
    options,
    selected,
    setSelected,
    dropdownKey,
  }) => {
    return (
      <div className="relative">
        <button
          onClick={() => toggleDropdown(dropdownKey)}
          className="border border-gray-300 rounded-full p-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#475299] transition-all"
        >
          {title}
        </button>

        {dropdownStates[dropdownKey] && (
          <div className="absolute mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
            {options.map(option => (
              <div key={option} className="mb-2">
                {option === 'other' ? (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value={`${dropdownKey}_other`}
                      onChange={() => toggleSelection(`${dropdownKey}_other`, selected, setSelected)}
                      checked={selected.includes(`${dropdownKey}_other`)}
                      className="mr-2"
                    />
                    <input
                      type="text"
                      placeholder="Specify other..."
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  </div>
                ) : (
                  <label className="block">
                    <input
                      type="checkbox"
                      value={option}
                      onChange={() => toggleSelection(option, selected, setSelected)}
                      checked={selected.includes(option)}
                      className="mr-2"
                    />
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </label>
                )}
                {option === 'technical' && selected.includes('technical') && (
                  <div className="ml-4 mt-2">
                    <button
                      onClick={() => toggleDropdown('technicalSkills')}
                      className="text-blue-500 text-sm"
                    >
                      {dropdownStates.technicalSkills ? 'Hide Technical Skills' : 'Show Technical Skills'}
                    </button>
                    {dropdownStates.technicalSkills && (
                      <div className="ml-4 mt-2">
                        {['coding languages', 'IT support', 'marketing', 'cybersecurity', 'project management', 'other'].map(techSkill => (
                          <div key={techSkill} className="mb-2">
                            {techSkill === 'other' ? (
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  value={'technicalSkills_other'}
                                  onChange={() => toggleSelection('technicalSkills_other', selected, setSelected)}
                                  checked={selected.includes('technicalSkills_other')}
                                  className="mr-2"
                                />
                                <input
                                  type="text"
                                  placeholder="Specify other..."
                                  className="border border-gray-300 rounded p-2 w-full"
                                />
                              </div>
                            ) : (
                              <label className="block">
                                <input
                                  type="checkbox"
                                  value={techSkill}
                                  onChange={() => toggleSelection(techSkill, selected, setSelected)}
                                  checked={selected.includes(techSkill)}
                                  className="mr-2"
                                />
                                {techSkill.charAt(0).toUpperCase() + techSkill.slice(1)}
                              </label>
                            )}
                            {techSkill === 'coding languages' && selected.includes('coding languages') && (
                              <div className="ml-4 mt-2">
                                <button
                                  onClick={() => toggleDropdown('codingLanguages')}
                                  className="text-blue-500 text-sm"
                                >
                                  {dropdownStates.codingLanguages ? 'Hide Coding Languages' : 'Show Coding Languages'}
                                </button>
                                {dropdownStates.codingLanguages && (
                                  <div className="ml-4 mt-2">
                                    {['JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Swift', 'PHP', 'other'].map(codingLang => (
                                      <div key={codingLang} className="mb-2">
                                        {codingLang === 'other' ? (
                                          <div className="flex items-center">
                                            <input
                                              type="checkbox"
                                              value={'codingLanguages_other'}
                                              onChange={() => toggleSelection('codingLanguages_other', selected, setSelected)}
                                              checked={selected.includes('codingLanguages_other')}
                                              className="mr-2"
                                            />
                                            <input
                                              type="text"
                                              placeholder="Specify other..."
                                              className="border border-gray-300 rounded p-2 w-full"
                                            />
                                          </div>
                                        ) : (
                                          <label className="block">
                                            <input
                                              type="checkbox"
                                              value={codingLang}
                                              onChange={() => toggleSelection(codingLang, selected, setSelected)}
                                              checked={selected.includes(codingLang)}
                                              className="mr-2"
                                            />
                                            {codingLang.charAt(0).toUpperCase() + codingLang.slice(1)}
                                          </label>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {option === 'languages' && selected.includes('languages') && (
                  <div className="ml-4 mt-2">
                    <button
                      onClick={() => toggleDropdown('languages')}
                      className="text-blue-500 text-sm"
                    >
                      {dropdownStates.languages ? 'Hide Languages' : 'Show Languages'}
                    </button>
                    {dropdownStates.languages && (
                      <div className="ml-4 mt-2">
                        {['English', 'Mandarin Chinese', 'Spanish', 'French', 'Standard Arabic', 'Italian', 'Portuguese', 'Bengali', 'Hindi', 'Urdu', 'Russian', 'German', 'Japanese', 'Korean', 'other'].map(lang => (
                          <div key={lang} className="mb-2">
                            {lang === 'other' ? (
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  value={'languages_other'}
                                  onChange={() => toggleSelection('languages_other', selected, setSelected)}
                                  checked={selected.includes('languages_other')}
                                  className="mr-2"
                                />
                                <input
                                  type="text"
                                  placeholder="Specify other..."
                                  className="border border-gray-300 rounded p-2 w-full"
                                />
                              </div>
                            ) : (
                              <label className="block">
                                <input
                                  type="checkbox"
                                  value={lang}
                                  onChange={() => toggleSelection(lang, selected, setSelected)}
                                  checked={selected.includes(lang)}
                                  className="mr-2"
                                />
                                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                              </label>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {option === 'certifications' && selected.includes('certifications') && (
                  <div className="ml-4 mt-2">
                    <button
                      onClick={() => toggleDropdown('certifications')}
                      className="text-blue-500 text-sm"
                    >
                      {dropdownStates.certifications ? 'Hide Certifications' : 'Show Certifications'}
                    </button>
                    {dropdownStates.certifications && (
                      <div className="ml-4 mt-2">
                        {['Google Data Analytics', 'Google Project Management', 'Google UX Design', 'Google Cybersecurity', 'Google IT Support', 'Google Digital Marketing and E-commerce', 'Customer Service and Sales', 'other'].map(cert => (
                          <div key={cert} className="mb-2">
                            {cert === 'other' ? (
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  value={'certifications_other'}
                                  onChange={() => toggleSelection('certifications_other', selected, setSelected)}
                                  checked={selected.includes('certifications_other')}
                                  className="mr-2"
                                />
                                <input
                                  type="text"
                                  placeholder="Specify other..."
                                  className="border border-gray-300 rounded p-2 w-full"
                                />
                              </div>
                            ) : (
                              <label className="block">
                                <input
                                  type="checkbox"
                                  value={cert}
                                  onChange={() => toggleSelection(cert, selected, setSelected)}
                                  checked={selected.includes(cert)}
                                  className="mr-2"
                                />
                                {cert.charAt(0).toUpperCase() + cert.slice(1)}
                              </label>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {option === 'soft skills' && selected.includes('soft skills') && (
                  <div className="ml-4 mt-2">
                    <button
                      onClick={() => toggleDropdown('softSkills')}
                      className="text-blue-500 text-sm"
                    >
                      {dropdownStates.softSkills ? 'Hide Soft Skills' : 'Show Soft Skills'}
                    </button>
                    {dropdownStates.softSkills && (
                      <div className="ml-4 mt-2">
                        {['Problem Solving', 'Creativity', 'Leadership', 'Teamwork', 'Time Management', 'Adaptability', 'Critical Thinking', 'Conflict Resolution', 'Active Listening', 'Collaboration', 'Decision-Making', 'Organization', 'Innovation', 'Communication', 'Empathy', 'other'].map(skill => (
                          <div key={skill} className="mb-2">
                            {skill === 'other' ? (
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  value={'softSkills_other'}
                                  onChange={() => toggleSelection('softSkills_other', selected, setSelected)}
                                  checked={selected.includes('softSkills_other')}
                                  className="mr-2"
                                />
                                <input
                                  type="text"
                                  placeholder="Specify other..."
                                  className="border border-gray-300 rounded p-2 w-full"
                                />
                              </div>
                            ) : (
                              <label className="block">
                                <input
                                  type="checkbox"
                                  value={skill}
                                  onChange={() => toggleSelection(skill, selected, setSelected)}
                                  checked={selected.includes(skill)}
                                  className="mr-2"
                                />
                                {skill.charAt(0).toUpperCase() + skill.slice(1)}
                              </label>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setSelected([])}
                className="text-sm text-blue-500"
              >
                Clear
              </button>
              <button
                onClick={() => toggleDropdown(dropdownKey)}
                className="bg-[#475299] text-white px-4 py-2 rounded-full shadow hover:bg-[#3b4b8e] transition-all"
              >
                Show results
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="job-board flex flex-col p-8 bg-gray-50 border border-gray-200 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-[#475299] mb-6">Job Seekers</h1>

      {/* Search / Filter */}
      <div className="flex mb-6">
        {/* Search Bar */}
        <div className="relative w-3/4 mr-4">
          <input
            type="text"
            placeholder="Search for job seekers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full space-x-4 border border-gray-300 rounded-full p-3 pl-5 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#475299] transition-all"
          />
        </div>
      </div>

      {/* Filter Categories */}
      <div className="flex mb-6 space-x-4">
        <FilterDropdown
          title="Skills"
          options={['technical', 'languages', 'certifications', 'soft skills', 'other']}
          selected={selectedSkill}
          setSelected={setSelectedSkill}
          dropdownKey="skills"
        />
        <FilterDropdown
          title="Job Type"
          options={['internship', 'part-time', 'full-time', 'other']}
          selected={jobType}
          setSelected={setJobType}
          dropdownKey="jobType"
        />
        <FilterDropdown
          title="Location"
          options={['remote', 'San Francisco, CA', 'Los Angeles, CA', 'san diego', 'portland', 'seattle', 'omaha', 'chicago', 'dallas', 'houston', 'austin', 'salt lake city', 'phoenix', 'denver', 'st. louis', 'indianapolis', 'atlanta', 'charlotte', 'washington dc', 'new york', 'jersey city', 'boston', 'other']}
          selected={location}
          setSelected={setLocation}
          dropdownKey="location"
        />
        <FilterDropdown
          title="Work Preference"
          options={['hybrid', 'remote', 'on-site', 'any', 'other']}
          selected={workPreference}
          setSelected={setWorkPreference}
          dropdownKey="workPreference"
        />
      </div>

      {/* Job Seeker Listings */}
      <div className="flex w-full">
        {/* Job Seeker Listings */}
        <div className="job-listings w-1/2 pr-4 overflow-auto space-y-4" style={{ maxHeight: '600px' }}>
          {filteredJobSeekers.length > 0 ? (
            filteredJobSeekers.map(jobSeeker => (
              <div
                key={jobSeeker.id}
                className={`job-listing p-4 border border-gray-300 rounded-lg shadow-sm cursor-pointer transition-all ${selectedJobSeeker?.id === jobSeeker.id ? 'bg-[#c5cae8] border-[#475299]' : 'hover:bg-gray-100'}`}
                onClick={() => setSelectedJobSeeker(jobSeeker)}
              >
                <img src={jobSeeker.photo} alt="Profile" className="w-12 h-12 rounded-full mb-2" />
                <h2 className="text-xl font-semibold text-[#475299]">{jobSeeker.name}</h2>
                <p className="text-gray-600">Location: {jobSeeker.location}</p>
                <p className="text-gray-600">{jobSeeker.workPreference}</p>
                <p className="text-sm text-gray-500">Skills: {jobSeeker.skills.join(', ').length > 50 ? jobSeeker.skills.slice(0, 3).join(', ') + '...' : jobSeeker.skills.join(', ')}</p>
                <p className="text-sm text-gray-500">Job Type: {jobSeeker.jobType}</p>
              </div>
            ))
          ) : (
            <p>No job seekers found.</p>
          )}
        </div>

        {/* Job Seeker Details */}
        <div className="job-details w-1/2 pl-4 border-l border-gray-200 overflow-auto" style={{ maxHeight: '600px' }}>
          {selectedJobSeeker ? (
            <div className="p-4">
              <img src={selectedJobSeeker.photo} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
              <h2 className="text-2xl font-bold text-[#475299] mb-2">{selectedJobSeeker.name}</h2>
              <p className="text-gray-600 mb-4">Location: {selectedJobSeeker.location}</p>
              <p className="text-gray-600 mb-4">Work Preference: {selectedJobSeeker.workPreference}</p>
              <p className="mb-4 text-lg">Skills: {selectedJobSeeker.skills.join(', ')}</p>
              <p className="font-bold text-xl text-[#475299]">Job Type: {selectedJobSeeker.jobType}</p>
              <button className="mt-4 bg-[#475299] text-white px-4 py-2 rounded-full shadow hover:bg-[#3b4b8e] transition-all">
                Message
              </button>
            </div>
          ) : (
            <p>Select a job seeker to see details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerStudentSearchPage;
