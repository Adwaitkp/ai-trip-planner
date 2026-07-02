import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 flex h-[4.5rem] shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      {/* Left: Mobile Logo Only */}
      <Link to="/dashboard" className="flex items-center gap-2.5 lg:hidden">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-xs font-bold text-white shadow-md shadow-slate-900/20">
          TA
        </span>
        <span className="text-lg font-semibold tracking-tight text-slate-900">
          TravelAI
        </span>
      </Link>

      {/* Left: Desktop - Page breadcrumb or title placeholder */}
      <div className="hidden lg:block">
        {/* Can add breadcrumb here later */}
      </div>

      {/* Right: User Actions */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            {/* Desktop User Info */}
            <div className="hidden items-center gap-3 md:flex">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-800 to-slate-900 text-sm font-semibold text-white shadow-md shadow-slate-900/20">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <FiLogOut size={16} />
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && user && (
        <div className="absolute right-4 top-[4.5rem] z-50 w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-200/50 md:hidden">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-slate-800 to-slate-900 text-sm font-semibold text-white">
              {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>
          
          <div className="mt-2 space-y-0.5 px-2">
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              Dashboard
            </Link>
            <Link
              to="/upload"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              Upload Booking
            </Link>
            <Link
              to="/itineraries"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              My Itineraries
            </Link>
          </div>

          <hr className="my-2 border-slate-100" />
          
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}