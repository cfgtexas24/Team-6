import { FC, useState } from 'react';

const JobBoard: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState<'all' | 'intern' | 'full-time' | 'part-time'>('all');
  const [selectedJob, setSelectedJob] = useState<any | null>(null);

  //mock data
  const jobs = [
    { id: 1, title: 'Software Engineer', company: 'Company A', type: 'full-time', description: 'Develop and maintain software applications.', hourlyPay: 40 },
    { id: 2, title: 'Data Analyst', company: 'Company B', type: 'intern', description: 'Analyze data and generate reports.', hourlyPay: 20 },
    { id: 3, title: 'Web Developer', company: 'Company C', type: 'part-time', description: 'Build and design user-friendly websites.', hourlyPay: 30 },
    { id: 4, title: 'Product Manager', company: 'Company D', type: 'full-time', description: 'Oversee product development and strategy.', hourlyPay: 50 },
  ];

  const filteredJobs = jobs.filter(job => 
    (jobType === 'all' || job.type === jobType) &&
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="job-board flex flex-col p-6 bg-white border-2 border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>

      {/* Search / Filter */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search for jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-full p-3 w-3/4 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex space-x-2">
          <button
            onClick={() => setJobType('all')}
            className={`w-28 px-4 py-3 rounded-full ${jobType === 'all' ? 'bg-[#475299] text-white font-bold' : 'bg-white'}`}
          >
            All
          </button>
          <button
            onClick={() => setJobType('intern')}
            className={`w-28 px-4 py-3 rounded-full ${jobType === 'intern' ? 'bg-[#475299] text-white font-bold' : 'bg-white'}`}
          >
            Intern
          </button>
          <button
            onClick={() => setJobType('full-time')}
            className={`w-28 px-4 py-3 rounded-full ${jobType === 'full-time' ? 'bg-[#475299] text-white font-bold' : 'bg-white'}`}
          >
            Full-Time
          </button>
          <button
            onClick={() => setJobType('part-time')}
            className={`w-28 px-4 py-3 rounded-full ${jobType === 'part-time' ? 'bg-[#475299] text-white font-bold' : 'bg-white'}`}
          >
            Part-Time
          </button>
        </div>
      </div>

      {/* Job Listings / Job Details */}
      <div className="flex w-full">
        <div className="job-listings w-1/2 pr-4 overflow-auto" style={{ maxHeight: '600px' }}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div 
                key={job.id} 
                className={`job-listing p-4 border-b border-gray-300 cursor-pointer ${selectedJob?.id === job.id ? 'bg-[#c5cae8]' : 'hover:bg-gray-100'}`}
                onClick={() => setSelectedJob(job)}
              >
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-sm text-gray-500">{job.type}</p>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>

        <div className="job-details w-1/2 pl-4 border-l border-gray-200 overflow-auto" style={{ maxHeight: '600px' }}>
          {selectedJob ? (
            <div>
              <h2 className="text-xl font-bold">{selectedJob.title}</h2>
              <p className="text-gray-600 mb-2">{selectedJob.company}</p>
              <p className="mb-2">{selectedJob.description}</p>
              <p className="font-bold">Hourly Pay: ${selectedJob.hourlyPay}</p>
            </div>
          ) : (
            <p>Select a job to see details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobBoard;