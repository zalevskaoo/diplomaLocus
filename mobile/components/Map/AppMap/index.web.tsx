import { useEffect, useRef } from 'react';
import { getCategoryColor, getCategoryLabel } from '@/constants/categories';

import type { AppMapProps } from './index.native';

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

export default function AppMap({ points, userLocation }: AppMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;

    let map: import('leaflet').Map | undefined;
    let cancelled = false;

    ensureLeafletCss();

    async function loadMap() {
      const L = await import('leaflet');

      if (cancelled || !container) return;

      const center: [number, number] = userLocation
        ? [userLocation.latitude, userLocation.longitude]
        : [50.4501, 30.5234];

      map = L.map(container as HTMLDivElement).setView(center, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      points.forEach((point) => {
        if (point.type === 'path' && point.path?.length) {
          const line = point.path.map((coord) => [
            coord.latitude,
            coord.longitude,
          ]) as [number, number][];

                    L.polyline(line, {
                      color: '#000000',
                      weight: 2,
                    })
            .addTo(map!)
            .bindPopup(
              `<b>${getCategoryLabel(point.category)}: ${point.title}</b>`
            );

          return;
        }

        if (
          point.latitude === undefined ||
          point.longitude === undefined
        ) {
          return;
        }

        L.circleMarker([point.latitude, point.longitude], {
          radius: 6,
          color: getCategoryColor(point.category),
          fillColor: getCategoryColor(point.category),
          fillOpacity: 0.9,
          weight: 2,
        })
        
        .addTo(map!)
        .bindPopup(`
  <div style="
    min-width: 180px;
    font-family: Arial, sans-serif;
    color: #233449;
  ">
    <div style="
      font-size: 13px;
      font-weight: 800;
      color: #855B52;
      margin-bottom: 4px;
    ">
      ${getCategoryLabel(point.category)}
    </div>

    <div style="
      font-size: 15px;
      font-weight: 900;
      margin-bottom: 6px;
    ">
      ${point.title}
    </div>

    <div style="
      font-size: 13px;
      color: #636563;
      margin-bottom: 10px;
    ">
      ${point.address ?? ''}
    </div>

    <a
      href="/points/${point._id ?? point.id}"
      style="
        display: inline-block;
        background: #233449;
        color: #E8E5DA;
        text-decoration: none;
        padding: 8px 12px;
        border-radius: 12px;
        font-size: 13px;
        font-weight: 800;
      "
    >
      Детальніше
    </a>
  </div>
`);
      });

      if (userLocation) {
        L.circleMarker([userLocation.latitude, userLocation.longitude], {
          radius: 10,
          color: '#105666',
          fillColor: '#105666',
          fillOpacity: 0.9,
        })
          .addTo(map)
          .bindPopup('<b>Ви тут</b>');
      }
    }

    loadMap();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [points, userLocation]);

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