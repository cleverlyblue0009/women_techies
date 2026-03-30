const EmergencyButton = () => {
  return (
    <button
      className="fixed bottom-6 right-6 z-20 flex items-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-red-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white shadow-[0_20px_40px_rgba(255,0,0,0.35)] transition hover:scale-[1.02]"
      aria-label="Emergency button"
    >
      <span className="h-3 w-3 rounded-full bg-white animate-pulse" />
      ALERT
    </button>
  );
};

export default EmergencyButton;
