import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle, Upload, User, Phone, Award, Star } from "lucide-react"

export default function ApplyPage() {
  const requirements = [
    "Nam, tuổi từ 25-40, chiều cao tối thiểu 1m70",
    "Có kinh nghiệm trong lĩnh vực bảo vệ hoặc quân đội",
    "Thể lực tốt, biết võ thuật là một lợi thế",
    "Có bằng lái xe, biết tiếng Anh cơ bản",
    "Tính cách điềm tĩnh, trung thực và có trách nhiệm",
    "Ngoại hình ưa nhìn, trang phục chỉn chu",
  ]

  const benefits = [
    "Lương từ 15-30 triệu/tháng tùy kinh nghiệm",
    "Bảo hiểm xã hội, y tế đầy đủ",
    "Được đào tạo chuyên nghiệp miễn phí",
    "Môi trường làm việc chuyên nghiệp",
    "Cơ hội thăng tiến rõ ràng",
    "Phụ cấp ăn trưa và đi lại",
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Ứng tuyển vệ sĩ</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Gia nhập đội ngũ vệ sĩ chuyên nghiệp với mức lương hấp dẫn
            </p>
          </div>
        </div>
      </section>

      {/* Requirements & Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-red-500" />
                  Yêu cầu ứng viên
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Những tiêu chuẩn cần thiết để trở thành vệ sĩ chuyên nghiệp
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-slate-300">{requirement}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-400" />
                  Quyền lợi
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Những lợi ích hấp dẫn khi làm việc tại SecureGuard Pro
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <span className="text-slate-300">{benefit}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <Card className="bg-slate-800 border-slate-700 max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-3xl">Đơn ứng tuyển</CardTitle>
              <CardDescription className="text-slate-300 text-lg">
                Điền đầy đủ thông tin để chúng tôi có thể đánh giá hồ sơ của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <User className="h-5 w-5 text-red-500" />
                  Thông tin cá nhân
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Họ và tên *</label>
                    <Input className="bg-slate-700 border-slate-600 text-white" placeholder="Nguyễn Văn A" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Ngày sinh *</label>
                    <Input type="date" className="bg-slate-700 border-slate-600 text-white" />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Chiều cao (cm) *</label>
                    <Input className="bg-slate-700 border-slate-600 text-white" placeholder="175" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Cân nặng (kg) *</label>
                    <Input className="bg-slate-700 border-slate-600 text-white" placeholder="70" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Tình trạng hôn nhân</label>
                    <Input className="bg-slate-700 border-slate-600 text-white" placeholder="Độc thân" />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Phone className="h-5 w-5 text-red-500" />
                  Thông tin liên hệ
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Số điện thoại *</label>
                    <Input className="bg-slate-700 border-slate-600 text-white" placeholder="0901234567" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Email *</label>
                    <Input
                      type="email"
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Địa chỉ hiện tại *</label>
                  <Input
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="123 Đường ABC, Quận XYZ, TP.HCM"
                  />
                </div>
              </div>

              {/* Experience & Skills */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-red-500" />
                  Kinh nghiệm & Kỹ năng
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Kinh nghiệm làm việc</label>
                    <Textarea
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Mô tả kinh nghiệm làm việc trong lĩnh vực bảo vệ, quân đội hoặc công an..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Kỹ năng đặc biệt</label>
                    <Textarea
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Võ thuật, lái xe, ngoại ngữ, sơ cứu..."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Bằng cấp/Chứng chỉ</label>
                    <Input
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Bằng lái xe B2, chứng chỉ võ thuật..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Mức lương mong muốn</label>
                    <Input className="bg-slate-700 border-slate-600 text-white" placeholder="20-25 triệu/tháng" />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Thông tin bổ sung</h3>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Lý do ứng tuyển</label>
                  <Textarea
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Tại sao bạn muốn trở thành vệ sĩ và làm việc tại SecureGuard Pro?"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Tải lên CV/Hồ sơ</label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-slate-500 transition-colors">
                    <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-300 mb-2">Kéo thả file hoặc click để chọn</p>
                    <p className="text-slate-400 text-sm">Hỗ trợ: PDF, DOC, DOCX (tối đa 5MB)</p>
                    <Button
                      variant="outline"
                      className="mt-4 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                    >
                      Chọn file
                    </Button>
                  </div>
                </div>
              </div>

              {/* Terms & Submit */}
              <div className="space-y-6 pt-6 border-t border-slate-700">
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <p className="text-slate-300 text-sm">
                    Tôi xác nhận rằng tất cả thông tin trên là chính xác và đồng ý với{" "}
                    <span className="text-red-400 underline cursor-pointer">điều khoản sử dụng</span> và{" "}
                    <span className="text-red-400 underline cursor-pointer">chính sách bảo mật</span> của SecureGuard
                    Pro.
                  </p>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700 text-lg py-3">
                  <Upload className="h-5 w-5 mr-2" />
                  Gửi đơn ứng tuyển
                </Button>

                <p className="text-center text-slate-400 text-sm">
                  Chúng tôi sẽ liên hệ với bạn trong vòng 3-5 ngày làm việc
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
