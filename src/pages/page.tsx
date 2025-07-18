import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Header } from "@/src/components/header"
import { Footer } from "@/src/components/footer"
import { Shield, Users, Award, ArrowRight, Star, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-red-600/20 text-red-400 border-red-600/30">Tuyển dụng chuyên nghiệp</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Tuyển dụng <span className="text-red-500">Vệ sĩ</span> chuyên nghiệp
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Kết nối với những cơ hội việc làm hàng đầu trong lĩnh vực bảo vệ cá nhân. Chúng tôi tuyển dụng những
                  vệ sĩ xuất sắc nhất cho các khách hàng VIP.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/jobs">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8">
                    Xem việc làm
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 text-lg px-8 bg-transparent"
                  >
                    Tìm hiểu thêm
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">500+</div>
                  <div className="text-sm text-slate-400">Vệ sĩ đã tuyển</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">50+</div>
                  <div className="text-sm text-slate-400">Khách hàng VIP</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">5+</div>
                  <div className="text-sm text-slate-400">Năm kinh nghiệm</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Professional Bodyguard"
                width={500}
                height={600}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Overview */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Dịch vụ tuyển dụng</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Chúng tôi cung cấp các dịch vụ tuyển dụng vệ sĩ chuyên nghiệp cho mọi nhu cầu
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-700 border-slate-600 hover:bg-slate-600 transition-colors">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-red-500 mb-4 mx-auto" />
                <CardTitle className="text-white">Vệ sĩ cá nhân</CardTitle>
                <CardDescription className="text-slate-300">
                  Bảo vệ cá nhân 24/7 cho các nhân vật quan trọng
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-slate-700 border-slate-600 hover:bg-slate-600 transition-colors">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-red-500 mb-4 mx-auto" />
                <CardTitle className="text-white">Đội bảo vệ</CardTitle>
                <CardDescription className="text-slate-300">
                  Đội ngũ vệ sĩ chuyên nghiệp cho sự kiện và hoạt động lớn
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-slate-700 border-slate-600 hover:bg-slate-600 transition-colors">
              <CardHeader className="text-center">
                <Award className="h-12 w-12 text-red-500 mb-4 mx-auto" />
                <CardTitle className="text-white">Đào tạo chuyên nghiệp</CardTitle>
                <CardDescription className="text-slate-300">
                  Chương trình đào tạo và nâng cao kỹ năng cho vệ sĩ
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Link href="/services">
              <Button className="bg-red-600 hover:bg-red-700">
                Xem tất cả dịch vụ
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Tại sao chọn chúng tôi?</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Những lý do khiến chúng tôi trở thành lựa chọn hàng đầu trong lĩnh vực tuyển dụng vệ sĩ
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-red-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">Uy tín</h3>
              <p className="text-slate-300">5+ năm kinh nghiệm trong lĩnh vực tuyển dụng vệ sĩ</p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-red-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">Chất lượng</h3>
              <p className="text-slate-300">Tuyển chọn kỹ lưỡng, đào tạo chuyên nghiệp</p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-red-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">Đội ngũ</h3>
              <p className="text-slate-300">500+ vệ sĩ chuyên nghiệp đã được tuyển dụng</p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-red-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">Bảo mật</h3>
              <p className="text-slate-300">Đảm bảo tính bảo mật và an toàn tuyệt đối</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Sẵn sàng bắt đầu sự nghiệp vệ sĩ?</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Gia nhập đội ngũ vệ sĩ chuyên nghiệp với mức lương hấp dẫn và môi trường làm việc tốt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs">
              <Button size="lg" className="bg-white text-red-600 hover:bg-slate-100 text-lg px-8">
                Xem việc làm
              </Button>
            </Link>
            <Link href="/apply">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600 text-lg px-8 bg-transparent"
              >
                Ứng tuyển ngay
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
