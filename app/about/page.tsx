import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Shield, Users, Award, Target, CheckCircle, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { number: "500+", label: "Vệ sĩ đã tuyển dụng" },
    { number: "50+", label: "Khách hàng VIP" },
    { number: "5+", label: "Năm kinh nghiệm" },
    { number: "99%", label: "Khách hàng hài lòng" },
  ]

  const team = [
    {
      name: "Nguyễn Văn Minh",
      position: "Giám đốc điều hành",
      experience: "15 năm kinh nghiệm trong lĩnh vực an ninh",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Trần Thị Lan",
      position: "Trưởng phòng tuyển dụng",
      experience: "10 năm kinh nghiệm tuyển dụng nhân sự bảo vệ",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Lê Hoàng Nam",
      position: "Trưởng phòng đào tạo",
      experience: "12 năm kinh nghiệm đào tạo vệ sĩ chuyên nghiệp",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Về chúng tôi</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Đơn vị tuyển dụng vệ sĩ chuyên nghiệp hàng đầu Việt Nam
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Câu chuyện của chúng tôi</h2>
              <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
                <p>
                  SecureGuard Pro được thành lập vào năm 2019 với sứ mệnh cung cấp dịch vụ tuyển dụng vệ sĩ chuyên
                  nghiệp hàng đầu tại Việt Nam. Chúng tôi hiểu rằng an toàn cá nhân là ưu tiên hàng đầu của mọi người,
                  đặc biệt là các nhân vật quan trọng.
                </p>
                <p>
                  Với đội ngũ có kinh nghiệm sâu rộng trong lĩnh vực an ninh và bảo vệ, chúng tôi đã xây dựng một hệ
                  thống tuyển dụng và đào tạo vệ sĩ theo tiêu chuẩn quốc tế, đảm bảo cung cấp những nhân sự chất lượng
                  cao nhất.
                </p>
                <p>
                  Đến nay, chúng tôi đã tuyển dụng thành công hơn 500 vệ sĩ chuyên nghiệp và phục vụ hơn 50 khách hàng
                  VIP, bao gồm doanh nhân, nghệ sĩ và các tổ chức lớn.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Company Story"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <Target className="h-12 w-12 text-red-500 mb-4" />
                <CardTitle className="text-white text-2xl">Sứ mệnh</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Cung cấp dịch vụ tuyển dụng vệ sĩ chuyên nghiệp, đảm bảo an toàn tuyệt đối cho khách hàng thông qua
                  đội ngũ vệ sĩ được đào tạo bài bản và có đạo đức nghề nghiệp cao.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <Star className="h-12 w-12 text-red-500 mb-4" />
                <CardTitle className="text-white text-2xl">Tầm nhìn</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Trở thành đơn vị tuyển dụng vệ sĩ hàng đầu Đông Nam Á, được khách hàng tin tưởng và lựa chọn cho các
                  dịch vụ bảo vệ cá nhân và tài sản quan trọng.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Thành tựu của chúng tôi</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Những con số ấn tượng thể hiện sự tin tưởng của khách hàng
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-red-500 mb-2">{stat.number}</div>
                <div className="text-slate-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Đội ngũ lãnh đạo</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Những người dẫn dắt SecureGuard Pro đến thành công
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-slate-700 border-slate-600 text-center">
                <CardHeader>
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-white text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-red-400 font-semibold">{member.position}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Giá trị cốt lõi</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Những giá trị định hướng mọi hoạt động của chúng tôi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-red-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">An toàn</h3>
              <p className="text-slate-300">Đảm bảo an toàn tuyệt đối cho khách hàng</p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-red-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">Chuyên nghiệp</h3>
              <p className="text-slate-300">Làm việc với tinh thần chuyên nghiệp cao</p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-red-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">Đồng đội</h3>
              <p className="text-slate-300">Tinh thần đồng đội và hỗ trợ lẫn nhau</p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-red-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">Xuất sắc</h3>
              <p className="text-slate-300">Không ngừng nâng cao chất lượng dịch vụ</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Gia nhập đội ngũ của chúng tôi</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Trở thành một phần của SecureGuard Pro và cùng chúng tôi xây dựng tương lai an toàn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs">
              <Button size="lg" className="bg-white text-red-600 hover:bg-slate-100 text-lg px-8">
                Xem việc làm
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600 text-lg px-8 bg-transparent"
              >
                Liên hệ ngay
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
