const ReportScreen = () => {
  return (
    <div className="space-y-5 px-4">
      <h2 className="text-2xl font-semibold text-white">Report</h2>
      <div className="space-y-3 rounded-3xl bg-[#12121A] p-4 shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
        <input className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white" placeholder="Title" />
        <textarea className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white" rows="4" placeholder="Description" />
        <select className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white">
          <option>Harassment</option>
          <option>Theft</option>
          <option>Assault</option>
        </select>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Media upload</span>
          <button className="text-[#7C3AED]">Attach</button>
        </div>
        <button className="w-full rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#9F7AFE] px-4 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReportScreen;
