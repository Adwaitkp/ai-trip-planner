import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { shareApi } from '../api/travelApi';
import Loading from '../components/Loading';
import { FiDownload, FiArrowLeft } from 'react-icons/fi';
import { downloadPdf } from '../utils/pdfUtils';

export default function PublicShare() {
  const { shareId } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const printRef = useRef();

  useEffect(() => {
    const fetchShared = async () => {
      try {
        const res = await shareApi.getShared(shareId);
        setItinerary(res.data);
      } catch (err) {
        setError(err.error || 'Itinerary not found or is private.');
      } finally {
        setLoading(false);
      }
    };
    fetchShared();
  }, [shareId]);

  const handleDownloadPdf = () => {
    if (!itinerary || !printRef.current) return;
    downloadPdf(printRef.current, itinerary.title || 'Itinerary');
  };

  if (loading) return <Loading />;
  
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center bg-slate-50/50">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
            <FiArrowLeft size={28} />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Oops!</h1>
          <p className="text-slate-500 mb-8 max-w-sm">{error}</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <FiArrowLeft size={16} /> Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const data = itinerary.generatedItinerary;

  return (
    <div className="min-h-screen bg-slate-50/50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        
        {/* Header Card */}
        <div className="soft-card flex flex-col gap-5 p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="muted-pill w-fit">Shared itinerary</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
              {itinerary.title}
            </h1>
            <p className="mt-2 text-sm text-slate-500">Shared by {itinerary.ownerName}</p>
          </div>
          <button 
            onClick={handleDownloadPdf}
            className="primary-button w-fit"
          >
            <FiDownload /> Download PDF
          </button>
        </div>

        {/* PDF Content */}
        <div ref={printRef} className="surface-card space-y-8 p-6 text-slate-800 md:p-8">
          
          <div className="space-y-3">
            <h2 className="border-b border-slate-200 pb-2 text-xl font-semibold text-slate-900">
              Trip Summary
            </h2>
            <p className="text-sm leading-7 text-slate-600">{data.tripSummary}</p>
          </div>

          <div className="space-y-4">
            <h2 className="border-b border-slate-200 pb-2 text-xl font-semibold text-slate-900">
              Day-wise Plan
            </h2>
            {data.dayWisePlan?.map((day, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-semibold text-slate-900">Day {day.day}</h3>
                <ul className="mt-2 list-disc list-inside space-y-1 text-sm leading-6 text-slate-600">
                  {day.activities.map((act, j) => <li key={j}>{act}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Places to Visit</h3>
              <ul className="list-disc list-inside space-y-1 text-sm leading-6 text-slate-600">
                {data.suggestedPlaces?.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Local Food</h3>
              <ul className="list-disc list-inside space-y-1 text-sm leading-6 text-slate-600">
                {data.localFood?.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Hotel Info</h3>
              <p className="font-medium text-slate-900">{data.hotelInfo?.name}</p>
              <p className="text-sm text-slate-500">{data.hotelInfo?.address}</p>
              <p className="mt-1 text-sm text-slate-600">
                Check-in: {data.hotelInfo?.checkIn} | Check-out: {data.hotelInfo?.checkOut}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-2 text-lg font-semibold text-slate-900">Transportation</h3>
              <p className="font-medium capitalize text-slate-900">{data.transportationDetails?.type}</p>
              <p className="text-sm leading-6 text-slate-600">{data.transportationDetails?.details}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="border-b border-slate-200 pb-2 text-xl font-semibold text-slate-900">
              Estimated Budget
            </h2>
            <p className="text-2xl font-semibold text-emerald-600">
              {data.estimatedBudget?.currency} {data.estimatedBudget?.amount}
            </p>
            <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="font-medium text-slate-900">Stay</p>
                <p className="text-sm text-slate-600">{data.estimatedBudget?.breakdown?.stay}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="font-medium text-slate-900">Food</p>
                <p className="text-sm text-slate-600">{data.estimatedBudget?.breakdown?.food}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="font-medium text-slate-900">Travel</p>
                <p className="text-sm text-slate-600">{data.estimatedBudget?.breakdown?.travel}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="font-medium text-slate-900">Activities</p>
                <p className="text-sm text-slate-600">{data.estimatedBudget?.breakdown?.activities}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}