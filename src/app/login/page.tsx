"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Eye, EyeOff, Building2, User, Mail, Lock, Briefcase, Users } from "lucide-react";
import { Separator } from "@/src/components/ui/separator";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<"recruiter" | "candidate">("candidate");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation for registration
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    
    console.log("Form submitted:", { ...formData, userType, isLogin });
    // TODO: Implement actual authentication logic
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 transform rotate-12">
          <Briefcase className="w-32 h-32 text-red-500" />
        </div>
        <div className="absolute bottom-20 right-16 transform -rotate-12">
          <Users className="w-24 h-24 text-red-400" />
        </div>
        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 rotate-45">
          <Building2 className="w-20 h-20 text-gray-500" />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="w-full max-w-6xl relative z-10 hidden lg:flex">
        <Card className="border-gray-700 bg-gray-900/95 backdrop-blur-sm shadow-2xl flex w-full overflow-hidden">
          {/* Left Side - Branding */}
          <div className="w-1/2 bg-gradient-to-br from-red-600 to-red-800 p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-center space-y-8">
              <div className="mx-auto w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                <Briefcase className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl font-bold mb-4">TUYỂN DỤNG</h1>
              <p className="text-xl text-red-100 max-w-md">
                Nền tảng kết nối nhà tuyển dụng và ứng viên hàng đầu
              </p>
              <div className="flex items-center justify-center space-x-8 mt-8">
                <div className="text-center">
                  <Building2 className="w-8 h-8 mx-auto mb-2 text-red-200" />
                  <p className="text-sm text-red-100">Nhà tuyển dụng</p>
                </div>
                <div className="w-px h-12 bg-red-300"></div>
                <div className="text-center">
                  <User className="w-8 h-8 mx-auto mb-2 text-red-200" />
                  <p className="text-sm text-red-100">Ứng viên</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-1/2 p-12">
            <CardHeader className="space-y-6 pb-6">
              <div className="text-center space-y-4">
                <CardTitle className="text-3xl font-bold text-white">
                  {isLogin ? "Đăng nhập" : "Đăng ký"}
                </CardTitle>
                <CardDescription className="text-gray-400 text-lg">
                  {isLogin 
                    ? "Chào mừng bạn quay trở lại" 
                    : "Tạo tài khoản mới để bắt đầu"
                  }
                </CardDescription>
              </div>

              {/* User Type Toggle */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={userType === "candidate" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setUserType("candidate");
                    resetForm();
                  }}
                  className={`flex-1 h-12 gap-2 transition-all duration-300 ${
                    userType === "candidate" 
                      ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg border-red-600" 
                      : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-gray-800/50"
                  }`}
                >
                  <User className="h-4 w-4" />
                  Ứng viên
                </Button>
                <Button
                  type="button"
                  variant={userType === "recruiter" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setUserType("recruiter");
                    resetForm();
                  }}
                  className={`flex-1 h-12 gap-2 transition-all duration-300 ${
                    userType === "recruiter" 
                      ? "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg border-gray-600" 
                      : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-gray-800/50"
                  }`}
                >
                  <Building2 className="h-4 w-4" />
                  Nhà tuyển dụng
                </Button>
              </div>

              <Badge 
                variant="secondary"
                className={`mx-auto w-fit px-4 py-2 text-sm font-semibold ${
                  userType === "recruiter" 
                    ? "bg-gray-700 text-gray-200 border-gray-600" 
                    : "bg-red-900/30 text-red-300 border-red-700"
                }`}
              >
                {userType === "recruiter" ? "🏢 Nhà tuyển dụng" : "👤 Ứng viên"}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Địa chỉ Email
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 group-focus-within:text-red-500 transition-colors" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={userType === "recruiter" ? "hr@company.com" : "candidate@example.com"}
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                    Mật khẩu
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 group-focus-within:text-red-500 transition-colors" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Registration Fields */}
                {!isLogin && (
                  <div className="space-y-5">
                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                        Xác nhận mật khẩu
                      </Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 group-focus-within:text-red-500 transition-colors" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="pl-10 pr-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20 transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium text-gray-300">
                        Họ và tên đầy đủ
                      </Label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 group-focus-within:text-red-500 transition-colors" />
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder={userType === "recruiter" ? "Nguyễn Văn HR" : "Nguyễn Văn Ứng Viên"}
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="pl-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20 transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className={`w-full h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                    userType === "recruiter"
                      ? "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white"
                      : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                  }`}
                >
                  {userType === "recruiter" ? <Building2 className="w-4 h-4 mr-2" /> : <User className="w-4 h-4 mr-2" />}
                  {isLogin ? "Đăng nhập" : "Đăng ký tài khoản"}
                </Button>
                </div>

              {/* Login/Register Toggle */}
              <div className="text-center">
                <Separator className="my-6 bg-gray-700" />
                <p className="text-gray-400">
                  {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      resetForm();
                    }}
                    className={`ml-2 font-semibold hover:underline transition-all duration-200 ${
                      userType === "recruiter" 
                        ? "text-gray-300 hover:text-white" 
                        : "text-red-400 hover:text-red-300"
                    }`}
                  >
                    {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
                  </button>
                </p>
              </div>

              {/* Forgot Password (only on login) */}
              {isLogin && (
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:text-red-400 hover:underline transition-all duration-200"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
              )}
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Mobile Layout */}
      <div className="w-full max-w-md relative z-10 lg:hidden">
        <Card className="border-gray-700 bg-gray-900/95 backdrop-blur-sm shadow-2xl">
          <CardHeader className="space-y-6 pb-6">
            {/* Logo/Brand Section */}
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-white">
                TUYỂN DỤNG
              </CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                {isLogin 
                  ? "Chào mừng bạn quay trở lại" 
                  : "Tạo tài khoản mới để bắt đầu"
                }
              </CardDescription>
            </div>

            {/* User Type Toggle */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant={userType === "candidate" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setUserType("candidate");
                  resetForm();
                }}
                className={`flex-1 h-12 gap-2 transition-all duration-300 ${
                  userType === "candidate" 
                    ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg border-red-600" 
                    : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-gray-800/50"
                }`}
              >
                <User className="h-4 w-4" />
                Ứng viên
              </Button>
              <Button
                type="button"
                variant={userType === "recruiter" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setUserType("recruiter");
                  resetForm();
                }}
                className={`flex-1 h-12 gap-2 transition-all duration-300 ${
                  userType === "recruiter" 
                    ? "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg border-gray-600" 
                    : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-gray-800/50"
                }`}
              >
                <Building2 className="h-4 w-4" />
                Nhà tuyển dụng
              </Button>
            </div>

            <Badge 
              variant="secondary"
              className={`mx-auto w-fit px-4 py-2 text-sm font-semibold ${
                userType === "recruiter" 
                  ? "bg-gray-700 text-gray-200 border-gray-600" 
                  : "bg-red-900/30 text-red-300 border-red-700"
              }`}
            >
              {userType === "recruiter" ? "🏢 Nhà tuyển dụng" : "👤 Ứng viên"}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Địa chỉ Email
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 group-focus-within:text-red-500 transition-colors" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={userType === "recruiter" ? "hr@company.com" : "candidate@example.com"}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Mật khẩu
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 group-focus-within:text-red-500 transition-colors" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Registration Fields */}
              {!isLogin && (
                <div className="space-y-5">
                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                      Xác nhận mật khẩu
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 group-focus-within:text-red-500 transition-colors" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-300">
                      Họ và tên đầy đủ
                    </Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 group-focus-within:text-red-500 transition-colors" />
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder={userType === "recruiter" ? "Nguyễn Văn HR" : "Nguyễn Văn Ứng Viên"}
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="pl-10 h-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20 transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                className={`w-full h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  userType === "recruiter"
                    ? "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white"
                    : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                }`}
              >
                {userType === "recruiter" ? <Building2 className="w-4 h-4 mr-2" /> : <User className="w-4 h-4 mr-2" />}
                {isLogin ? "Đăng nhập" : "Đăng ký tài khoản"}
              </Button>
            </form>

            {/* Login/Register Toggle */}
            <div className="text-center">
              <Separator className="my-6 bg-gray-700" />
              <p className="text-gray-400">
                {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    resetForm();
                  }}
                  className={`ml-2 font-semibold hover:underline transition-all duration-200 ${
                    userType === "recruiter" 
                      ? "text-gray-300 hover:text-white" 
                      : "text-red-400 hover:text-red-300"
                  }`}
                >
                  {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
                </button>
              </p>
            </div>

            {/* Forgot Password (only on login) */}
            {isLogin && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-red-400 hover:underline transition-all duration-200"
                >
                  Quên mật khẩu?
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}