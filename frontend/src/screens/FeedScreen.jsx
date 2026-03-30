const FeedScreen = () => {
  return (
    <div className="space-y-5 px-4 pb-10">
      <h2 className="text-2xl font-semibold text-white">Community Feed</h2>
      <div className="flex items-center gap-3 rounded-3xl bg-[#12121A] p-3 text-sm text-gray-400">
        <button className="px-3 py-1 rounded-full bg-[#1E1E2A] text-white">Local</button>
        <button className="px-3 py-1 rounded-full bg-transparent text-gray-400">Global</button>
      </div>
      <div className="rounded-3xl bg-[#12121A] p-4 text-sm text-gray-400">Post composer placeholder</div>
      <div className="space-y-3">
        {[1, 2, 3].map((post) => (
          <div key={post} className="rounded-3xl bg-[#12121A] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            <p className="text-xs uppercase tracking-[0.4em] text-gray-500">Complaint · 5m ago</p>
            <h3 className="mt-2 text-lg font-semibold text-white">Suspicious activity</h3>
            <p className="mt-2 text-sm text-gray-300">Watchful neighbors flagged movement near the park.</p>
            <div className="mt-3 text-xs text-gray-500">Location: Vellore city center</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedScreen;
