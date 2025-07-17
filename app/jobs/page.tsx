import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, DollarSign, Clock, Search, Filter } from "lucide-react"
import Link from "next/link"

export default function JobsPage() {
  const jobs = [
    {
      id: 1,
      title: "Vệ sĩ cá nhân - Doanh nhân",
      company: "VIP Protection Services",
      location: "TP. Hồ Chí Minh",
      salary: "25-35 triệu/tháng",
      type: "Toàn thời gian",
      posted: "2 ngày trước",
      description: "Bảo vệ doanh nhân thành đạt tại TP.HCM",
      requirements: ["Kinh nghiệm 3+ năm", "Võ thuật", "Lái xe"],
      typeColor: "bg-green-600/20 text-green-400 border-green-600/30",
    },
    {
      id: 2,
      title: "Trưởng đội bảo vệ",
      company: "Elite Security Group",
      location: "Hà Nội",
      salary: "40-60 triệu/tháng",
      type: "Quản lý",
      posted: "1 tuần trước",
      description: "Quản lý đội ngũ vệ sĩ cho tập đoàn lớn",
      requirements: ["Kinh nghiệm 5+ năm", "Quản lý", "Tiếng Anh"],
      typeColor: "bg-blue-600/20 text-blue-400 border-blue-600/30",
    },
    {
      id: 3,
      title: "Vệ sĩ sự kiện",
      company: "Event Security Pro",
      location: "Toàn quốc",
      salary: "500k-1tr/ngày",
      type: "Bán thời gian",
      posted: "3 ngày trước",
      description: "Bảo vệ các sự kiện lớn và nghệ sĩ nổi tiếng",
      requirements: ["Linh hoạt", "Sự kiện", "Du lịch"],
      typeColor: "bg-purple-600/20 text-purple-400 border-purple-600/30",
    },
    {
      id: 4,
      title: "Vệ sĩ nữ",
      company: "Lady Guard Services",
      location: "TP. Hồ Chí Minh",
      salary: "20-30 triệu/tháng",
      type: "Ưu tiên nữ",
      posted: "5 ngày trước",
      description: "Bảo vệ khách hàng nữ VIP và gia đình",
      requirements: ["Nữ giới", "Tự vệ", "Thân thiện"],
      typeColor: "bg-pink-600/20 text-pink-400 border-pink-600/30",
    },
    {
      id: 5,
      title: "Vệ sĩ tài xế",
      company: "Drive & Protect Co.",
      location: "Đà Nẵng",
      salary: "18-25 triệu/tháng",
      type: "Toàn thời gian",
      posted: "1 ngày trước",
      description: "Vừa lái xe vừa bảo vệ khách hàng VIP",
      requirements: ["Bằng lái B2", "Kinh nghiệm lái", "Bảo vệ"],
      typeColor: "bg-green-600/20 text-green-400 border-green-600/30",
    },
    {
      id: 6,
      title: "Vệ sĩ khách sạn",
      company: "Luxury Hotel Security",
      location: "Nha Trang",
      salary: "15-22 triệu/tháng",
      type: "Toàn thời gian",
      posted: "4 ngày trước",
      description: "Bảo vệ khách VIP tại resort 5 sao",
      requirements: ["Tiếng Anh cơ bản", "Giao tiếp tốt", "Ngoại hình"],
      typeColor: "bg-green-600/20 text-green-400 border-green-600/30",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Cơ hội việc làm</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Khám phá các vị trí vệ sĩ hấp dẫn với mức lương cạnh tranh
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-slate-800">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Tìm kiếm việc làm..." className="pl-10 bg-slate-700 border-slate-600 text-white" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Lọc
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">Tìm kiếm</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid gap-6">
            {jobs.map((job) => (
              <Card key={job.id} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-white text-xl mb-2">{job.title}</CardTitle>
                      <CardDescription className="text-slate-300 mb-2">
                        {job.company} • {job.description}
                      </CardDescription>
                      <div className="flex items-center gap-4 text-sm text-slate-300 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.posted}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, index) => (
                          <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-300">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <Badge className={job.typeColor}>{job.type}</Badge>
                      <Link href={`/jobs/${job.id}`}>
                        <Button className="bg-red-600 hover:bg-red-700">Xem chi tiết</Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
              Xem thêm việc làm
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
