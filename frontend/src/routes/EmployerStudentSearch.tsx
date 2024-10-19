import { FC, useState, useEffect } from "react";
import EmployerNavBar from "../components/EmployerNavBar";

const EmployerStudentSearchPage: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState<string[]>([]);
  const [location, setLocation] = useState<string[]>([]);
  const [workPreference, setWorkPreference] = useState<string[]>([]);
  const [skillsCategory, setSkillsCategory] = useState<
    "all" | "technical" | "languages" | "certifications" | "soft skills"
  >("all");
  const [selectedSkill, setSelectedSkill] = useState<string[]>([]);
  const [selectedJobSeeker, setSelectedJobSeeker] = useState<any | null>(null);
  const [dropdownStates, setDropdownStates] = useState<{
    [key: string]: boolean;
  }>({
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

  const jobSeekers = [
    {
      id: 1,
      name: "John Doe",
      location: "San Francisco, CA",
      workPreference: "remote",
      skills: ["Java", "Teamwork", "Leadership"],
      jobType: "full-time",
      photo: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Jane Smith",
      location: "Los Angeles, CA",
      workPreference: "on-site",
      skills: ["Python", "Adaptability", "Critical Thinking"],
      jobType: "internship",
      photo: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Bob Johnson",
      location: "Chicago, IL",
      workPreference: "hybrid",
      skills: ["C++", "Problem Solving", "Communication"],
      jobType: "part-time",
      photo: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Alice Brown",
      location: "Austin, TX",
      workPreference: "remote",
      skills: ["JavaScript", "Creativity", "Collaboration"],
      jobType: "full-time",
      photo: "https://via.placeholder.com/150",
    },
  ];

  const filteredJobSeekers = jobSeekers.filter((jobSeeker) => {
    const jobTypeMatches =
      jobType.length === 0 || jobType.includes(jobSeeker.jobType);
    const locationMatches =
      location.length === 0 || location.includes(jobSeeker.location);
    const workPreferenceMatches =
      workPreference.length === 0 ||
      workPreference.includes(jobSeeker.workPreference);

    let skillsMatch = true;
    if (selectedSkill.length > 0) {
      skillsMatch = selectedSkill.every((skill) => {
        const technicalSkills = [
          "Java",
          "Python",
          "JavaScript",
          "C++",
          "C#",
          "Ruby",
          "Swift",
          "PHP",
        ];
        return technicalSkills.some((techSkill) =>
          jobSeeker.skills.includes(techSkill),
        );
      });
    }

    const searchTermMatches = jobSeeker.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return (
      jobTypeMatches &&
      locationMatches &&
      workPreferenceMatches &&
      skillsMatch &&
      searchTermMatches
    );
  });

  useEffect(() => {
    if (
      selectedJobSeeker &&
      !filteredJobSeekers.some(
        (jobSeeker) => jobSeeker.id === selectedJobSeeker.id,
      )
    ) {
      setSelectedJobSeeker(null);
    }
  }, [filteredJobSeekers, selectedJobSeeker]);

  const toggleSelection = (
    value: string,
    list: string[],
    setList: (list: string[]) => void,
  ) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const toggleDropdown = (dropdownKey: string) => {
    setDropdownStates((prev) => ({
      ...prev,
      [dropdownKey]: !prev[dropdownKey],
    }));
  };

  const FilterDropdown: FC<{
    title: string;
    options: string[];
    selected: string[];
    setSelected: (value: string[]) => void;
    dropdownKey: string;
  }> = ({ title, options, selected, setSelected, dropdownKey }) => {
    return (
      <div className="relative">
        <button
          onClick={() => toggleDropdown(dropdownKey)}
          className="border border-gray-300 rounded-full p-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FEC10E] transition-all"
        >
          {title}
        </button>

        {dropdownStates[dropdownKey] && (
          <div className="absolute mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
            {options.map((option) => (
              <div key={option} className="mb-2">
                <label className="block">
                  <input
                    type="checkbox"
                    value={option}
                    onChange={() =>
                      toggleSelection(option, selected, setSelected)
                    }
                    checked={selected.includes(option)}
                    className="mr-2"
                  />
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
              </div>
            ))}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setSelected([])}
                className="text-sm text-yellow-500"
              >
                Clear
              </button>
              <button
                onClick={() => toggleDropdown(dropdownKey)}
                className="bg-[#FEC10E] text-white px-4 py-2 rounded-full shadow hover:bg-[#e0a90c] transition-all"
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
    <>
      <EmployerNavBar />
      <div className="job-board flex flex-col p-8 bg-gray-50 border border-gray-200 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-[#FEC10E] mb-6">Job Seekers</h1>

        {/* Search / Filter */}
        <div className="flex mb-6">
          {/* Search Bar */}
          <div className="relative w-3/4 mr-4">
            <input
              type="text"
              placeholder="Search for job seekers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-full p-3 pl-5 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FEC10E] transition-all"
            />
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex mb-6 space-x-4">
          <FilterDropdown
            title="Skills"
            options={[
              "technical",
              "languages",
              "certifications",
              "soft skills",
              "other",
            ]}
            selected={selectedSkill}
            setSelected={setSelectedSkill}
            dropdownKey="skills"
          />
          <FilterDropdown
            title="Job Type"
            options={["internship", "part-time", "full-time", "other"]}
            selected={jobType}
            setSelected={setJobType}
            dropdownKey="jobType"
          />
          <FilterDropdown
            title="Location"
            options={[
              "remote",
              "San Francisco, CA",
              "Los Angeles, CA",
              "Chicago, IL",
              "Austin, TX",
              "other",
            ]}
            selected={location}
            setSelected={setLocation}
            dropdownKey="location"
          />
          <FilterDropdown
            title="Work Preference"
            options={["hybrid", "remote", "on-site", "any", "other"]}
            selected={workPreference}
            setSelected={setWorkPreference}
            dropdownKey="workPreference"
          />
        </div>

        {/* Job Seeker Listings */}
        <div className="flex w-full">
          <div
            className="job-listings w-1/2 pr-4 overflow-auto space-y-4"
            style={{ maxHeight: "600px" }}
          >
            {filteredJobSeekers.length > 0 ? (
              filteredJobSeekers.map((jobSeeker) => (
                <div
                  key={jobSeeker.id}
                  className={`job-listing p-4 border border-gray-300 rounded-lg shadow-sm cursor-pointer transition-all ${
                    selectedJobSeeker?.id === jobSeeker.id
                      ? "bg-[#ffeb99] border-[#FEC10E]"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedJobSeeker(jobSeeker)}
                >
                  <img
                    src={jobSeeker.photo}
                    alt="Profile"
                    className="w-12 h-12 rounded-full mb-2"
                  />
                  <h2 className="text-xl font-semibold text-[#FEC10E]">
                    {jobSeeker.name}
                  </h2>
                  <p className="text-gray-600">
                    Location: {jobSeeker.location}
                  </p>
                  <p className="text-gray-600">{jobSeeker.workPreference}</p>
                  <p className="text-sm text-gray-500">
                    Skills:{" "}
                    {jobSeeker.skills.join(", ").length > 50
                      ? jobSeeker.skills.slice(0, 3).join(", ") + "..."
                      : jobSeeker.skills.join(", ")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Job Type: {jobSeeker.jobType}
                  </p>
                </div>
              ))
            ) : (
              <p>No job seekers found.</p>
            )}
          </div>

          {/* Job Seeker Details */}
          <div
            className="job-details w-1/2 pl-4 border-l border-gray-200 overflow-auto"
            style={{ maxHeight: "600px" }}
          >
            {selectedJobSeeker ? (
              <div className="p-4">
                <img
                  src={selectedJobSeeker.photo}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h2 className="text-2xl font-bold text-[#FEC10E] mb-2">
                  {selectedJobSeeker.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  Location: {selectedJobSeeker.location}
                </p>
                <p className="text-gray-600 mb-4">
                  Work Preference: {selectedJobSeeker.workPreference}
                </p>
                <p className="mb-4 text-lg">
                  Skills: {selectedJobSeeker.skills.join(", ")}
                </p>
                <p className="font-bold text-xl text-[#FEC10E]">
                  Job Type: {selectedJobSeeker.jobType}
                </p>
                <button className="mt-4 bg-[#FEC10E] text-white px-4 py-2 rounded-full shadow hover:bg-[#e0a90c] transition-all">
                  Message
                </button>
              </div>
            ) : (
              <p>Select a job seeker to see details.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerStudentSearchPage;
