"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { token, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/Login");
  };

  return (
    <nav className="bg-white shadow-md p-4 fixed w-full z-10 top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-2xl font-extrabold">
          <Link href="/">Lojiper</Link>
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black hover:text-blue-500 focus:outline-none focus:text-blue-500"
          >
            <svg
              className="h-6 w-6 fill-none stroke-current"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`lg:flex items-center space-x-4 ${
            isMenuOpen ? "block" : "hidden"
          } lg:block`}
        >
          {token ? (
            <>
              <Link href="/Debts" className="text-black hover:text-blue-500">
                Debts
              </Link>
              <Link href="/Payment" className="text-black hover:text-blue-500">
                Payment Plan
              </Link>
              <Link
                href="/Dashboard"
                className="text-black hover:text-blue-500"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-black hover:text-blue-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/Login" className="text-black hover:text-blue-500">
                Giriş Yap
              </Link>
              <Link href="/Register" className="text-black hover:text-blue-500">
                Kayıt Ol
              </Link>
            </>
          )}
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-black hover:text-blue-500"
          >
            Kapat
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
