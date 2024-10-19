import { FC, useState } from 'react';

const JobBoard: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState<'all' | 'intern' | 'full-time' | 'part-time'>('all');
  const [selectedJob, setSelectedJob] = useState<any | null>(null);

  // Mock data with logo URLs
  const jobs = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Company A',
      type: 'full-time',
      description: 'Develop and maintain software applications.',
      hourlyPay: 40,
      logo: 'https://via.placeholder.com/40x40.png?text=A',
    },
    {
      id: 2,
      title: 'Data Analyst',
      company: 'Company B',
      type: 'intern',
      description: 'Analyze data and generate reports.',
      hourlyPay: 20,
      logo: 'https://via.placeholder.com/40x40.png?text=B',
    },
    {
      id: 3,
      title: 'Web Developer',
      company: 'Company C',
      type: 'part-time',
      description: 'Build and design user-friendly websites.',
      hourlyPay: 30,
      logo: 'https://via.placeholder.com/40x40.png?text=C',
    },
    {
      id: 4,
      title: 'Product Manager',
      company: 'Company D',
      type: 'full-time',
      description: 'Oversee product development and strategy.',
      hourlyPay: 50,
      logo: 'https://via.placeholder.com/40x40.png?text=D',
    },
  ];

  const filteredJobs = jobs.filter(
    (job) =>
      (jobType === 'all' || job.type === jobType) &&
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="job-board flex flex-col p-8 bg-white">
      <h1 className="text-4xl font-bold text-[#475299] mb-6">Jobs</h1>

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
                </div>
              </div>
            ))
          ) : (
            <p>No jobs found.</p>
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
              <button className="mt-4 bg-[#475299] text-white px-4 py-2 rounded-full shadow hover:bg-[#3b4b8e] transition-all">
                Apply Now
              </button>
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
