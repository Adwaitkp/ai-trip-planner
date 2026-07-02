import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadApi, itineraryApi } from '../api/travelApi';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import { FiUploadCloud, FiFileText, FiStar, FiCheckCircle } from 'react-icons/fi';

export default function UploadBooking() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [uploadId, setUploadId] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'].includes(selected.type)) {
      setFile(selected);
      setExtractedData(null);
    } else {
      toast.error('Invalid file type');
    }
  };

  const handleExtract = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('document', file);
      const res = await uploadApi.upload(formData);
      setUploadId(res.data.upload._id);
      setExtractedData(res.data.extractedData);
      toast.success('Data extracted successfully');
    } catch (err) {
      toast.error(err.error || 'Extraction failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!uploadId) return;
    setLoading(true);
    try {
      const res = await itineraryApi.generate(uploadId);
      toast.success('Itinerary generated!');
      navigate(`/itineraries/${res.data.id}`);
    } catch (err) {
      toast.error(err.error || 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="soft-card overflow-hidden">
        <div className="grid gap-6 p-6 md:grid-cols-[1.05fr_0.95fr] md:p-8">
          <div>
            <p className="muted-pill w-fit">Upload flow</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">Turn a booking into a trip plan.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">Upload a PDF or image of your flight, hotel, or transport document. We’ll extract the trip details and generate a polished itinerary for you.</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {['Upload file', 'Extract details', 'Generate itinerary'].map((step) => (
                <div key={step} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
                  {step}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl shadow-slate-900/10">
            <FiStar className="text-2xl text-amber-300" />
            <p className="mt-4 text-sm text-slate-300">What you’ll get</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-100">
              <li className="flex items-center gap-2"><FiCheckCircle className="text-emerald-300" /> Clean travel summary</li>
              <li className="flex items-center gap-2"><FiCheckCircle className="text-emerald-300" /> Day-wise plan</li>
              <li className="flex items-center gap-2"><FiCheckCircle className="text-emerald-300" /> PDF-ready itinerary</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="surface-card p-6 md:p-8">
        <div className="rounded-[2rem] border border-dashed border-slate-200 bg-slate-50/80 p-8 text-center transition hover:border-slate-300 hover:bg-slate-50">
          <FiUploadCloud className="mx-auto text-slate-400" size={52} />
          <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileChange} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
            <FiFileText />
            {file ? file.name : 'Choose PDF or image'}
          </label>
          <p className="mt-3 text-sm text-slate-500">PDF, PNG, JPG, or JPEG up to 5MB.</p>
        </div>

        {!extractedData && (
          <button onClick={handleExtract} disabled={!file} className="primary-button mt-6 w-full">
            Extract Booking Data
          </button>
        )}

        {extractedData && (
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              Data extracted successfully.
            </div>
            <pre className="max-h-72 overflow-auto rounded-3xl bg-slate-950 p-5 text-sm leading-6 text-slate-100 shadow-inner shadow-slate-900/20">
              {JSON.stringify(extractedData, null, 2)}
            </pre>
            <button onClick={handleGenerate} disabled={!uploadId} className="primary-button w-full bg-emerald-600 hover:bg-emerald-500">
              Generate AI Itinerary
            </button>
          </div>
        )}
      </div>
    </div>
  );
}