const entries = [
  {
    name: 'front-gate.mp4',
    time: '2026-03-29 20:58',
    hash: 'e3f6a7df6058c9a8d3f2',
    complaint: 'PS-2041'
  },
  {
    name: 'recording.wav',
    time: '2026-03-28 09:12',
    hash: 'a7c2d1a8b1e6f4a97c5d',
    complaint: 'PS-2042'
  }
];

const EvidenceLocker = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {entries.map((entry) => (
        <div
          key={entry.hash}
          className="rounded-3xl border border-white/5 bg-card p-5 shadow-[0_10px_40px_rgba(124,58,237,0.25)]"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.5em] text-gray-500">{entry.complaint}</p>
            <button className="text-xs text-primary underline-offset-4 hover:underline">Copy hash</button>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-white">{entry.name}</h3>
          <p className="text-xs text-gray-400">Uploaded {entry.time}</p>
          <p className="mt-3 text-xs text-gray-300 break-all">SHA-256 {entry.hash}</p>
        </div>
      ))}
    </div>
  );
};

export default EvidenceLocker;
