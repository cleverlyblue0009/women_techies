import { useCallback, useEffect, useMemo, useState } from 'react';
import ComplaintForm from './components/ComplaintForm';
import Dashboard from './components/Dashboard';
import EvidenceLocker from './components/EvidenceLocker';
import Navbar from './components/Navbar';
import MapPanel from './components/MapPanel';
import EmergencyButton from './components/EmergencyButton';
import Layout from './layouts/Layout';
import api from './utils/api';

const DEFAULT_CENTER = { lat: 28.7041, lng: 77.1025 };

function App() {
  const [complaints, setComplaints] = useState([]);
  const [safetyData, setSafetyData] = useState({ safety_score: 0, risk_level: 'low' });
  const [loadingComplaints, setLoadingComplaints] = useState(false);
  const [loadingSafety, setLoadingSafety] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userLocation, setUserLocation] = useState(DEFAULT_CENTER);

  const fetchComplaints = useCallback(async () => {
    try {
      setLoadingComplaints(true);
      setErrorMessage('');
      const response = await api.get('/complaints');
      setComplaints(response.data);
    } catch (error) {
      setErrorMessage('Unable to load complaints.');
    } finally {
      setLoadingComplaints(false);
    }
  }, []);

  const fetchSafetyScore = useCallback(async () => {
    try {
      setLoadingSafety(true);
      setErrorMessage('');
      const response = await api.post('/ai/safety-score', {
        latitude: 28.7041,
        longitude: 77.1025,
        time_of_day: new Date().getHours()
      });
      setSafetyData(response.data);
    } catch (error) {
      setErrorMessage('Unable to fetch safety score.');
    } finally {
      setLoadingSafety(false);
    }
  }, []);

  useEffect(() => {
    fetchComplaints();
    fetchSafetyScore();
  }, [fetchComplaints, fetchSafetyScore]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatusMessage('Geolocation not supported, showing default location.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      () => {
        setStatusMessage('Unable to fetch location, using default.');
      }
    );
  }, []);

  const handleSubmit = async (payload) => {
    try {
      setStatusMessage('Submitting complaint...');
      setErrorMessage('');
      await api.post('/complaints', {
        ...payload,
        latitude: userLocation.lat,
        longitude: userLocation.lng
      });
      setStatusMessage('Complaint submitted.');
      fetchComplaints();
      setTimeout(() => setStatusMessage(''), 4000);
    } catch (error) {
      setErrorMessage('Submission failed.');
    }
  };

  const mapStatus = useMemo(() => {
    if (errorMessage) {
      return { tone: 'error', content: errorMessage };
    }
    if (statusMessage) {
      return { tone: 'info', content: statusMessage };
    }
    return null;
  }, [errorMessage, statusMessage]);

  return (
    <Layout>
      <Navbar />
      <main className="space-y-12">
        <section id="home" className="space-y-6">
          <h1 className="text-3xl font-semibold text-white">Personal Safety Command</h1>
          <p className="text-gray-400 max-w-2xl">
            Track complaints, upload evidence, and monitor live safety scores across the city. Every card
            glows with the premium dark theme.
          </p>
          <MapPanel
            safetyData={safetyData}
            loading={loadingSafety}
            onRefresh={fetchSafetyScore}
            banner={mapStatus}
            markers={complaints}
            userLocation={userLocation}
          />
        </section>
        <section id="report">
          <h2 className="text-2xl font-semibold text-white mb-4">Report Complaint</h2>
          <ComplaintForm onSubmit={handleSubmit} />
        </section>
        <section id="dashboard">
          <h2 className="text-2xl font-semibold text-white mb-4">Dashboard</h2>
          <Dashboard complaints={complaints} loading={loadingComplaints} />
        </section>
        <section id="locker">
          <h2 className="text-2xl font-semibold text-white mb-4">Evidence Locker</h2>
          <EvidenceLocker />
        </section>
      </main>
      <EmergencyButton />
    </Layout>
  );
}

export default App;
