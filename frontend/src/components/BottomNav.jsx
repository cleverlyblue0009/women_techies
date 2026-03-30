const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'alert', label: 'Alert' },
  { id: 'report', label: 'Report' },
  { id: 'feed', label: 'Feed' },
  { id: 'profile', label: 'Profile' }
];

const BottomNav = ({ activeTab, setActiveTab }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[420px] border-t border-[#27272A] bg-[#12121A] px-4 py-2">
      <div className="flex items-center justify-between">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.3em] text-gray-400"
            onClick={() => setActiveTab(tab.id)}
          >
            <span
              className={`h-8 w-8 rounded-full border ${
                activeTab === tab.id ? 'border-[#7C3AED] text-[#7C3AED]' : 'border-transparent text-gray-500'
              } flex items-center justify-center text-xs font-semibold`}
            >
              {tab.label[0]}
            </span>
            <span className={`text-[11px] ${activeTab === tab.id ? 'text-[#7C3AED]' : 'text-gray-500'}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
