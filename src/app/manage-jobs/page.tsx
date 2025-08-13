"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Eye,
  Edit2,
  Trash2,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Clock,
  X,
  UserCheck,
  FileText,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";
import { RecruitContext } from "@/src/context/recruitContext";
import TextEditor from "./textEditor";

interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  experience: string;
  education: string;
  tags: string[];
  cv_url?: string;
  applied_date: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  notes?: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements: string;
  benefits: string;
  experience: string;
  education: string;
  tags: { id: string; name: string }[];
  deadline: string;
  posted: string;
  status: "active" | "paused" | "closed" | "pending";
  submited: "inactive" | "active";
  applicants: Applicant[];
}

export default function ManageJobsPage() {
  const {
    listType,
    listTags,
    listRecruit,
    setListRecruit,
    handleGetListRecruit,
    handlePostAddRecruit,
    handlePutUpdateRecruit,
  } = RecruitContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
  const [isApplicantDetailModalOpen, setIsApplicantDetailModalOpen] =
    useState(false);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Job>>({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    description: "",
    requirements: "",
    benefits: "",
    experience: "",
    education: "",
    tags: [],
    deadline: "",
    status: "pending",
    submited: "inactive",
    applicants: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      handleGetListRecruit(token);
    }
  }, []);

  const filteredJobs = listRecruit.filter(
    (job: any) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setIsDetailModalOpen(true);
  };

  const handleViewApplicants = (job: Job) => {
    setSelectedJob(job);
    setIsApplicantsModalOpen(true);
  };

  const handleViewApplicantDetail = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setIsApplicantDetailModalOpen(true);
  };

  const getTypeIdByName = (typeName: any) => {
    const type = listType?.find((t) => t.name === typeName);
    return type ? type.id.toString() : typeName;
  };

  const handleEdit = (job: any) => {
    console.log("Editing job:", job);

    const typeId =
      typeof job.type === "string" && isNaN(job.type)
        ? getTypeIdByName(job.type)
        : job.type?.toString() || "";

    setFormData({
      ...job,
      type: typeId,
      tags: job.tags || [],
    });

    setSelectedJob(job);
    setIsEditModalOpen(true);
  };

  const handleDelete = (jobId: string) => {
    setJobToDelete(jobId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (jobToDelete) {
      setListRecruit(listRecruit.filter((job: any) => job.id !== jobToDelete));
      setJobToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    // console.log(formData);
    e.preventDefault();

    if (selectedJob) {
      // Edit existing job
      console.log("Editing job:", formData);
      const token = localStorage.getItem("userToken");
      if (token) {
        handlePutUpdateRecruit(
          token,
          formData.id,
          formData.company,
          formData.deadline,
          formData.description,
          formData.experience,
          formData.location,
          formData.salary,
          formData.title,
          formData.type,
          formData.tags?.map((tag) => tag.id)
        );
      }
      // setListRecruit(
      //   listRecruit.map((job: any) =>
      //     job.id === selectedJob.id ? ({ ...job, ...formData } as Job) : job
      //   )
      // );
      setIsEditModalOpen(false);
      return;
    } else {
      const token = localStorage.getItem("userToken");
      if (token) {
        handlePostAddRecruit(
          token,
          formData.company,
          formData.deadline,
          formData.description,
          formData.experience,
          formData.location,
          formData.salary,
          formData.title,
          formData.type,
          formData.tags
        );
      }
      setIsAddModalOpen(false);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      location: "",
      salary: "",
      type: "",
      description: "",
      requirements: "",
      benefits: "",
      experience: "",
      education: "",
      tags: [],
      deadline: "",
      status: "pending",
      submited: "inactive",
      applicants: [],
    });
    setSelectedJob(null);
  };

  const getSkillNameById = (skillId: string) => {
    const skill = listTags.find((s) => s.id === skillId);
    return skill ? skill.name : skillId;
  };

  const handleSkillToggle = (skillId: string) => {
    const currenttags = formData.tags || [];
    const updatedtags = currenttags.includes(skillId as any)
      ? currenttags.filter((s) => s !== (skillId as any))
      : [...currenttags, skillId];

    console.log("=== CẬP NHẬT tags ===");
    console.log("Skill ID được toggle:", skillId);
    console.log("tags trước:", currenttags);
    console.log("tags sau:", updatedtags);

    setFormData({ ...formData, tags: updatedtags as any[] });
  };

  // 5. Cập nhật removeSkill để sử dụng id
  const removeSkill = (skillIdToRemove: string) => {
    const updatedtags = (formData.tags || []).filter(
      (skillId: any) => skillId !== skillIdToRemove
    );

    console.log("=== XÓA SKILL ===");
    console.log("Skill ID bị xóa:", skillIdToRemove);
    console.log("tags còn lại:", updatedtags);

    setFormData({ ...formData, tags: updatedtags });
  };

  const getTypeNameById = (typeId: string) => {
    const type = listType?.find((t) => t.id.toString() === typeId);
    return type ? type.name : typeId;
  };

  // Thay thế hàm getStatusColor
  const getStatusColor = (job: any) => {
    // Kiểm tra submited trước
    if (job.submited === null || job.submited === undefined) {
      return "bg-yellow-100 text-yellow-800 border-yellow-200"; // Chờ duyệt
    } else if (job.submited === "inactive") {
      return "bg-red-100 text-red-800 border-red-200"; // Từ chối
    } else if (job.submited === "active") {
      return "bg-green-100 text-green-800 border-green-200"; // Đã duyệt
    }

    // Fallback về status cũ nếu cần
    switch (job.status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "closed":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (job: any) => {
    if (job.submited === null || job.submited === undefined) {
      return "Chờ duyệt";
    } else if (job.submited === "inactive") {
      return "Từ chối";
    } else if (job.submited === "active") {
      return "Đã duyệt";
    }

    switch (job.status) {
      case "active":
        return "Đang hoạt động";
      case "paused":
        return "Tạm dừng";
      case "closed":
        return "Đã đóng";
      case "pending":
        return "Chờ duyệt";
      default:
        return job.status;
    }
  };

  const getApplicantStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "reviewed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getApplicantStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xem";
      case "reviewed":
        return "Đã xem";
      case "accepted":
        return "Chấp nhận";
      case "rejected":
        return "Từ chối";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="container mx-auto px-4 lg:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Quản lý tin đăng
              </h1>
              <p className="text-slate-400">
                Quản lý các tin tuyển dụng vệ sĩ bảo vệ
              </p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm tin mới
            </Button>
          </div>
        </div>

        {/* Search and Stats */}
        <div className="grid md:grid-cols-6 gap-6 mb-8">
          <Card className="md:col-span-2 p-6 bg-slate-800 border-slate-700">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Tìm kiếm theo tên công việc, công ty, địa điểm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </Card>

          <Card className="p-6 bg-slate-800 border-slate-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {listRecruit.length}
              </div>
              <div className="text-sm text-slate-400">Tổng tin đăng</div>
            </div>
          </Card>

          <Card className="p-6 bg-slate-800 border-slate-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {listRecruit.filter((job) => job.submited === "active").length}
              </div>
              <div className="text-sm text-slate-400">Đã duyệt</div>
            </div>
          </Card>

          <Card className="p-6 bg-slate-800 border-slate-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {
                  listRecruit.filter((job) => job.submited === "inactive")
                    .length
                }
              </div>
              <div className="text-sm text-slate-400">Từ chối</div>
            </div>
          </Card>

          <Card className="p-6 bg-slate-800 border-slate-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {
                  listRecruit.filter(
                    (job) => job.submited === null || job.submited === undefined
                  ).length
                }
              </div>
              <div className="text-sm text-slate-400">Chờ duyệt</div>
            </div>
          </Card>
        </div>

        {/* Jobs List */}
        <div className="grid gap-6">
          {filteredJobs.map((job: any) => (
            <Card key={job.id} className="p-6 bg-slate-800 border-slate-700">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {job.title}
                      </h3>
                      <p className="text-slate-400">{job.company}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`${getStatusColor(job)} border`}>
                        {getStatusText(job)}
                      </Badge>
                      {job.applicants.length > 0 && (
                        <Badge
                          variant="outline"
                          className="border-slate-600 text-slate-300 cursor-pointer hover:bg-slate-700"
                          onClick={() => handleViewApplicants(job)}
                        >
                          <Users className="w-3 h-3 mr-1" />
                          {job.applicants.length} ứng viên
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-slate-300">
                      <MapPin className="w-4 h-4 mr-2 text-slate-500" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                      <DollarSign className="w-4 h-4 mr-2 text-slate-500" />
                      <span className="text-sm">{job.salary}</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                      <Clock className="w-4 h-4 mr-2 text-slate-500" />
                      <span className="text-sm">{job.type}</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                      <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                      <span className="text-sm">Hạn: {job.deadline}</span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm line-clamp-2">
                    {job.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {job.applicants.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewApplicants(job)}
                      className="border-slate-700 hover:bg-slate-700 text-slate-300"
                    >
                      <UserCheck className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(job)}
                    className="border-slate-700 hover:bg-slate-700 text-slate-300"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(job)}
                    className="border-slate-700 hover:bg-slate-700 text-slate-300"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(job.id)}
                    className="border-red-700 hover:bg-red-900 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {filteredJobs.length === 0 && (
            <Card className="p-12 bg-slate-800 border-slate-700 text-center">
              <div className="text-slate-400">
                <Users className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg mb-2">Không tìm thấy tin đăng nào</p>
                <p className="text-sm">
                  Thử thay đổi từ khóa tìm kiếm hoặc thêm tin đăng mới
                </p>
              </div>
            </Card>
          )}
        </div>
      </main>

      <Footer />

      {/* Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedJob?.title}</DialogTitle>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Công ty</Label>
                  <p className="text-white">{selectedJob.company}</p>
                </div>
                <div>
                  <Label className="text-slate-300">Địa điểm</Label>
                  <p className="text-white">{selectedJob.location}</p>
                </div>
                <div>
                  <Label className="text-slate-300">Mức lương</Label>
                  <p className="text-white">{selectedJob.salary}</p>
                </div>
                <div>
                  <Label className="text-slate-300">Loại hình</Label>
                  <p className="text-white">
                    {getTypeNameById(selectedJob.type)}
                  </p>
                </div>
                <div>
                  <Label className="text-slate-300">Kinh nghiệm</Label>
                  <p className="text-white">{selectedJob.experience}</p>
                </div>
                <div>
                  <Label className="text-slate-300">Hạn ứng tuyển</Label>
                  <p className="text-white">{selectedJob.deadline}</p>
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Mô tả công việc</Label>
                <p className="text-white whitespace-pre-line">
                  {selectedJob.description}
                </p>
              </div>

              <div>
                <Label className="text-slate-300">Kỹ năng cần thiết</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedJob.tags.map((skillId, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-slate-600 text-slate-300"
                    >
                      {skillId.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Applicants Modal */}
      <Dialog
        open={isApplicantsModalOpen}
        onOpenChange={setIsApplicantsModalOpen}
      >
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Danh sách ứng viên - {selectedJob?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4">
              {selectedJob.applicants.length > 0 ? (
                selectedJob.applicants.map((applicant) => (
                  <Card
                    key={applicant.id}
                    className="p-4 bg-slate-700 border-slate-600"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-white">
                            {applicant.name}
                          </h4>
                          <Badge
                            className={`${getApplicantStatusColor(
                              applicant.status
                            )} border text-xs`}
                          >
                            {getApplicantStatusText(applicant.status)}
                          </Badge>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div className="text-slate-300">
                            <span className="text-slate-400">Email:</span>{" "}
                            {applicant.email}
                          </div>
                          <div className="text-slate-300">
                            <span className="text-slate-400">SĐT:</span>{" "}
                            {applicant.phone}
                          </div>
                          <div className="text-slate-300">
                            <span className="text-slate-400">Tuổi:</span>{" "}
                            {applicant.age}
                          </div>
                          <div className="text-slate-300">
                            <span className="text-slate-400">Kinh nghiệm:</span>{" "}
                            {applicant.experience}
                          </div>
                          <div className="text-slate-300">
                            <span className="text-slate-400">
                              Ngày ứng tuyển:
                            </span>{" "}
                            {applicant.applied_date}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewApplicantDetail(applicant)}
                        className="border-slate-600 hover:bg-slate-600 text-slate-300"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Chi tiết
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <Users className="w-12 h-12 mx-auto mb-4" />
                  <p>Chưa có ứng viên nào ứng tuyển</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Applicant Detail Modal */}
      <Dialog
        open={isApplicantDetailModalOpen}
        onOpenChange={setIsApplicantDetailModalOpen}
      >
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Thông tin ứng viên - {selectedApplicant?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedApplicant && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Họ tên</Label>
                  <p className="text-white">{selectedApplicant.name}</p>
                </div>
                <div>
                  <Label className="text-slate-300">Email</Label>
                  <p className="text-white">{selectedApplicant.email}</p>
                </div>
                <div>
                  <Label className="text-slate-300">Số điện thoại</Label>
                  <p className="text-white">{selectedApplicant.phone}</p>
                </div>
                <div>
                  <Label className="text-slate-300">Tuổi</Label>
                  <p className="text-white">{selectedApplicant.age}</p>
                </div>
                <div>
                  <Label className="text-slate-300">Trình độ học vấn</Label>
                  <p className="text-white">{selectedApplicant.education}</p>
                </div>
                <div>
                  <Label className="text-slate-300">Ngày ứng tuyển</Label>
                  <p className="text-white">{selectedApplicant.applied_date}</p>
                </div>
                <div>
                  <Label className="text-slate-300">Trạng thái</Label>
                  <Badge
                    className={`${getApplicantStatusColor(
                      selectedApplicant.status
                    )} border`}
                  >
                    {getApplicantStatusText(selectedApplicant.status)}
                  </Badge>
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Kinh nghiệm</Label>
                <p className="text-white whitespace-pre-line">
                  {selectedApplicant.experience}
                </p>
              </div>

              <div>
                <Label className="text-slate-300">Kỹ năng</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedApplicant.tags.map((skillId, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-slate-600 text-slate-300"
                    >
                      {getSkillNameById(skillId)}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedApplicant.notes && (
                <div>
                  <Label className="text-slate-300">Ghi chú</Label>
                  <p className="text-white whitespace-pre-line">
                    {selectedApplicant.notes}
                  </p>
                </div>
              )}

              {selectedApplicant.cv_url && (
                <div>
                  <Label className="text-slate-300">CV</Label>
                  <Button
                    variant="outline"
                    className="border-slate-600 hover:bg-slate-600 text-slate-300 mt-2"
                    onClick={() =>
                      window.open(selectedApplicant.cv_url, "_blank")
                    }
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Xem CV
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add/Edit Modal */}
      <Dialog
        open={isAddModalOpen || isEditModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            resetForm();
          }
        }}
      >
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedJob ? "Chỉnh sửa tin đăng" : "Thêm tin đăng mới"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Tiêu đề *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="company">Công ty *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Địa điểm *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="salary">Mức lương *</Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Loại hình *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Chọn loại hình" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {listType
                      ?.filter((type) => type.status)
                      .map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="experience">Kinh nghiệm *</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) =>
                    setFormData({ ...formData, experience: value })
                  }
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Chọn kinh nghiệm" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="Không yêu cầu">Không yêu cầu</SelectItem>
                    <SelectItem value="1+ năm">1+ năm</SelectItem>
                    <SelectItem value="2+ năm">2+ năm</SelectItem>
                    <SelectItem value="3+ năm">3+ năm</SelectItem>
                    <SelectItem value="5+ năm">5+ năm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="deadline">Hạn ứng tuyển *</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
            </div>

            <div className="col-span-2">
              <Label>Kỹ năng cần thiết</Label>
              <div className="mt-2">
                {/* Selected tags */}
                {formData.tags && formData.tags.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm text-slate-400 mb-2">
                      Kỹ năng đã chọn:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((skillId, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-red-500 text-red-400 bg-red-900/20 cursor-pointer hover:bg-red-900/40"
                          onClick={() => removeSkill(skillId as any)}
                        >
                          {typeof skillId === "object"
                            ? skillId.name
                            : getSkillNameById(skillId)}

                          <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Available tags */}
                <div>
                  <p className="text-sm text-slate-400 mb-2">
                    Chọn kỹ năng (click để thêm/bỏ):
                  </p>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-slate-700 rounded border border-slate-600">
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-slate-700 rounded border border-slate-600">
                      {listTags.map((skill) => (
                        <Badge
                          key={skill.id}
                          variant="outline"
                          className={`cursor-pointer transition-colors ${
                            formData.tags?.includes(skill.id)
                              ? "border-red-500 text-red-400 bg-red-900/20"
                              : "border-slate-500 text-slate-300 hover:border-slate-400 hover:bg-slate-600"
                          }`}
                          onClick={() => handleSkillToggle(skill.id)}
                        >
                          {skill.name}
                          {formData.tags?.includes(skill.id) && (
                            <span className="ml-1">✓</span>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <Label htmlFor="description">Mô tả công việc *</Label>
              <div className="mt-2 bg-slate-700 border border-slate-600 rounded-md overflow-hidden">
                <TextEditor
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Nhập mô tả chi tiết về công việc..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  resetForm();
                }}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Hủy
              </Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700">
                {selectedJob ? "Cập nhật" : "Thêm mới"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
          </DialogHeader>
          <p className="text-slate-300">
            Bạn có chắc chắn muốn xóa tin đăng này? Hành động này không thể hoàn
            tác.
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Hủy
            </Button>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
