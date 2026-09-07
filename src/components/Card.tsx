export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-black/20 ${className}`}
    >
      {children}
    </div>
  );
}
