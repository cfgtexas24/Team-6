import { FC, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

// Job interface
interface Job {
  id: number;
  title: string;
  company: string;
  type: 'intern' | 'full-time' | 'part-time';
  description: string;
  hourlyPay: number;
  logo: string;
  applicationLink: string; // Added application link
}

const CreateJobs: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState<'all' | 'intern' | 'full-time' | 'part-time'>('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newJob, setNewJob] = useState<Omit<Job, 'id' | 'logo'>>({
    title: '',
    company: '',
    type: 'intern',
    description: '',
    hourlyPay: 0,
    applicationLink: '', // Initialize application link
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
      logo: 'https://via.placeholder.com/40x40.png?text=New', // Placeholder logo
    };
    setJobs([...jobs, newJobEntry]);
    setNewJob({ title: '', company: '', type: 'intern', description: '', hourlyPay: 0, applicationLink: '' }); // Reset form
    setIsCreating(false);
  };

  const handleDeleteJob = (id: number) => {
    setJobs(jobs.filter((job) => job.id !== id));
    if (selectedJob?.id === id) setSelectedJob(null);
  };

  return (
    <div className="job-board flex flex-col p-8 bg-white">
      <h1 className="text-4xl font-bold text-[#475299] mb-6">Job Listing Manager</h1>

      {/* Search / Filter */}
      <div className="flex mb-6">
        <div className="relative w-1/3 mr-4">
          <input
            type="text"
            placeholder="Search for jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-full p-3 pl-5 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#475299] transition-all"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2 pl-96">
          {['all', 'intern', 'full-time', 'part-time'].map((type) => (
            <button
              key={type}
              onClick={() => setJobType(type as any)}
              className={`w-28 px-4 py-3 rounded-full transition-all ${
                jobType === type ? 'bg-[#475299] text-white font-bold shadow-lg' : 'bg-white border border-gray-300'
              } hover:bg-[#475299] hover:text-white`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Add Job Button */}
      <button
        onClick={() => setIsCreating(true)}
        className="bg-[#475299] text-white px-4 py-2 rounded-full hover:bg-[#38417a] mb-4"
      >
        Add Job
      </button>

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
                className={`job-listing p-4 border border-gray-300 rounded-lg shadow-sm cursor-pointer transition-all ${
                  selectedJob?.id === job.id ? 'bg-[#c5cae8] border-[#475299]' : 'hover:bg-gray-100'
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
                  <button onClick={() => handleDeleteJob(job.id)} className="text-red-600 ml-auto bg-white border-0 rounded-full w-6 h-6 pr-8">
                    <CancelIcon></CancelIcon>
                  </button>
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
              <p className="mb-4 text-lg">{selectedJob.description}</p>
              <p className="font-bold text-xl text-[#475299]">Hourly Pay: ${selectedJob.hourlyPay}</p>
              <a href={selectedJob.applicationLink} target="_blank" rel="noopener noreferrer" className="mt-4 bg-[#475299] text-white px-4 py-2 rounded-full shadow hover:bg-[#3b4b8e] transition-all no-underline">
                Apply Now
              </a>
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
                value={newJob.title}
                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Company:</label>
              <input
                type="text"
                value={newJob.company}
                onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Description:</label>
              <textarea
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                className="border border-gray-300 rounded p-2 w-full h-24"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Hourly Pay:</label>
              <input
                type="number"
                value={newJob.hourlyPay}
                onChange={(e) => setNewJob({ ...newJob, hourlyPay: parseFloat(e.target.value) })}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Application Link:</label>
              <input
                type="url"
                value={newJob.applicationLink}
                onChange={(e) => setNewJob({ ...newJob, applicationLink: e.target.value })}
                className="border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsCreating(false)}
                className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateJob}
                className="bg-[#475299] text-white px-4 py-2 rounded hover:bg-[#38417a]"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateJobs;