import { Text, View } from 'react-native';

import { styles } from '@/styles/mapStyles';

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

export default function AppMap({ points }: AppMapProps) {
  return (
    <View style={styles.mapFallback}>
      <Text style={styles.mapFallbackTitle}>Мапа LOCUS</Text>

      <Text style={styles.mapFallbackText}>
        Для мобільної версії мапа відкривається у веб-демо.
      </Text>

      <Text style={styles.mapFallbackText}>
        Доступних об’єктів: {points.length}
      </Text>
    </View>
  );
}