import MapView, { Marker } from 'react-native-maps';

import { styles } from '@/styles/mapStyles';

export type Point = {
  title: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type AppMapProps = {
  points: Point[];
};

export default function AppMap({ points }: AppMapProps) {
  return (
    <MapView
      style={styles.nativeMap}
      initialRegion={{
        latitude: 50.4501,
        longitude: 30.5234,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      }}
    >
      {points.map((point) => (
        <Marker
          key={point.title}
          coordinate={{
            latitude: point.latitude,
            longitude: point.longitude,
          }}
          title={`${point.category} ${point.title}`}
          description={point.address}
        />
      ))}
    </MapView>
  );
}
