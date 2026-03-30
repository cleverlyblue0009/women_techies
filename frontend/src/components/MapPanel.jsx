import { useMemo, useState } from 'react';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';

const MAP_THRESHOLD = 45;
const mapDarkStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0B0B0F' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#9b9b9b' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0B0B0F' }] },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'road',
    stylers: [{ color: '#12121A' }, { visibility: 'simplified' }]
  },
  {
    featureType: 'water',
    stylers: [{ color: '#101018' }]
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }]
  }
];

const mapContainerStyle = {
  width: '100%',
  height: '360px'
};

const MapPanel = ({
  safetyData = { safety_score: 0, risk_level: 'low' },
  loading = false,
  onRefresh,
  banner,
  markers = [],
  userLocation
}) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: mapsKey || '',
    libraries: ['places']
  });

  const score = safetyData?.safety_score ?? 0;
  const riskLevel = safetyData?.risk_level?.toUpperCase() ?? 'LOW';

  const markerPayload = useMemo(
    () =>
      markers.map((entry) => ({
        id: entry.id,
        title: entry.title,
        position: {
          lat: entry.latitude ?? entry.lat ?? (28.7041 + Math.random() * 0.01),
          lng: entry.longitude ?? entry.lng ?? (77.1025 + Math.random() * 0.01)
        },
        status: entry.status ?? 'submitted',
        severity: entry.severity ?? 'medium'
      })),
    [markers]
  );

  const center = userLocation || markerPayload[0]?.position || { lat: 28.7041, lng: 77.1025 };

  const mapStatusBanner = banner?.content;

  const mapOptions = {
    styles: mapDarkStyle,
    disableDefaultUI: true,
    gestureHandling: 'greedy'
  };

  return (
    <div className="space-y-4">
      {mapStatusBanner && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            banner.tone === 'error' ? 'border-red-500/50 bg-red-500/10 text-red-200' : 'border-white/10 bg-white/5 text-gray-100'
          }`}
        >
          {mapStatusBanner}
        </div>
      )}
      {!mapStatusBanner && score < MAP_THRESHOLD && (
        <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          Predictive alert: safety score below {MAP_THRESHOLD}. Stay alert.
        </div>
      )}
      <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-[#15152a] to-[#0b0b0f] p-5 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
        <div className="grid gap-6 md:grid-cols-[1fr,300px]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/5 bg-black/40 p-4 shadow-inner">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">Live Safety Score</p>
                <button
                  onClick={onRefresh}
                  className="text-xs text-primary transition hover:text-white"
                  disabled={loading}
                >
                  {loading ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">{loading ? '—' : score}</span>
                <span className="text-sm uppercase tracking-[0.4em] text-gray-400">{riskLevel}</span>
              </div>
              <p className="text-xs text-gray-400">
                Based on live AI scoring, <span className="font-semibold text-white">{riskLevel}</span> zone.
              </p>
            </div>
            <div className="h-[360px] rounded-3xl border border-white/5 bg-card">
              {mapsKey ? (
                isLoaded && !loadError ? (
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={13}
                    options={mapOptions}
                  >
                    <Marker position={center} label="You" onClick={() => setActiveMarker(null)} />
                    {markerPayload.map((marker) => (
                      <Marker
                        key={marker.id}
                        position={marker.position}
                        label={{ text: marker.status.replace('_', ' '), color: '#ffffff' }}
                        onClick={() => setActiveMarker(marker)}
                      />
                    ))}
                    {activeMarker && (
                      <InfoWindow position={activeMarker.position} onCloseClick={() => setActiveMarker(null)}>
                        <div className="text-sm">
                          <p className="font-semibold text-white">{activeMarker.title}</p>
                          <p className="text-xs text-gray-300">Status: {activeMarker.status}</p>
                          <p className="text-xs text-gray-300">Severity: {activeMarker.severity}</p>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-gray-400">
                      {loadError ? 'Unable to load Google Maps.' : 'Loading map...'}
                    </p>
                  </div>
                )
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center text-sm text-gray-400">
                  <p>Provide a Google Maps API key via `VITE_GOOGLE_MAPS_KEY` to unlock the map.</p>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-4 rounded-3xl border border-white/5 bg-card p-5">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-gray-500">Nearby markers</p>
              <h3 className="text-xl font-semibold text-white">Risk zones</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-300">
              {markerPayload.slice(0, 3).map((marker) => (
                <li
                  key={marker.id}
                  className="flex justify-between rounded-2xl border border-white/5 bg-black/40 px-3 py-2"
                >
                  <span>{marker.title}</span>
                  <span className="text-xs text-red-300">{marker.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPanel;
