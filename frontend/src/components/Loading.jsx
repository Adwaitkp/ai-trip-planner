export default function Loading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex items-center gap-3 rounded-full border border-white/70 bg-white/80 px-5 py-3 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />
        <span className="text-sm font-medium text-slate-600">Loading your journey...</span>
      </div>
    </div>
  );
}