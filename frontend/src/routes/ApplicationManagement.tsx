import { FC, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { SettingsApplications } from '@mui/icons-material';

// Job interface
interface Job {
  id: number;
  title: string;
  company: string;
  type: 'Intern' | 'Full-time' | 'Part-time';
  description: string;
  hourlyPay: number;
  logo: string;
  applicationLink: string;
}

const ApplicationManagement: FC = () => {
  // Default jobs array
  const defaultJobs: Job[] = [
    {
      id: 1,
      title: 'Software Engineer Intern',
      company: 'JPMorganChase',
      type: 'Intern',
      description: 'Applicants: 271\nPost date: 2024-10-10\nExperience: mid\nTotal views: 1200\nConversion rate: 20.8%\nAverage time to apply: 8 minutes\nDisabled applicanats: 30%',
      hourlyPay: 25,
      logo: 'https://via.placeholder.com/40x40.png?text=JP',
      applicationLink: 'https://techcorp.com/intern-apply',
    },
    {
      id: 2,
      title: 'Full-Stack Developer',
      company: 'JPMorganChase',
      type: 'Full-time',
      description: 'Applicants: 254\nPost date: 2024-10-10\nExperience: high\nTotal views: 1084\nConversion rate: 24.2%\nAverage time to apply: 6 minutes\nDisabled applicanats: 25%',
      hourlyPay: 45,
      logo: 'https://via.placeholder.com/40x40.png?text=JP',
      applicationLink: 'https://webinnovations.com/fullstack-apply',
    },
    {
      id: 3,
      title: 'Part-Time UI/UX Designer',
      company: 'JPMorganChase',
      type: 'Part-time',
      description: 'Applicants: 341\nPost date: 2024-10-10\nExperience: mid\nTotal views: 1675\nConversion rate: 21.8%\nAverage time to apply: 7 minutes\nDisabled applicanats: 34%',
      hourlyPay: 30,
      logo: 'https://via.placeholder.com/40x40.png?text=JP',
      applicationLink: 'https://creativeminds.com/uiux-apply',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState<'all' | 'Intern' | 'Full-time' | 'Part-time'>('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>(defaultJobs); // Initialized with default jobs
  const [isCreating, setIsCreating] = useState(false);
  const [newJob, setNewJob] = useState<Omit<Job, 'id' | 'logo'>>({
    title: '',
    company: '',
    type: 'Intern', // Default job type set to 'intern'
    description: '',
    hourlyPay: 0,
    applicationLink: '',
  });

  // Filter jobs based on type and search term
  const filteredJobs = jobs.filter(
    (job) =>
      (jobType === 'all' || job.type === jobType) &&
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateJob = () => {
    const newJobEntry = {
      ...newJob,
      id: jobs.length + 1,
      logo: 'https://via.placeholder.com/40x40.png?text=New',
      applicationLink: validateUrl(newJob.applicationLink),
    };
    setJobs([...jobs, newJobEntry]);
    setNewJob({ title: '', company: '', type: 'Intern', description: '', hourlyPay: 0, applicationLink: '' }); // Reset form
    setIsCreating(false);
  };

  // Ensure valid URL (if the user doesn't include 'http' or 'https', we add it)
  const validateUrl = (url: string) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <div className="job-board flex flex-col p-8 bg-white">
      <h1 className="text-4xl font-bold text-[#475299] mb-6">Job Listing Analytics</h1>

      {/* Search / Filter */}
      <div className="flex mb-6">
        <div className="relative w-3/4 mr-4">
          <input
            type="text"
            placeholder="Search for jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/2 space-x-4 border border-gray-300 rounded-full p-3 pl-5 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#475299] transition-all"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2">
          {['All', 'Intern', 'Full-time', 'Part-time'].map((type) => (
            <button
              key={type}
              onClick={() => setJobType(type as any)}
              className={`w-28 px-4 py-3 rounded-full transition-all ${jobType === type ? 'bg-[#475299] text-white font-bold shadow-lg' : 'bg-white border border-gray-300'
                } hover:bg-[#475299] hover:text-white`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Divider Line */}
      <hr className="border-t w-full border-gray-300 mb-6" />

      {/* Job Listings / Job Details */}
      <div className="flex w-full">
        {/* Job Listings */}
        <div className="job-listings w-1/2 pr-4 overflow-auto space-y-4" style={{ maxHeight: '600px' }}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className={`job-listing p-4 border border-gray-300 rounded-lg shadow-sm cursor-pointer transition-all ${selectedJob?.id === job.id ? 'bg-[#c5cae8] border-[#475299]' : 'hover:bg-gray-100'
                  }`}
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-[#475299]">{job.title}</h2>
                    <p className="text-gray-600">{job.company}</p>
                    <p className="text-sm text-gray-500">{job.type}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No jobs listed.</p>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="border-l border-gray-300 mx-4"></div>

        {/* Job Details */}
        <div className="job-details w-1/2 pl-4 overflow-auto" style={{ maxHeight: '600px' }}>
          {selectedJob ? (
            <div className="p-4">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={selectedJob.logo}
                  alt={`${selectedJob.company} logo`}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-bold text-[#475299]">{selectedJob.title}</h2>
                  <p className="text-gray-600">{selectedJob.company}</p>
                </div>
              </div>
              <pre className="mb-4 text-lg">
                {selectedJob.description}
              </pre>
              <p className="font-bold text-xl text-[#475299]">Hourly Pay: ${selectedJob.hourlyPay}</p>
            </div>
          ) : (
            <p>Select a job to see details.</p>
          )}
        </div>
      </div>

      {/* Create Job Popup */}
      {isCreating && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h4 className="text-lg font-bold mb-2">Create Job</h4>
            <div className="mb-4">
              <label className="block mb-1">Role:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={newJob.title}
                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Company:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={newJob.company}
                onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Type:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={newJob.type}
                onChange={(e) => setNewJob({ ...newJob, type: e.target.value as 'Intern' | 'Full-time' | 'Part-time' })}
              >
                <option value="Intern">Intern</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Description:</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Hourly Pay:</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                value={newJob.hourlyPay}
                onChange={(e) => setNewJob({ ...newJob, hourlyPay: parseFloat(e.target.value) })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Application Link:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={newJob.applicationLink}
                onChange={(e) => setNewJob({ ...newJob, applicationLink: e.target.value })}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCreateJob}
                className="bg-[#475299] text-white px-4 py-2 rounded shadow hover:bg-[#3b4b8e]"
              >
                Create
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationManagement;
