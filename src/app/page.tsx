"use client";
import { Badge } from "../components/ui/badge";
import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import {
  Shield,
  Users,
  Award,
  ArrowRight,
  Star,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

export default function HomePage() {
  const [showAll, setShowAll] = useState(false);
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
  ];
  const sectionRef = useRef<HTMLElement>(null);

  const handleToggle = () => {
    if (showAll) {
      // Khi thu gọn, scroll mượt về đầu section
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      // Delay để scroll hoàn thành trước khi thay đổi state
      setTimeout(() => {
        setShowAll(false);
      }, 300);
    } else {
      // Khi mở rộng, chỉ thay đổi state
      setShowAll(true);
    }
  };

  // Hiển thị 3 card đầu tiên hoặc tất cả tùy vào state
  const displayedTeam = showAll ? team : team.slice(0, 3);
  const carouselItems = [
    {
      imgSrc:
        "https://res.cloudinary.com/drxhxp8rb/image/upload/v1754382526/default-avatar-icon-of-social-media-user-vector_eajxmc.jpg",
    },
    {
      imgSrc:
        "https://res.cloudinary.com/drxhxp8rb/image/upload/v1754382526/default-avatar-icon-of-social-media-user-vector_eajxmc.jpg",
    },
    {
      imgSrc:
        "https://res.cloudinary.com/drxhxp8rb/image/upload/v1754382526/default-avatar-icon-of-social-media-user-vector_eajxmc.jpg",
    },
    {
      imgSrc:
        "https://res.cloudinary.com/drxhxp8rb/image/upload/v1754382526/default-avatar-icon-of-social-media-user-vector_eajxmc.jpg",
    },
    {
      imgSrc:
        "https://res.cloudinary.com/drxhxp8rb/image/upload/v1754382526/default-avatar-icon-of-social-media-user-vector_eajxmc.jpg",
    },
  ];
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-red-600/20 text-red-400 border-red-600/30">
                  Tuyển dụng chuyên nghiệp
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Tuyển dụng <span className="text-red-500">Vệ sĩ</span> chuyên
                  nghiệp
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Kết nối với những cơ hội việc làm hàng đầu trong lĩnh vực bảo
                  vệ cá nhân. Chúng tôi tuyển dụng những vệ sĩ xuất sắc nhất cho
                  các khách hàng VIP.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/jobs">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-lg px-8"
                  >
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Dịch vụ tuyển dụng
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Chúng tôi cung cấp các dịch vụ tuyển dụng vệ sĩ chuyên nghiệp cho
              mọi nhu cầu
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
                <CardTitle className="text-white">
                  Đào tạo chuyên nghiệp
                </CardTitle>
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

      {/* CTA Section */}
      {/* <section className="py-20 bg-gradient-to-r from-red-600 to-red-700"> */}
      <section ref={sectionRef} className="py-20 bg-slate-800">
        <div className="grid md:grid-cols-3 gap-8">
          {displayedTeam.map((member, index) => (
            <Card
              key={index}
              className="bg-slate-700 border-slate-600 text-center transition-all duration-300 hover:transform hover:scale-105 relative group overflow-hidden"
            >
              <CardHeader>
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
                />
                <CardTitle className="text-white text-xl">
                  {member.name}
                </CardTitle>
                <CardDescription className="text-red-400 font-semibold">
                  {member.position}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">{member.experience}</p>
              </CardContent>

              {/* Overlay với nút Xem chi tiết */}
              <div className="absolute inset-0 bg-slate-900/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => {
                    // Xử lý khi click xem chi tiết
                    console.log(`Xem chi tiết ${member.name}`);
                    alert(`Xem chi tiết ${member.name}`);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 transform translate-y-4 group-hover:translate-y-0"
                >
                  Xem chi tiết
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Nút Xem thêm/Thu gọn */}
        {team.length > 3 && (
          <div className="text-center mt-12">
            <button
              onClick={handleToggle}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              {showAll ? (
                <>
                  Thu gọn
                  <ChevronUp className="w-5 h-5" />
                </>
              ) : (
                <>
                  Xem thêm
                  <ChevronDown className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}
        {/* <div
          className="container mx-auto px-4 lg:px-6"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              style={{
                padding: "16px",
                borderRadius: "8px",
                border: "2px solid #ffffff",
                width: "100%",
                maxWidth: "400px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "60px",
              }}
            >
              <img
                style={{
                  maxWidth: "46%",
                  height: "auto",
                  marginBottom: "16px",
                }}
                src="https://res.cloudinary.com/drxhxp8rb/image/upload/v1754382526/default-avatar-icon-of-social-media-user-vector_eajxmc.jpg"
                alt="Avatar"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  marginBottom: "4px",
                }}
                className="text-xl text-red-100 mb-8 max-w-2xl"
              >
                <span>Chiều cao: 180 cm</span>
                <span>Cân nặng: 70 kg</span>
                <span>Giới tính: Nam</span>
                <span>...</span>
              </div>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-red-600 text-lg px-8 bg-transparent"
                >
                  Xem chi tiết
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <style jsx>{`
          @media (min-width: 768px) {
            .container {
              display: flex;
              flex-wrap: nowrap;
            }
          }
        `}</style> */}
        {/* <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            Sẵn sàng bắt đầu sự nghiệp vệ sĩ?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Gia nhập đội ngũ vệ sĩ chuyên nghiệp với mức lương hấp dẫn và môi
            trường làm việc tốt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-slate-100 text-lg px-8"
              >
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
          </div> */}
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Những lý do khiến chúng tôi trở thành lựa chọn hàng đầu trong lĩnh
              vực tuyển dụng vệ sĩ
            </p>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: false,
              slidesToScroll: 1,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {carouselItems.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="text-center space-y-4 p-4">
                    <img src={item.imgSrc} />
                    {/* <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="text-slate-300">{item.description}</p> */}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700" />
            <CarouselNext className="hidden md:flex bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700" />
          </Carousel>
        </div>
      </section>

      <Footer />
    </div>
  );
}
