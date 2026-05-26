import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { getCategoryEmoji } from '@/constants/categories';
import { useAuth } from '@/context/AuthContext';
import { profileStyles as styles } from '@/styles/profileStyles';
import { getPoints, getSavedPointIds } from '../../../services/api';

type Point = {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  address: string;
  description?: string;
};

export default function SavedPointsScreen() {
  const { token } = useAuth();

  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadSavedPoints() {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const [allPoints, savedIds] = await Promise.all([
        getPoints(),
        getSavedPointIds(token),
      ]);

      const savedPoints = allPoints.filter((point: Point) => {
        const id = point._id ?? point.id ?? '';
        return savedIds.includes(id);
      });

      setPoints(savedPoints);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSavedPoints();
  }, [token]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#105666" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Збережені точки</Text>

      {points.length === 0 ? (
        <View style={styles.profileCard}>
          <Text style={styles.description}>
            У вас поки немає збережених точок
          </Text>
        </View>
      ) : (
        points.map((point) => (
          <View key={point._id ?? point.id} style={styles.profileCard}>
            <Text style={styles.name}>
              {getCategoryEmoji(point.category)} {point.title}
            </Text>

            <Text style={styles.email}>{point.address}</Text>

            {point.description ? (
              <Text style={styles.description}>{point.description}</Text>
            ) : null}
          </View>
        ))
      )}
    </ScrollView>
  );
}