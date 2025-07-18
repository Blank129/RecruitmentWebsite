import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Header } from "@/src/components/header"
import { Footer } from "@/src/components/footer"
import { Shield, Users, Award, Clock, Star, CheckCircle, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: Shield,
      title: "Tuyển dụng vệ sĩ cá nhân",
      description: "Tuyển dụng vệ sĩ bảo vệ cá nhân cho doanh nhân, nghệ sĩ và các nhân vật quan trọng",
      features: ["Bảo vệ 24/7", "Vệ sĩ có kinh nghiệm", "Trang bị hiện đại", "Đào tạo chuyên nghiệp"],
      price: "Từ 25 triệu/tháng",
    },
    {
      icon: Users,
      title: "Tuyển dụng đội bảo vệ",
      description: "Cung cấp đội ngũ vệ sĩ chuyên nghiệp cho các sự kiện, hội nghị và hoạt động lớn",
      features: ["Đội ngũ đông đảo", "Phối hợp nhịp nhàng", "Kinh nghiệm sự kiện", "Trang phục thống nhất"],
      price: "Từ 500k/người/ngày",
    },
    {
      icon: Award,
      title: "Đào tạo vệ sĩ chuyên nghiệp",
      description: "Chương trình đào tạo toàn diện từ cơ bản đến nâng cao cho vệ sĩ",
      features: ["Võ thuật tự vệ", "Kỹ năng bảo vệ", "Sơ cứu y tế", "Giao tiếp chuyên nghiệp"],
      price: "Từ 10 triệu/khóa",
    },
    {
      icon: Clock,
      title: "Dịch vụ tư vấn an ninh",
      description: "Tư vấn và đánh giá rủi ro an ninh cho cá nhân và doanh nghiệp",
      features: ["Đánh giá rủi ro", "Lập kế hoạch bảo vệ", "Tư vấn thiết bị", "Hỗ trợ 24/7"],
      price: "Liên hệ báo giá",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Dịch vụ của chúng tôi</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Chúng tôi cung cấp các dịch vụ tuyển dụng và đào tạo vệ sĩ chuyên nghiệp
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
                <CardHeader>
                  <service.icon className="h-12 w-12 text-red-500 mb-4" />
                  <CardTitle className="text-white text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-slate-300 text-lg">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <div className="text-red-400 font-semibold text-lg">{service.price}</div>
                    <Link href="/contact">
                      <Button className="bg-red-600 hover:bg-red-700">Liên hệ ngay</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Quy trình làm việc</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Quy trình tuyển dụng và cung cấp vệ sĩ chuyên nghiệp của chúng tôi
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold text-white">Tiếp nhận yêu cầu</h3>
              <p className="text-slate-300">Lắng nghe và phân tích nhu cầu của khách hàng</p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold text-white">Tuyển chọn ứng viên</h3>
              <p className="text-slate-300">Tuyển chọn vệ sĩ phù hợp với yêu cầu cụ thể</p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold text-white">Đào tạo chuyên biệt</h3>
              <p className="text-slate-300">Đào tạo theo yêu cầu riêng của từng khách hàng</p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                4
              </div>
              <h3 className="text-xl font-semibold text-white">Triển khai dịch vụ</h3>
              <p className="text-slate-300">Bắt đầu cung cấp dịch vụ bảo vệ chuyên nghiệp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Tại sao chọn dịch vụ của chúng tôi?</h2>
              <p className="text-lg text-slate-300 mb-8">
                Với hơn 5 năm kinh nghiệm trong lĩnh vực tuyển dụng và đào tạo vệ sĩ, chúng tôi tự hào là đơn vị hàng
                đầu tại Việt Nam.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Star className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Chất lượng hàng đầu</h3>
                    <p className="text-slate-300">Tuyển chọn và đào tạo vệ sĩ theo tiêu chuẩn quốc tế</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Kinh nghiệm phong phú</h3>
                    <p className="text-slate-300">Đã cung cấp dịch vụ cho hơn 50 khách hàng VIP</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Bảo mật tuyệt đối</h3>
                    <p className="text-slate-300">Cam kết bảo mật thông tin và an toàn khách hàng</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Professional Security Services"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Cần tư vấn dịch vụ?</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Liên hệ với chúng tôi để được tư vấn miễn phí về dịch vụ tuyển dụng vệ sĩ phù hợp nhất
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-red-600 hover:bg-slate-100 text-lg px-8">
              Liên hệ tư vấn
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
