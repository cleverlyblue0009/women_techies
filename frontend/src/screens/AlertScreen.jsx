import { useState } from 'react';

const AlertScreen = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-4">
      <h2 className="text-3xl font-bold text-white">Alert</h2>
      <p className="text-center text-sm text-gray-400">
        Trigger an emergency alert for your contacts.
      </p>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-gradient-to-br from-red-600 to-red-400 px-12 py-4 text-lg font-semibold text-white shadow-[0_20px_40px_rgba(255,0,0,0.4)]"
      >
        ALERT
      </button>
      {open && (
        <div className="absolute inset-0 m-auto flex h-full w-full max-w-[360px] flex-col items-center justify-center rounded-3xl bg-[#12121A] p-6 text-center shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
          <p className="text-lg font-bold text-white">Alert triggered</p>
          <p className="mt-2 text-sm text-gray-400">Dispatching location to saved contacts.</p>
          <button onClick={() => setOpen(false)} className="mt-6 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#9F7AFE] px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white">
            SAFE
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertScreen;
