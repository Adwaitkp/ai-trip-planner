export default function EmptyState({ title, message, action }) {
  return (
    <div className="surface-card text-center px-6 py-14 md:px-10">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/10">
        <span className="text-2xl">✦</span>
      </div>
      <h3 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">{message}</p>
      {action}
    </div>
  );
}