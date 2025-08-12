"use client";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Ruler,
  Weight,
  MapPin,
  Camera,
  FileText,
  Briefcase,
  Save,
  Upload,
  History,
  X,
  Clock,
  Building,
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  birth: string;
  height: number;
  weight: number;
  address: string;
  avatar: string;
  work_experiences: string;
  cv: string;
  cvFileName?: string;
}

interface ApplyHistory {
  id: number;
  jobTitle: string;
  company: string;
  appliedAt: string;
}
//status: "pending" | "reviewed" | "rejected" | "accepted";

export default function CandidateProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "+84 123 456 789",
    birth: "1990-01-01",
    height: 170,
    weight: 65,
    address: "123 Đường ABC, Quận 1, TP.HCM",
    avatar:
      "https://res.cloudinary.com/drxhxp8rb/image/upload/v1754382526/default-avatar-icon-of-social-media-user-vector_eajxmc.jpg",
    work_experiences:
      "Frontend Developer tại ABC Company (2020-2023)\n- Phát triển ứng dụng web với React.js\n- Làm việc trong team 5 người\n- Tham gia dự án e-commerce với 50K+ users",
    cv: "",
    cvFileName: "",
  });

  // Mock data cho lịch sử apply
  const [applyHistory] = useState<ApplyHistory[]>([
    {
      id: 1,
      jobTitle: "Frontend Developer",
      company: "TechViet Solutions",
      appliedAt: "2024-01-15T10:30:00",
      //status: "pending",
    },
    {
      id: 2,
      jobTitle: "ReactJS Developer",
      company: "Digital Agency Vietnam",
      appliedAt: "2024-01-10T14:45:00",
      //status: "reviewed",
    },
    {
      id: 3,
      jobTitle: "Full Stack Developer",
      company: "StartupXYZ",
      appliedAt: "2024-01-05T09:15:00",
      //status: "rejected",
    },
    {
      id: 4,
      jobTitle: "UI/UX Developer",
      company: "Creative Studio",
      appliedAt: "2023-12-28T16:20:00",
      //status: "accepted",
    },
    {
      id: 5,
      jobTitle: "Web Developer",
      company: "E-commerce Corp",
      appliedAt: "2023-12-20T11:00:00",
      //status: "pending",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showApplyHistory, setShowApplyHistory] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "reviewed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "reviewed":
        return "Đã xem";
      case "rejected":
        return "Từ chối";
      case "accepted":
        return "Chấp nhận";
      default:
        return status;
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!profile.name.trim()) {
      newErrors.name = "Họ và tên là bắt buộc";
    }

    if (!profile.email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      newErrors.email = "Email không đúng định dạng";
    }

    if (!profile.phone.trim()) {
      newErrors.phone = "Số điện thoại là bắt buộc";
    } else if (
      !/^(\+84|0)[0-9]{9,10}$/.test(profile.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone =
        "Số điện thoại không đúng định dạng (VD: +84 123 456 789 hoặc 0123 456 789)";
    }

    if (!profile.birth) {
      newErrors.birth = "Ngày sinh là bắt buộc";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setProfile((prev) => ({
      ...prev,
      [name]:
        name === "height"
          ? parseInt(value) || 0
          : name === "weight"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "avatar" | "cv"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (field === "cv") {
          setProfile((prev) => ({
            ...prev,
            [field]: event.target?.result as string,
            cvFileName: file.name,
          }));
        } else {
          setProfile((prev) => ({
            ...prev,
            [field]: event.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsEditing(false);
    // Here you would typically save to your backend
    console.log("Saving profile:", profile);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values if needed
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white ">
      <Header />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold text-white mb-2"
            style={{ paddingTop: "28px" }}
          >
            Hồ Sơ Nhà Tuyển Dụng
          </h1>
          <p className="text-lg text-slate-400">
            Quản lý và cập nhật thông tin cá nhân của bạn
          </p>
        </div>
      </div>

      {/* Main Profile Card */}

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 p-8">
        <div className="relative group">
          <img
            src={
              profile.avatar ||
              "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200"
            }
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
          {isEditing && (
            <label className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "avatar")}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div className="text-center md:text-left flex-1">
          {/* Tên và nút chỉnh sửa */}
          <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-3 sm:gap-6 mb-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {profile.name}
            </h2>

            {/* Action Buttons - Responsive */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm sm:text-base"
                  >
                    <User className="w-4 h-4" />
                    Chỉnh sửa
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm sm:text-base"
                  >
                    {isSaving ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {isSaving ? "Đang lưu..." : "Lưu"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base"
                  >
                    Hủy
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <p className="text-blue-100 text-base sm:text-lg mb-4">
            {profile.email}
          </p>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center md:justify-start items-center">
            <div className="flex items-center gap-2 text-white">
              <Phone className="w-4 h-4 text-blue-200" />
              <span className="text-sm sm:text-base">{profile.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <MapPin className="w-4 h-4 text-blue-200" />
              <span className="text-sm sm:text-base">
                {profile.address.split(",")[0]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
              <User className="w-6 h-6 text-blue-600" />
              Thông Tin Cá Nhân
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Họ và tên
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    style={{
                      color: "rgb(75 85 99 / var(--tw-text-opacity, 1))",
                    }}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    style={{
                      color: "rgb(75 85 99 / var(--tw-text-opacity, 1))",
                    }}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="example@email.com"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Số điện thoại
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    style={{
                      color: "rgb(75 85 99 / var(--tw-text-opacity, 1))",
                    }}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="+84 123 456 789 hoặc 0123 456 789"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Ngày sinh
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    name="birth"
                    value={profile.birth}
                    style={{
                      color: "rgb(75 85 99 / var(--tw-text-opacity, 1))",
                    }}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all ${
                      errors.birth ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.birth && (
                  <p className="mt-1 text-sm text-red-600">{errors.birth}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Địa chỉ
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    style={{
                      color: "rgb(75 85 99 / var(--tw-text-opacity, 1))",
                    }}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
