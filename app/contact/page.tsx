import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Liên hệ với chúng tôi</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Sẵn sàng hỗ trợ bạn 24/7 về mọi vấn đề liên quan đến tuyển dụng vệ sĩ
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="bg-slate-800 border-slate-700 text-center">
              <CardContent className="p-6">
                <Phone className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Hotline</h3>
                <p className="text-slate-300 mb-4">Liên hệ ngay để được hỗ trợ</p>
                <p className="text-red-400 font-bold text-lg">0901 234 567</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 text-center">
              <CardContent className="p-6">
                <Mail className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                <p className="text-slate-300 mb-4">Gửi email cho chúng tôi</p>
                <p className="text-red-400 font-bold">info@secureguardpro.vn</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 text-center">
              <CardContent className="p-6">
                <MapPin className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Địa chỉ</h3>
                <p className="text-slate-300 mb-4">Văn phòng chính</p>
                <p className="text-red-400 font-bold">123 Nguyễn Huệ, Q1, TP.HCM</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 text-center">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Giờ làm việc</h3>
                <p className="text-slate-300 mb-4">Thời gian hoạt động</p>
                <p className="text-red-400 font-bold">24/7</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Gửi tin nhắn cho chúng tôi</h2>
              <p className="text-slate-300 text-lg mb-8">
                Điền thông tin vào form bên dưới và chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Các dịch vụ chính:</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Tuyển dụng vệ sĩ cá nhân</li>
                    <li>• Tuyển dụng đội bảo vệ sự kiện</li>
                    <li>• Đào tạo vệ sĩ chuyên nghiệp</li>
                    <li>• Tư vấn an ninh bảo vệ</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Thông tin liên hệ khác:</h3>
                  <div className="space-y-2 text-slate-300">
                    <p>Zalo: 0901 234 567</p>
                    <p>Facebook: SecureGuard Pro Vietnam</p>
                    <p>LinkedIn: SecureGuard Pro</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Gửi yêu cầu tư vấn</CardTitle>
                <CardDescription className="text-slate-300">
                  Điền thông tin để chúng tôi liên hệ và tư vấn miễn phí
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Họ tên *</label>
                    <Input className="bg-slate-700 border-slate-600 text-white" placeholder="Nguyễn Văn A" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Số điện thoại *</label>
                    <Input className="bg-slate-700 border-slate-600 text-white" placeholder="0901234567" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Email</label>
                  <Input className="bg-slate-700 border-slate-600 text-white" placeholder="email@example.com" />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Dịch vụ quan tâm</label>
                  <Input className="bg-slate-700 border-slate-600 text-white" placeholder="Tuyển dụng vệ sĩ cá nhân" />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Tin nhắn</label>
                  <Textarea
                    className="bg-slate-700 border-slate-600 text-white min-h-[120px]"
                    placeholder="Mô tả chi tiết nhu cầu của bạn..."
                  />
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Send className="h-4 w-4 mr-2" />
                  Gửi yêu cầu
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Vị trí văn phòng</h2>
            <p className="text-slate-300 text-lg">Ghé thăm văn phòng chính của chúng tôi tại trung tâm TP.HCM</p>
          </div>

          <div className="bg-slate-700 rounded-lg p-8 text-center">
            <MapPin className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">Văn phòng chính</h3>
            <p className="text-slate-300 text-lg mb-4">123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
            <p className="text-slate-400">Gần các tòa nhà văn phòng lớn, thuận tiện di chuyển bằng mọi phương tiện</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
