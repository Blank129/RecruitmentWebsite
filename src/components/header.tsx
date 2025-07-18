"use client"

import { Shield, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "./ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-red-500" />
          <span className="text-xl font-bold text-white">SecureGuard Pro</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-white hover:text-red-400 transition-colors">
            Trang chủ
          </Link>
          <Link href="/jobs" className="text-sm font-medium text-white hover:text-red-400 transition-colors">
            Việc làm
          </Link>
          <Link href="/services" className="text-sm font-medium text-white hover:text-red-400 transition-colors">
            Dịch vụ
          </Link>
          <Link href="/about" className="text-sm font-medium text-white hover:text-red-400 transition-colors">
            Giới thiệu
          </Link>
          <Link href="/contact" className="text-sm font-medium text-white hover:text-red-400 transition-colors">
            Liên hệ
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/apply">
            <Button className="bg-red-600 hover:bg-red-700 hidden md:inline-flex">Ứng tuyển ngay</Button>
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <nav className="flex flex-col space-y-4 p-4">
            <Link href="/" className="text-white hover:text-red-400 transition-colors">
              Trang chủ
            </Link>
            <Link href="/jobs" className="text-white hover:text-red-400 transition-colors">
              Việc làm
            </Link>
            <Link href="/services" className="text-white hover:text-red-400 transition-colors">
              Dịch vụ
            </Link>
            <Link href="/about" className="text-white hover:text-red-400 transition-colors">
              Giới thiệu
            </Link>
            <Link href="/contact" className="text-white hover:text-red-400 transition-colors">
              Liên hệ
            </Link>
            <Link href="/apply">
              <Button className="bg-red-600 hover:bg-red-700 w-full">Ứng tuyển ngay</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
