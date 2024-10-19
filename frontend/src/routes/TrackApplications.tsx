import { FC } from "react";

//example job interface
interface JobApplication {
  id: number;
  title: string;
  company: string;
  status: string; //e.g., 'Applied', 'Interviewing', 'Offer', 'Hired'
  dateApplied: string;
}

const TrackApplications: FC = () => {
  //example list of job applications
  const jobApplications: JobApplication[] = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Google',
      status: 'Applied',
      dateApplied: '2024-10-10',
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Meta',
      status: 'Interviewing',
      dateApplied: '2024-09-28',
    },
    {
      id: 3,
      title: 'Backend Developer',
      company: 'Amazon',
      status: 'Offer',
      dateApplied: '2024-10-05',
    },
  ];

  // Define step percentages based on the status
  const getProgress = (status: string) => {
    switch (status) {
      case 'Applied':
        return 25;
      case 'Interviewing':
        return 50;
      case 'Offer':
        return 75;
      case 'Hired':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="w-full p-8">
      <h1 className="text-center text-4xl font-bold text-[#FEC10E] mb-6">
        Your Applications 
      </h1>

      <hr className="w-full border-t border-gray-300 my-4"></hr>

      {/* Job Applications List */}
      <div className="application-list space-y-4">
        {jobApplications.length > 0 ? (
          jobApplications.map((job) => (
            <div
              key={job.id}
              className="p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-all"
            >
              <h2 className="text-xl font-semibold text-[#475299]">
                {job.title}
              </h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500">
                Status: <span className="font-bold">{job.status}</span>
              </p>
              <p className="text-gray-500">
                Applied on: {new Date(job.dateApplied).toLocaleDateString()}
              </p>

            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No applications yet.</p>
        )}
      </div>
    </div>  
  );
};

export default TrackApplications;
