"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/Login');
  };

  return (
    <nav className="bg-white shadow-md p-4 fixed w-full z-10 top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-xl font-bold">
          <Link href="/">LOGO</Link>
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black hover:text-blue-500 focus:outline-none focus:text-blue-500"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
        <div className="hidden lg:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/Debts" className="text-black hover:text-blue-500">Debts</Link>
              <Link href="/Payment" className="text-black hover:text-blue-500">Payment Plan</Link>
              <Link href="/Dashboard" className="text-black hover:text-blue-500">Dashboard</Link>
              <button onClick={handleLogout} className="text-black hover:text-blue-500">Logout</button>
            </>
          ) : (
            <>
              <Link href="/Login" className="text-black hover:text-blue-500">Giriş Yap</Link>
              <Link href="/Register" className="text-black hover:text-blue-500">Kayıt Ol</Link>
            </>
          )}
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-20 flex flex-col items-center justify-center space-y-4">
          <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4 bg-white shadow-md">
            <div className="text-black text-xl font-bold">
              <Link href="/">LOGO</Link>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-black hover:text-blue-500 focus:outline-none focus:text-blue-500"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-16 flex flex-col items-center space-y-4">
            {isLoggedIn ? (
              <>
                <Link href="/Debts" className="text-black hover:text-blue-500 text-xl" onClick={() => setIsMenuOpen(false)}>Debts</Link>
                <Link href="/Payment" className="text-black hover:text-blue-500 text-xl" onClick={() => setIsMenuOpen(false)}>Payment Plan</Link>
                <Link href="/Dashboard" className="text-black hover:text-blue-500 text-xl" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-black hover:text-blue-500 text-xl">Logout</button>
              </>
            ) : (
              <>
                <Link href="/Login" className="text-black hover:text-blue-500 text-xl" onClick={() => setIsMenuOpen(false)}>Giriş Yap</Link>
                <Link href="/Register" className="text-black hover:text-blue-500 text-xl" onClick={() => setIsMenuOpen(false)}>Kayıt Ol</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
