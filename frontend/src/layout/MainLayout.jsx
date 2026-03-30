const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0B0B0F]">
      <div className="relative h-screen w-full max-w-[420px]">
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center px-4 py-3">
          <div className="w-full rounded-b-3xl border border-white/10 bg-white/5 bg-clip-padding text-center text-xs font-semibold uppercase tracking-[0.7em] text-white backdrop-blur">
            Praesidium AI
          </div>
        </div>
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto pb-[90px] pt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
