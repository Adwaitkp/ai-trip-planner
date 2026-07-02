import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUser(data);
      toast.success('Registration successful');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-amber-50 via-white to-indigo-50 p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.18),transparent_25%)]" />
          <div className="relative max-w-md">
            <p className="muted-pill">Start free</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900">Create a travel workspace that feels calm and inviting.</h1>
            <p className="mt-5 text-sm leading-7 text-slate-600">Keep every trip detail organized in one place, generate itineraries instantly, and share them with confidence.</p>
          </div>

          <div className="relative grid gap-4 sm:grid-cols-2">
            {['Clean dashboard', 'Quick itinerary generation', 'Beautiful PDF export', 'Private sharing'].map((item) => (
              <div key={item} className="rounded-3xl border border-slate-200/80 bg-white/80 p-4 text-sm text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <p className="muted-pill mx-auto mb-4 w-fit">TravelAI</p>
              <h2 className="section-title">Create your account</h2>
              <p className="section-subtitle">Start planning trips with a space that feels easy to use.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
                <div className="relative">
                  <FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input {...register('name', { required: 'Name is required' })} type="text" className="input-field pl-11" placeholder="Your name" />
                </div>
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <div className="relative">
                  <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input {...register('email', { required: 'Email is required' })} type="email" className="input-field pl-11" placeholder="you@example.com" />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                  <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })} type="password" className="input-field pl-11" placeholder="Create a password" />
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
              </div>

              <button disabled={loading} type="submit" className="primary-button w-full">
                {loading ? 'Creating Account...' : <><FiArrowRight /> Register</>}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account? <Link to="/login" className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}