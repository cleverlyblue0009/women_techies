const ProfileScreen = () => {
  return (
    <div className="space-y-5 px-4">
      <h2 className="text-2xl font-semibold text-white">Profile</h2>
      <div className="space-y-3 rounded-3xl bg-[#12121A] p-4 shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
        <input className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white" placeholder="Contact 1" />
        <input className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white" placeholder="Contact 2" />
        <button className="w-full rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#9F7AFE] px-4 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white">
          Save contacts
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
