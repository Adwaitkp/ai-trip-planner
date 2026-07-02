import { NavLink, Link } from 'react-router-dom';
import { FiHome, FiUploadCloud, FiList, FiCompass } from 'react-icons/fi';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
  { to: '/upload', label: 'Upload Booking', icon: <FiUploadCloud /> },
  { to: '/itineraries', label: 'My Itineraries', icon: <FiList /> },
];

export default function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-72 flex-col border-r border-slate-200/80 bg-white lg:flex">
        {/* Logo Section */}
        <div className="flex h-[4.5rem] shrink-0 items-center gap-3 border-b border-slate-200/80 px-6">
          <Link to="/dashboard" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white shadow-lg shadow-slate-900/20">
              TA
            </span>
            <span>
              <span className="block text-lg font-semibold tracking-tight text-slate-900">
                TravelAI
              </span>
              <span className="block text-[11px] font-normal leading-tight text-slate-400">
                Plan trips with ease
              </span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6">
          {/* Journey Studio Card */}
          <div className="mb-6 rounded-3xl bg-slate-900 p-5 text-white shadow-xl shadow-slate-900/10">
            <div className="flex items-center gap-2">
              <FiCompass className="text-amber-300" />
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-300">
                Journey Studio
              </p>
            </div>
            <h2 className="mt-3 text-lg font-semibold">Your trip workspace</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Upload, generate, and review everything in one calm place.
            </p>
          </div>

          {/* Nav Links */}
          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Menu
          </p>
          <nav className="space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                <span className="text-lg">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-200/80 px-6 py-4">
          <p className="text-xs text-slate-400">© 2025 TravelAI</p>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {/* Add mobile sidebar logic if needed */}
    </>
  );
}