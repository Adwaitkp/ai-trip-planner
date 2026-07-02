import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data);
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative hidden overflow-hidden bg-slate-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.35),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.28),transparent_28%)]" />
          <div className="relative max-w-md">
            <p className="muted-pill bg-white/10 text-white/70">Welcome back</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight">Plan calmer trips with one beautiful workspace.</h1>
            <p className="mt-5 text-sm leading-7 text-slate-300">Sign in to pick up where you left off, keep your bookings organized, and generate itineraries with less friction.</p>
          </div>

          <div className="relative grid gap-4 sm:grid-cols-3">
            {['Fast uploads', 'Smart itineraries', 'Easy sharing'].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/10 p-4 text-sm text-slate-100">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <p className="muted-pill mx-auto mb-4 w-fit">TravelAI</p>
              <h2 className="section-title">Welcome back</h2>
              <p className="section-subtitle">Sign in to continue your trip planning flow.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  <input {...register('password', { required: 'Password is required' })} type="password" className="input-field pl-11" placeholder="Enter your password" />
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
              </div>

              <button disabled={loading} type="submit" className="primary-button w-full">
                {loading ? 'Logging in...' : <><FiArrowRight /> Login</>}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account? <Link to="/register" className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}