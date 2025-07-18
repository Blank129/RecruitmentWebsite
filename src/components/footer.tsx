import { Shield } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-red-500" />
              <span className="text-lg font-bold text-white">SecureGuard Pro</span>
            </div>
            <p className="text-slate-400 text-sm">Đơn vị tuyển dụng vệ sĩ chuyên nghiệp hàng đầu Việt Nam</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Trang chính</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-white transition-colors">
                  Việc làm
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Dịch vụ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Giới thiệu
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-white transition-colors">
                  Ứng tuyển
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Chính sách
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Theo dõi</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  YouTube
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Zalo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} SecureGuard Pro. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
