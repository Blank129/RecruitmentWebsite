"use client";
import {
  Shield,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  FolderKanban,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { AuthContext } from "../context/authContext";
import { useRouter } from "next/navigation";
import { set } from "react-hook-form";

export function Header() {
  const router = useRouter();
  const { userInfo, setUserInfo, handleGetUserInfo } = AuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      handleGetUserInfo(token);
    } else {
      setUserInfo(null);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("userToken");
    router.push("/login");
    setIsDropdownOpen(false);
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-red-500" />
          <span className="text-xl font-bold text-white">SecureGuard Pro</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium text-white hover:text-red-400 transition-colors"
          >
            Trang chủ
          </Link>
          <Link
            href="/jobs"
            className="text-sm font-medium text-white hover:text-red-400 transition-colors"
          >
            Việc làm
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-white hover:text-red-400 transition-colors"
          >
            Dịch vụ
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-white hover:text-red-400 transition-colors"
          >
            Giới thiệu
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-white hover:text-red-400 transition-colors"
          >
            Liên hệ
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {userInfo ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-slate-800 transition-colors hidden md:flex"
              >
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-medium">
                  {userInfo.avatar ? (
                    <img
                      src={userInfo.avatar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm">
                      {userInfo.name?.charAt(0)?.toUpperCase() ||
                        userInfo.email?.charAt(0)?.toUpperCase() ||
                        "U"}
                    </span>
                  )}
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg py-1 z-50 border border-slate-700">
                  <div className="px-4 py-2 text-sm text-slate-300 border-b border-slate-700">
                    <div className="font-medium text-white">
                      {userInfo.name || "User"}
                    </div>
                    <div className="text-xs">{userInfo.email}</div>
                  </div>

                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Hồ sơ cá nhân
                  </Link>

                  {userInfo.id_role_users === 2 && (
                    <Link
                      href="/manage-jobs"
                      className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FolderKanban className="w-4 h-4 mr-3" />
                      Quản lí tin đăng
                    </Link>
                  )}

                  <button
                    onClick={handleLogoutClick}
                    className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <Button className="bg-red-600 hover:bg-red-700 hidden md:inline-flex">
                Đăng nhập
              </Button>
            </Link>
          )}

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <nav className="flex flex-col space-y-4 p-4">
            <Link
              href="/"
              className="text-white hover:text-red-400 transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              href="/jobs"
              className="text-white hover:text-red-400 transition-colors"
            >
              Việc làm
            </Link>
            <Link
              href="/services"
              className="text-white hover:text-red-400 transition-colors"
            >
              Dịch vụ
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-red-400 transition-colors"
            >
              Giới thiệu
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-red-400 transition-colors"
            >
              Liên hệ
            </Link>

            {userInfo ? (
              <>
                <div className="border-t border-slate-700 pt-4 mt-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-medium">
                      {userInfo.avatar ? (
                        <img
                          src={userInfo.avatar}
                          alt="Avatar"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-sm">
                          {userInfo.name?.charAt(0)?.toUpperCase() ||
                            userInfo.email?.charAt(0)?.toUpperCase() ||
                            "U"}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="text-white font-medium">
                        {userInfo.name || "User"}
                      </div>
                      <div className="text-xs text-slate-400">
                        {userInfo.email}
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    className="flex items-center text-white hover:text-red-400 transition-colors mb-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Hồ sơ cá nhân
                  </Link>

                  {userInfo.id_role_users === 2 && (
                    <Link
                      href="/manage-jobs"
                      className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FolderKanban className="w-4 h-4 mr-3" />
                      Quản lí tin đăng
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      handleLogoutClick();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center text-white hover:text-red-400 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Đăng xuất
                  </button>
                </div>
              </>
            ) : (
              <Link href="/login">
                <Button className="bg-red-600 hover:bg-red-700 w-full">
                  Đăng nhập
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
