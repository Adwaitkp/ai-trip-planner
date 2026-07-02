import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FiUploadCloud, FiList, FiArrowRight, FiCompass, FiStar } from 'react-icons/fi';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="soft-card overflow-hidden">
        <div className="grid gap-8 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
          <div className="space-y-4">
            <p className="muted-pill w-fit">Your trip space</p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">Welcome back, {user?.name}.</h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 md:text-base">Plan your next trip with a cleaner flow. Upload a booking, let AI shape the itinerary, and keep everything ready to share or download.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/upload" className="primary-button">
                <FiUploadCloud /> Start a new trip
              </Link>
              <Link to="/itineraries" className="secondary-button">
                <FiList /> View itineraries
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-lg shadow-slate-900/10">
              <FiCompass className="text-2xl text-amber-300" />
              <p className="mt-4 text-sm text-slate-300">One place for every journey</p>
              <p className="mt-2 text-lg font-semibold">Upload, generate, and relax.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <FiStar className="text-2xl text-indigo-500" />
              <p className="mt-4 text-sm text-slate-500">AI assistance</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Better itineraries with less effort.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link to="/upload" className="surface-card group p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-100">
            <FiUploadCloud size={24} />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-slate-900">Upload Booking</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">Drop in a flight, hotel, or train ticket and we’ll pull the trip details into your workspace.</p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
            Start here <FiArrowRight />
          </div>
        </Link>

        <Link to="/itineraries" className="surface-card group p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-100">
            <FiList size={24} />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-slate-900">View Itineraries</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">Browse your saved trips, open any itinerary, and export it when you’re ready.</p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
            Explore trips <FiArrowRight />
          </div>
        </Link>
      </div>
    </div>
  );
}