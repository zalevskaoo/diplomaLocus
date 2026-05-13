import { useEffect, useRef } from 'react';

import type { AppMapProps } from './index';

const LEAFLET_CSS_HREF = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
const LEAFLET_CSS_ID = 'leaflet-css';

function ensureLeafletCss() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(LEAFLET_CSS_ID)) return;

  const link = document.createElement('link');
  link.id = LEAFLET_CSS_ID;
  link.rel = 'stylesheet';
  link.href = LEAFLET_CSS_HREF;
  document.head.appendChild(link);
}

export default function AppMap({ points }: AppMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = containerRef.current;
    if (!container) return;

    let map: import('leaflet').Map | undefined;
    let cancelled = false;

    ensureLeafletCss();

    (async () => {
      const L = await import('leaflet');
      if (cancelled || !container) return;

      map = L.map(container).setView([50.4501, 30.5234], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      points.forEach((point) => {
        L.marker([point.latitude, point.longitude])
          .addTo(map!)
          .bindPopup(
            `<b>${point.category} ${point.title}</b><br/>${point.address}`,
          );
      });
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [points]);

  return (
    <div
      ref={containerRef}
      style={{
        height: 320,
        width: '100%',
        borderRadius: 24,
        overflow: 'hidden',
      }}
    />
  );
}
