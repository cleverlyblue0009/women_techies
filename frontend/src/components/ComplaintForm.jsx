import { useState } from 'react';

const categories = ['Harassment', 'Theft', 'Assault', 'Cybercrime', 'Other'];

const ComplaintForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: categories[0],
    anonymous: false,
    location: 'Auto-detected'
  });

  const handleChange = (field) => (event) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === 'anonymous' ? event.target.checked : event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(form);
    setForm({
      title: '',
      description: '',
      category: categories[0],
      anonymous: false,
      location: 'Auto-detected'
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card p-6 rounded-2xl shadow-[0_0_25px_rgba(124,58,237,0.35)] space-y-5 border border-white/5"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">File a Complaint</h2>
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Confidential</p>
        </div>
        <span className="text-sm text-gray-400">Auto geolocation enabled</span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <input
          type="text"
          placeholder="Title"
          className="rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          value={form.title}
          onChange={handleChange('title')}
        />
        <input
          type="text"
          placeholder="Location"
          className="rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          value={form.location}
          onChange={handleChange('location')}
        />
      </div>
      <textarea
        rows="4"
        placeholder="Describe what happened..."
        className="w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
        value={form.description}
        onChange={handleChange('description')}
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          value={form.category}
          onChange={handleChange('category')}
          className="flex-1 rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white"
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" checked={form.anonymous} onChange={handleChange('anonymous')} />
          File anonymously
        </label>
      </div>
      <button
        type="submit"
        className="w-full rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#9F7AFE] px-4 py-3 text-sm font-semibold uppercase tracking-widest shadow-[0_0_30px_rgba(124,58,237,0.45)] transition hover:brightness-110"
      >
        Submit Complaint
      </button>
    </form>
  );
};

export default ComplaintForm;
