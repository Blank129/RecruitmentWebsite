"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  getJobs,
  updateJobStatus,
  updateJobStatusReject,
} from "../service/api";

// Define the job posting interface based on your API response
interface JobPosting {
  id: string;
  title: string;
  location: string;
  description: string;
  member_post: string;
  status: boolean; // For existence check
  submited: boolean | null; // null = pending, true = approved, false = rejected
  members: number | null;
  id_type_recruit: number;
  salary: string;
  created_on: string;
  updated_at: string;
  deadline: string;
  experience: string | null;
  company: string | null;
  posted: string | null;
  education: string | null;
  type_recruit: {
    id: number;
    name: string;
    status: boolean;
    created_on: string;
    updated_at: string;
  };
  users: {
    name: string;
  };
}

interface ApiResponse {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  data: JobPosting[];
}

type JobContextType = {
  jobPostings: JobPosting[];
  loading: boolean;
  error: string | null;
  handleGetJobs: () => Promise<void>;
  handleApproveJob: (jobId: string) => Promise<void>;
  handleRejectJob: (jobId: string) => Promise<void>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
  setPagination: React.Dispatch<
    React.SetStateAction<{
      page: number;
      limit: number;
      total: number;
      total_pages: number;
    }>
  >;
};

const JobContexts = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 1,
  });

  const handleGetJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getJobs();
      if (res) {
        setJobPostings(res.data);
        setPagination({
          page: res.page,
          limit: res.limit,
          total: res.total,
          total_pages: res.total_pages,
        });
      }
    } catch (error) {
      console.error("Error handleGetJobs", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Không thể tải danh sách công việc. Vui lòng kiểm tra kết nối mạng và server backend."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApproveJob = async (jobId: string) => {
    try {
      setError(null);
      await updateJobStatus(jobId, true);

      // Update local state - set submited to true for approved jobs
      setJobPostings((prev) =>
        prev.map((job) =>
          job.id === jobId
            ? { ...job, submited: true, updated_at: new Date().toISOString() }
            : job
        )
      );

      alert("Đã duyệt tin tuyển dụng thành công!");
    } catch (error) {
      console.error("Error handleApproveJob", error);
      setError("Không thể cập nhật trạng thái công việc");
    }
  };

  const handleRejectJob = async (jobId: string) => {
    try {
      setError(null);
      await updateJobStatusReject(jobId, false);

      // Update local state - set submited to false for rejected jobs
      setJobPostings((prev) =>
        prev.map((job) =>
          job.id === jobId
            ? { ...job, submited: false, updated_at: new Date().toISOString() }
            : job
        )
      );

      alert("Đã từ chối tin tuyển dụng thành công!");
    } catch (error) {
      console.error("Error handleRejectJob", error);
      setError("Không thể cập nhật trạng thái công việc");
    }
  };

  useEffect(() => {
    handleGetJobs();
  }, []);

  return (
    <JobContexts.Provider
      value={{
        jobPostings,
        loading,
        error,
        handleGetJobs,
        handleApproveJob,
        handleRejectJob,
        pagination,
        setPagination,
      }}
    >
      {children}
    </JobContexts.Provider>
  );
};

export const JobContext = (): JobContextType => {
  const context = useContext(JobContexts);
  if (!context) {
    throw new Error("JobContext must be used within a JobProvider");
  }
  return context;
};
