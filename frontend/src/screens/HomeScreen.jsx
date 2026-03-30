const HomeScreen = () => {
  return (
    <div className="space-y-5 px-4">
      <div className="text-sm uppercase tracking-[0.4em] text-gray-500">Safety Map</div>
      <div className="rounded-2xl bg-[#12121A] p-4 shadow-[0_20px_45px_rgba(0,0,0,0.4)]">
        <div className="text-xs uppercase tracking-[0.4em] text-gray-400">Safety score</div>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-5xl font-bold text-white">72</p>
            <p className="text-xs uppercase tracking-[0.4em] text-gray-500">Medium</p>
          </div>
          <div className="text-right text-xs text-gray-400">Updated · 2m ago</div>
        </div>
      </div>
      <div className="h-[300px] rounded-3xl bg-gradient-to-br from-[#15152a] to-[#0b0b0f] p-4 shadow-inner">
        <p className="text-sm text-gray-400">Map placeholder</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-[#12121A] p-4">
        <p className="text-sm font-semibold text-white">Local alerts</p>
        <p className="text-xs text-gray-400">No new community updates</p>
      </div>
    </div>
  );
};

export default HomeScreen;
