const Navbar = () => {
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Report', href: '#report' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Locker', href: '#locker' }
  ];

  return (
    <nav className="sticky top-4 z-10 flex items-center justify-between rounded-3xl border border-white/5 bg-black/70 px-6 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.5em] text-primary">Vigil</p>
        <h1 className="text-xl font-semibold text-white">Personal Safety OS</h1>
      </div>
      <div className="hidden items-center gap-6 text-sm text-gray-400 sm:flex">
        {navItems.map((item) => (
          <a key={item.label} href={item.href} className="hover:text-white">
            {item.label}
          </a>
        ))}
      </div>
      <button className="rounded-full border border-primary/60 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/20">
        Quick Report
      </button>
    </nav>
  );
};

export default Navbar;
