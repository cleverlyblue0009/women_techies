const KEY_PENDING = 'ps_pending_complaints';
const KEY_COMPLAINTS = 'ps_cached_complaints';
const KEY_SAFETY = 'ps_cached_safety';

const safeRead = (key) => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const safeWrite = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
};

export const getPendingComplaints = () => safeRead(KEY_PENDING) ?? [];

export const savePendingComplaint = (payload) => {
  const stored = getPendingComplaints();
  const next = [
    ...stored,
    {
      ...payload,
      storedAt: new Date().toISOString()
    }
  ];
  safeWrite(KEY_PENDING, next);
  return next;
};

export const clearPendingComplaints = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(KEY_PENDING);
};

export const cacheComplaints = (list) => {
  safeWrite(KEY_COMPLAINTS, list);
};

export const getCachedComplaints = () => safeRead(KEY_COMPLAINTS) ?? [];

export const cacheSafetyData = (payload) => {
  safeWrite(KEY_SAFETY, payload);
};

export const getCachedSafetyData = () => safeRead(KEY_SAFETY);
