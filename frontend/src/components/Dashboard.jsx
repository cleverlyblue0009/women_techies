const statusStyles = {
  submitted: 'bg-yellow-500/10 text-yellow-300',
  under_review: 'bg-sky-500/10 text-sky-300',
  escalated: 'bg-red-500/10 text-red-300',
  resolved: 'bg-green-500/10 text-green-300'
};

const Dashboard = ({ complaints = [], loading = false }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {loading && (
        <div className="col-span-full rounded-3xl border border-white/5 bg-card p-5 text-sm text-gray-300">
          Loading complaints...
        </div>
      )}
      {!loading && complaints.length === 0 && (
        <div className="col-span-full rounded-3xl border border-white/5 bg-card p-5 text-sm text-gray-300">
          No complaints yet. Submit one to begin.
        </div>
      )}
      {!loading &&
        complaints.map((entry) => (
          <article
            key={entry.id}
            className="relative flex flex-col gap-3 rounded-3xl border border-white/5 bg-gradient-to-bl from-black/60 to-black/50 p-5 shadow-[0_0_20px_rgba(0,0,0,0.45)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.4em] text-gray-500">{entry.id}</p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  statusStyles[entry.status] ?? 'bg-white/10 text-white'
                }`}
              >
                {entry.status?.replace('_', ' ') ?? 'pending'}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white">{entry.title}</h3>
            <p className="text-sm text-gray-300">
              Latest update: {new Date(entry.updated || entry.createdAt).toLocaleString('en-US', { timeZone: 'UTC' })}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Severity</span>
              <strong className="text-white">{entry.severity ?? 'medium'}</strong>
            </div>
            <div className="h-1 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-violet-500"
                style={{
                  width: `${entry.severity === 'high' ? 100 : entry.severity === 'medium' ? 65 : 35}%`
                }}
              />
            </div>
          </article>
        ))}
    </div>
  );
};

export default Dashboard;
