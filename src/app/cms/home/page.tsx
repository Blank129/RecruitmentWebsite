"use client";
import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Calendar,
  User,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MapPin,
  Building,
  DollarSign,
  Users,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { JobProvider, JobContext } from "../../../context/jobContext";

// Transform API job data to display format
interface DisplayJobPosting {
  id: string;
  title: string;
  location: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  company: string;
  salary: string;
  experience: string;
  created_on: string;
  updated_at: string;
  deadline: string;
  type_recruit: string;
  member_post: string;
  poster_name: string;
}

export default function HomeCmsPageContent() {
  const {
    jobPostings,
    loading,
    error,
    handleApproveJob,
    handleRejectJob,
    pagination,
  } = JobContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedJob, setSelectedJob] = useState<DisplayJobPosting | null>(
    null
  );

  // Transform API data to display format with new status logic
  const displayJobs: DisplayJobPosting[] = useMemo(() => {
    return jobPostings.map((job) => {
      // null = pending, true = approved, false = rejected
      let status: "pending" | "approved" | "rejected";
      if (job.submited === null) {
        status = "pending";
      } else if (job.submited === true) {
        status = "approved";
      } else {
        status = "rejected";
      }

      return {
        id: job.id,
        title: job.title,
        location: job.location,
        description: job.description,
        status,
        company: job.company || "Chưa cập nhật",
        salary: job.salary || "Thỏa thuận",
        experience: job.experience || "Không yêu cầu",
        created_on: job.created_on,
        updated_at: job.updated_at,
        deadline: job.deadline,
        type_recruit: job.type_recruit.name,
        member_post: job.member_post,
        poster_name: job.users.name,
      };
    });
  }, [jobPostings]);

  const filteredJobs = useMemo(() => {
    return displayJobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [displayJobs, searchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case "approved":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "rejected":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "pending":
        return `${baseClasses} bg-amber-100 text-amber-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-amber-600" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusCounts = useMemo(() => {
    return displayJobs.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [displayJobs]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                Job Posting CMS
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin Dashboard</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Đang chờ</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {statusCounts.pending || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Đã duyệt</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {statusCounts.approved || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Đã từ chối</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {statusCounts.rejected || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tổng số</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {pagination.total}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tiêu đề, mô tả, công ty hoặc địa điểm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="sm:w-48">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="pending">Đang chờ</option>
                    <option value="approved">Đã duyệt</option>
                    <option value="rejected">Đã từ chối</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Danh sách tin tuyển dụng ({filteredJobs.length})
            </h2>
          </div>

          <div className="overflow-hidden">
            {filteredJobs.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {job.title}
                          </h3>
                          <span className={getStatusBadge(job.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(job.status)}
                              <span className="capitalize">
                                {job.status === "pending"
                                  ? "Đang chờ"
                                  : job.status === "approved"
                                  ? "Đã duyệt"
                                  : "Đã từ chối"}
                              </span>
                            </span>
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mb-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {job.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {job.description}
                        </p>

                        <div className="flex items-center text-xs text-gray-500 gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Tạo: {formatDate(job.created_on)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Hạn: {formatDate(job.deadline)}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            Người đăng: {job.poster_name}
                          </span>
                          <span className="flex items-center gap-1">
                            ID: {job.id}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => setSelectedJob(job)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-150"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Xem
                        </button>

                        {job.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleApproveJob(job.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-150"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Duyệt
                            </button>
                            <button
                              onClick={() => handleRejectJob(job.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-150"
                            >
                              <XCircle className="w-3 h-3 mr-1" />
                              Từ chối
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Không tìm thấy tin tuyển dụng
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Chi tiết tin tuyển dụng
              </h3>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID
                    </label>
                    <p className="text-sm text-gray-900 font-mono">
                      {selectedJob.id}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trạng thái
                    </label>
                    <span className={getStatusBadge(selectedJob.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(selectedJob.status)}
                        <span className="capitalize">
                          {selectedJob.status === "pending"
                            ? "Đang chờ"
                            : selectedJob.status === "approved"
                            ? "Đã duyệt"
                            : "Đã từ chối"}
                        </span>
                      </span>
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiêu đề công việc
                  </label>
                  <p className="text-sm text-gray-900 font-medium">
                    {selectedJob.title}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Công ty
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedJob.company}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Địa điểm
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedJob.location}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mức lương
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedJob.salary}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kinh nghiệm
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedJob.experience}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loại hình
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedJob.type_recruit}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID người đăng
                    </label>
                    <p className="text-sm text-gray-900 font-mono">
                      {selectedJob.member_post}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên người đăng
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedJob.poster_name}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả công việc
                  </label>
                  <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {selectedJob.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ngày tạo
                    </label>
                    <p className="text-sm text-gray-900">
                      {formatDate(selectedJob.created_on)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hạn nộp hồ sơ
                    </label>
                    <p className="text-sm text-gray-900">
                      {formatDate(selectedJob.deadline)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {selectedJob.status === "pending" && (
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => {
                    handleRejectJob(selectedJob.id);
                    setSelectedJob(null);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-150"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Từ chối
                </button>
                <button
                  onClick={() => {
                    handleApproveJob(selectedJob.id);
                    setSelectedJob(null);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-150"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Duyệt tin
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// export default function HomeCmsPage() {
//   return (
//     <JobProvider>
//       <HomeCmsPageContent />
//     </JobProvider>
//   );
// }

// "use client";
// import React, { useState, useMemo } from "react";
// import {
//   Search,
//   Filter,
//   Calendar,
//   User,
//   FileText,
//   CheckCircle,
//   XCircle,
//   Clock,
//   Eye,
// } from "lucide-react";

// interface JobPosting {
//   id: string;
//   requirement_description: string;
//   status: "pending" | "approved" | "rejected";
//   position: string;
//   created_on: string;
//   updated_at: string;
// }

// const mockJobPostings: JobPosting[] = [
//   {
//     id: "JP001",
//     requirement_description:
//       "Cần tuyển Vệ Sĩ có kinh nghiệm làm việc trong lĩnh vực bảo vệ. Yêu cầu có kiến thức về an ninh, kỹ năng giao tiếp tốt và khả năng xử lý tình huống khẩn cấp.",
//     status: "pending",
//     position: "Vệ Sĩ",
//     created_on: "2025-01-15T10:30:00Z",
//     updated_at: "2025-01-15T10:30:00Z",
//   },
//   {
//     id: "JP002",
//     requirement_description:
//       "Vệ Sĩ cần thiết cho một sự kiện lớn. Phải có khả năng làm việc theo nhóm và chịu áp lực cao. Có kinh nghiệm trong lĩnh vực bảo vệ sự kiện là một lợi thế.",
//     status: "approved",
//     position: "Vệ Sĩ Sự Kiện",
//     created_on: "2025-01-14T14:20:00Z",
//     updated_at: "2025-01-15T09:15:00Z",
//   },
//   {
//     id: "JP003",
//     requirement_description:
//       "Tuyển Vệ Sĩ cho một công ty bảo vệ. Yêu cầu có sức khỏe tốt, không có tiền án tiền sự và có khả năng làm việc theo ca.",
//     status: "pending",
//     position: "Vệ Sĩ Công Ty",
//     created_on: "2025-01-13T16:45:00Z",
//     updated_at: "2025-01-13T16:45:00Z",
//   },
//   {
//     id: "JP004",
//     requirement_description:
//       "Cần tuyển Vệ Sĩ cho cá nhân. Yêu cầu có kinh nghiệm bảo vệ, kỹ năng tự vệ, và khả năng giao tiếp tốt với khách hàng.",
//     status: "rejected",
//     position: "Vệ Sĩ Cá Nhân",
//     created_on: "2025-01-12T11:00:00Z",
//     updated_at: "2025-01-14T15:30:00Z",
//   },
//   {
//     id: "JP005",
//     requirement_description:
//       "Tuyển Vệ Sĩ làm việc tại các sự kiện thể thao. Yêu cầu có khả năng làm việc dưới áp lực và có kỹ năng quan sát tốt.",
//     status: "pending",
//     position: "Vệ Sĩ Thể Thao",
//     created_on: "2025-01-11T13:20:00Z",
//     updated_at: "2025-01-11T13:20:00Z",
//   },
//   {
//     id: "JP006",
//     requirement_description:
//       "Vệ Sĩ cần thiết cho một khách sạn. Phải có khả năng phát hiện những tình huống nghi ngờ và xử lý an toàn khách hàng.",
//     status: "approved",
//     position: "Vệ Sĩ Khách Sạn",
//     created_on: "2025-01-10T09:30:00Z",
//     updated_at: "2025-01-12T10:45:00Z",
//   },
// ];
// export default function HomeCmsPage() {
//   const [jobPostings, setJobPostings] = useState<JobPosting[]>(mockJobPostings);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

//   const filteredJobs = useMemo(() => {
//     return jobPostings.filter((job) => {
//       const matchesSearch =
//         job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         job.requirement_description
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase());
//       const matchesStatus =
//         statusFilter === "all" || job.status === statusFilter;
//       return matchesSearch && matchesStatus;
//     });
//   }, [jobPostings, searchTerm, statusFilter]);

//   const updateJobStatus = (
//     jobId: string,
//     newStatus: "approved" | "rejected"
//   ) => {
//     setJobPostings((prev) =>
//       prev.map((job) =>
//         job.id === jobId
//           ? { ...job, status: newStatus, updated_at: new Date().toISOString() }
//           : job
//       )
//     );
//   };

//   const getStatusBadge = (status: string) => {
//     const baseClasses =
//       "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
//     switch (status) {
//       case "approved":
//         return `${baseClasses} bg-green-100 text-green-800`;
//       case "rejected":
//         return `${baseClasses} bg-red-100 text-red-800`;
//       case "pending":
//         return `${baseClasses} bg-amber-100 text-amber-800`;
//       default:
//         return `${baseClasses} bg-gray-100 text-gray-800`;
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "approved":
//         return <CheckCircle className="w-4 h-4 text-green-600" />;
//       case "rejected":
//         return <XCircle className="w-4 h-4 text-red-600" />;
//       case "pending":
//         return <Clock className="w-4 h-4 text-amber-600" />;
//       default:
//         return null;
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("vi-VN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const statusCounts = useMemo(() => {
//     return jobPostings.reduce((acc, job) => {
//       acc[job.status] = (acc[job.status] || 0) + 1;
//       return acc;
//     }, {} as Record<string, number>);
//   }, [jobPostings]);
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <FileText className="w-8 h-8 text-blue-600" />
//               <h1 className="ml-3 text-xl font-semibold text-gray-900">
//                 Job Posting CMS
//               </h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <span className="text-sm text-gray-600">Admin Dashboard</span>
//               <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//                 <User className="w-4 h-4 text-white" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <Clock className="w-8 h-8 text-amber-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Pending</p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {statusCounts.pending || 0}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <CheckCircle className="w-8 h-8 text-green-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Approved</p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {statusCounts.approved || 0}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <XCircle className="w-8 h-8 text-red-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Rejected</p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {statusCounts.rejected || 0}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <FileText className="w-8 h-8 text-blue-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Total Jobs</p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {jobPostings.length}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search and Filter */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
//           <div className="p-6">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Tìm kiếm theo vị trí hoặc mô tả..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <div className="sm:w-48">
//                 <div className="relative">
//                   <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <select
//                     value={statusFilter}
//                     onChange={(e) => setStatusFilter(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
//                   >
//                     <option value="all">Tất cả trạng thái</option>
//                     <option value="pending">Đang chờ</option>
//                     <option value="approved">Đã duyệt</option>
//                     <option value="rejected">Đã từ chối</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Job Listings */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-lg font-medium text-gray-900">
//               Danh sách tin tuyển dụng ({filteredJobs.length})
//             </h2>
//           </div>

//           <div className="overflow-hidden">
//             {filteredJobs.length > 0 ? (
//               <div className="divide-y divide-gray-200">
//                 {filteredJobs.map((job) => (
//                   <div
//                     key={job.id}
//                     className="p-6 hover:bg-gray-50 transition-colors duration-150"
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-3 mb-2">
//                           <h3 className="text-lg font-medium text-gray-900 truncate">
//                             {job.position}
//                           </h3>
//                           <span className={getStatusBadge(job.status)}>
//                             <span className="flex items-center gap-1">
//                               {getStatusIcon(job.status)}
//                               <span className="capitalize">
//                                 {job.status === "pending"
//                                   ? "Đang chờ"
//                                   : job.status === "approved"
//                                   ? "Đã duyệt"
//                                   : "Đã từ chối"}
//                               </span>
//                             </span>
//                           </span>
//                         </div>

//                         <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//                           {job.requirement_description}
//                         </p>

//                         <div className="flex items-center text-xs text-gray-500 gap-4">
//                           <span className="flex items-center gap-1">
//                             <Calendar className="w-3 h-3" />
//                             Tạo: {formatDate(job.created_on)}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Calendar className="w-3 h-3" />
//                             Cập nhật: {formatDate(job.updated_at)}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             ID: {job.id}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-2 ml-4">
//                         <button
//                           onClick={() => setSelectedJob(job)}
//                           className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-150"
//                         >
//                           <Eye className="w-3 h-3 mr-1" />
//                           Xem
//                         </button>

//                         {job.status === "pending" && (
//                           <>
//                             <button
//                               onClick={() =>
//                                 updateJobStatus(job.id, "approved")
//                               }
//                               className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-150"
//                             >
//                               <CheckCircle className="w-3 h-3 mr-1" />
//                               Duyệt
//                             </button>
//                             <button
//                               onClick={() =>
//                                 updateJobStatus(job.id, "rejected")
//                               }
//                               className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-150"
//                             >
//                               <XCircle className="w-3 h-3 mr-1" />
//                               Từ chối
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <FileText className="mx-auto h-12 w-12 text-gray-400" />
//                 <h3 className="mt-2 text-sm font-medium text-gray-900">
//                   Không tìm thấy tin tuyển dụng
//                 </h3>
//                 <p className="mt-1 text-sm text-gray-500">
//                   Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Job Detail Modal */}
//       {selectedJob && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
//               <h3 className="text-lg font-medium text-gray-900">
//                 Chi tiết tin tuyển dụng
//               </h3>
//               <button
//                 onClick={() => setSelectedJob(null)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
//               >
//                 <XCircle className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-120px)]">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     ID
//                   </label>
//                   <p className="text-sm text-gray-900 font-mono">
//                     {selectedJob.id}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Vị trí
//                   </label>
//                   <p className="text-sm text-gray-900">
//                     {selectedJob.position}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Trạng thái
//                   </label>
//                   <span className={getStatusBadge(selectedJob.status)}>
//                     <span className="flex items-center gap-1">
//                       {getStatusIcon(selectedJob.status)}
//                       <span className="capitalize">
//                         {selectedJob.status === "pending"
//                           ? "Đang chờ"
//                           : selectedJob.status === "approved"
//                           ? "Đã duyệt"
//                           : "Đã từ chối"}
//                       </span>
//                     </span>
//                   </span>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Mô tả yêu cầu
//                   </label>
//                   <p className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
//                     {selectedJob.requirement_description}
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Ngày tạo
//                     </label>
//                     <p className="text-sm text-gray-900">
//                       {formatDate(selectedJob.created_on)}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Cập nhật lần cuối
//                     </label>
//                     <p className="text-sm text-gray-900">
//                       {formatDate(selectedJob.updated_at)}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {selectedJob.status === "pending" && (
//               <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
//                 <button
//                   onClick={() => {
//                     updateJobStatus(selectedJob.id, "rejected");
//                     setSelectedJob(null);
//                   }}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-150"
//                 >
//                   <XCircle className="w-4 h-4 mr-2" />
//                   Từ chối
//                 </button>
//                 <button
//                   onClick={() => {
//                     updateJobStatus(selectedJob.id, "approved");
//                     setSelectedJob(null);
//                   }}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-150"
//                 >
//                   <CheckCircle className="w-4 h-4 mr-2" />
//                   Duyệt tin
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//     //<div>Home CMS </div>
//   );
//
