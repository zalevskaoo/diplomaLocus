import MapView, { Marker, Polyline } from 'react-native-maps';

import { styles } from '@/styles/mapStyles';
import { getCategoryColor, getCategoryLabel } from '@/constants/categories';

export type Point = {
  _id?: string;
  id?: string;
  type?: 'point' | 'path';
  title: string;
  category: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  path?: {
    latitude: number;
    longitude: number;
  }[];
};

export type LocationPoint = {
  latitude: number;
  longitude: number;
};

export type AppMapProps = {
  points: Point[];
  userLocation?: LocationPoint | null;
};

export default function AppMap({ points, userLocation }: AppMapProps) {
  return (
    <MapView
      style={styles.nativeMap}
      initialRegion={{
        latitude: userLocation?.latitude ?? 50.4501,
        longitude: userLocation?.longitude ?? 30.5234,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      }}
      showsUserLocation
    >
      {points.map((point) => {
        const key = point._id ?? point.id ?? point.title;

        if (point.type === 'path' && point.path?.length) {
          return (
            <Polyline
            key={key}
            coordinates={point.path}
            strokeWidth={4}
            strokeColor={getCategoryColor(point.category)}
            />
          );
        }

        if (
          point.latitude === undefined ||
          point.longitude === undefined
        ) {
          return null;
        }

        return (
         <Marker
          key={key}
          coordinate={{
            latitude: point.latitude,
            longitude: point.longitude,
          }}
          title={`${getCategoryLabel(point.category)}: ${point.title}`}
          description={point.address}
          pinColor={getCategoryColor(point.category)}
        />
        );
      })}

      {userLocation ? (
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          title="Ви тут"
          description="Поточна геолокація"
          pinColor="#105666"
        />
      ) : null}
    </MapView>
  );
}