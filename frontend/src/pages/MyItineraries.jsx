import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { itineraryApi } from '../api/travelApi';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import { FiTrash2, FiEye } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function MyItineraries() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItineraries = async () => {
    try {
      const res = await itineraryApi.getAll();
      setItineraries(res.data);
    } catch (err) {
      toast.error('Failed to load itineraries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this itinerary?')) return;
    try {
      await itineraryApi.delete(id);
      toast.success('Itinerary deleted');
      setItineraries((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      toast.error(err.error || 'Delete failed');
    }
  };

  if (loading) return <Loading />;
  if (itineraries.length === 0) {
    return <EmptyState title="No itineraries yet" message="Upload a booking document to generate your first AI itinerary and keep all your trips in one place." action={<Link to="/upload" className="primary-button">Upload Booking</Link>} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="muted-pill w-fit">Saved trips</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">My Itineraries</h1>
        <p className="mt-2 text-sm text-slate-500">Everything you’ve generated is stored here for quick access.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {itineraries.map((item) => (
          <div key={item.id} className="surface-card overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
            <div className="p-6">
              <p className="muted-pill">{new Date(item.createdAt).toLocaleDateString()}</p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">Open the generated itinerary, share it, or remove it when you’re done.</p>
              <div className="mt-5 flex gap-3">
                <Link to={`/itineraries/${item.id}`} className="secondary-button flex-1 justify-center">
                  <FiEye /> View
                </Link>
                <button onClick={() => handleDelete(item.id)} className="secondary-button px-4 text-red-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}