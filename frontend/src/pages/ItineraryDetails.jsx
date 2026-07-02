import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { itineraryApi } from '../api/travelApi';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';
import { FiShare2, FiDownload } from 'react-icons/fi';
import { downloadPdf } from '../utils/pdfUtils'; // <-- Import new util

export default function ItineraryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const printRef = useRef();

  const copyShareLink = async (shareId) => {
    const shareLink = `${window.location.origin}/share/${shareId}`;
    await navigator.clipboard.writeText(shareLink);
    toast.success('Share link copied to clipboard!');
  };

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const res = await itineraryApi.getById(id);
        setItinerary(res.data);
      } catch (err) {
        toast.error('Failed to load itinerary');
        navigate('/itineraries');
      } finally {
        setLoading(false);
      }
    };
    fetchItinerary();
  }, [id, navigate]);

  const handleToggleShare = async () => {
    try {
      if (itinerary?.isPublic && itinerary?.shareId) {
        await copyShareLink(itinerary.shareId);
        return;
      }

      const res = await itineraryApi.toggleShare(id);
      setItinerary(res.data);

      if (res.data.isPublic && res.data.shareId) {
        await copyShareLink(res.data.shareId);
        return;
      }

      toast.success('Sharing disabled');
    } catch (err) {
      toast.error(err.error || 'Failed to toggle share');
    }
  };

  // NEW PDF HANDLER (No hanging, no errors)
  const handleDownloadPdf = () => {
    if (!printRef.current) return;
    downloadPdf(printRef.current, itinerary.title || 'Itinerary');
  };

  if (loading) return <Loading />;
  if (!itinerary) return null;

  const data = itinerary.generatedItinerary;

  return (
    <div className="space-y-6">
      <div className="soft-card p-6 md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="muted-pill w-fit">Itinerary details</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              {itinerary.title}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Generated on {new Date(itinerary.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleToggleShare} className="secondary-button">
              <FiShare2 /> {itinerary.isPublic ? 'Shared' : 'Share'}
            </button>
            <button onClick={handleDownloadPdf} className="primary-button">
              <FiDownload /> PDF
            </button>
          </div>
        </div>
      </div>

      <div ref={printRef} className="surface-card space-y-8 p-6 text-slate-800 md:p-8">
        {/* ... KEEP ALL YOUR EXISTING DATA JSX EXACTLY THE SAME ... */}
        <div className="space-y-3">
          <h2 className="border-b border-slate-200 pb-2 text-xl font-semibold text-slate-900">Trip Summary</h2>
          <p className="text-sm leading-7 text-slate-600">{data.tripSummary}</p>
        </div>

        <div className="space-y-4">
          <h2 className="border-b border-slate-200 pb-2 text-xl font-semibold text-slate-900">Day-wise Plan</h2>
          <div className="space-y-4">
            {data.dayWisePlan?.map((day, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="mb-2 font-semibold text-slate-900">Day {day.day}</h3>
                <ul className="list-disc list-inside space-y-1 text-sm leading-6 text-slate-600">
                  {day.activities.map((act, j) => <li key={j}>{act}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 border-b border-slate-200 pb-2 text-lg font-semibold text-slate-900">Hotel Info</h2>
            <p className="font-medium text-slate-900">{data.hotelInfo?.name}</p>
            <p className="text-sm text-slate-500">{data.hotelInfo?.address}</p>
            <p className="mt-1 text-sm text-slate-600">Check-in: {data.hotelInfo?.checkIn} | Check-out: {data.hotelInfo?.checkOut}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 border-b border-slate-200 pb-2 text-lg font-semibold text-slate-900">Transportation</h2>
            <p className="font-medium capitalize text-slate-900">{data.transportationDetails?.type}</p>
            <p className="text-sm leading-6 text-slate-600">{data.transportationDetails?.details}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="border-b border-slate-200 pb-2 text-xl font-semibold text-slate-900">Suggested Places & Food</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-2 font-semibold text-slate-900">Places to Visit</h3>
              <ul className="list-disc list-inside space-y-1 text-sm leading-6 text-slate-600">
                {data.suggestedPlaces?.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-2 font-semibold text-slate-900">Local Food</h3>
              <ul className="list-disc list-inside space-y-1 text-sm leading-6 text-slate-600">
                {data.localFood?.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="border-b border-slate-200 pb-2 text-xl font-semibold text-slate-900">Estimated Budget</h2>
          <p className="text-3xl font-semibold tracking-tight text-emerald-600">{data.estimatedBudget?.currency} {data.estimatedBudget?.amount}</p>
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3"><p className="font-medium text-slate-900">Stay</p><p className="text-sm text-slate-600">{data.estimatedBudget?.breakdown?.stay}</p></div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3"><p className="font-medium text-slate-900">Food</p><p className="text-sm text-slate-600">{data.estimatedBudget?.breakdown?.food}</p></div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3"><p className="font-medium text-slate-900">Travel</p><p className="text-sm text-slate-600">{data.estimatedBudget?.breakdown?.travel}</p></div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3"><p className="font-medium text-slate-900">Activities</p><p className="text-sm text-slate-600">{data.estimatedBudget?.breakdown?.activities}</p></div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 border-b border-slate-200 pb-2 text-lg font-semibold text-slate-900">Packing Checklist</h2>
            <ul className="list-disc list-inside space-y-1 text-sm leading-6 text-slate-600">
              {data.packingChecklist?.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 border-b border-slate-200 pb-2 text-lg font-semibold text-slate-900">Travel Tips</h2>
            <ul className="list-disc list-inside space-y-1 text-sm leading-6 text-slate-600">
              {data.travelTips?.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}