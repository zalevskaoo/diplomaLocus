import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  LOCUS_COLORS,
  LOCUS_RADIUS,
  LOCUS_SHADOW,
} from '@/constants/theme';

import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

import { API_URL } from '@/constants/api';

type Point = {
  _id: string;
  title: string;
  description?: string;
  category: string;
  address: string;
  status?: 'pending' | 'approved' | 'rejected';
};

function getStatusLabel(status?: string) {
  switch (status) {
    case 'approved':
      return 'Схвалено';
    case 'rejected':
      return 'Відхилено';
    case 'pending':
    default:
      return 'Проходить модерацію';
  }
}

function getCategoryEmoji(category: string) {
  switch (category) {
    case 'accessibility':
      return '♿';

    case 'bike_line':
      return '🚲';

    case 'aid':
      return '🤝';

    case 'recycling':
      return '♻️';

    case 'sorting':
      return '🗑️';

    default:
      return '📍';
  }
}

export default function MyPointsScreen() {
  const { token } = useAuth();

  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadMyPoints() {
    try {
      const response = await fetch(`${API_URL}/points/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setPoints(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deletePoint(pointId: string) {
    try {
        const response = await fetch(
          `${API_URL}/points/${pointId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
         },
        );

     if (!response.ok) {
       Alert.alert('Помилка', 'Не вдалося видалити точку');
          return;
     }

        setPoints((prev) =>
        prev.filter((point) => point._id !== pointId),
        );

        Alert.alert('Успіх', 'Точку видалено');
    } catch {
      Alert.alert('Помилка', 'Помилка сервера');
     }
    }

  

  useEffect(() => {
    loadMyPoints();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#105666" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Мої точки</Text>

      {points.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>
            Ви ще не додали жодної точки
          </Text>
        </View>
      ) : (
        points.map((point) => (
          <View key={point._id} style={styles.card}>
            <Text style={styles.cardTitle}>
              {getCategoryEmoji(point.category)} {point.title}
            </Text>

            <Text style={styles.statusBadge}>
              {getStatusLabel(point.status)}
            </Text>

            <Text style={styles.address}>{point.address}</Text>

            {point.description ? (
              <Text style={styles.description}>
                {point.description}
              </Text>
            ) : null}

            <View style={styles.actions}>
              <Pressable
                style={styles.editButton}
                onPress={() => router.push(`/profile/my-points/${point._id}` as any)}>
                <Text style={styles.editButtonText}>
                  Редагувати
                </Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={() => deletePoint(point._id)}>
                <Text style={styles.deleteButtonText}>
                  Видалити
                </Text>
              </Pressable>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LOCUS_COLORS.background,
    padding: 22,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LOCUS_COLORS.background,
  },

  title: {
    fontSize: 31,
    fontWeight: '900',
    color: LOCUS_COLORS.primary,
    marginBottom: 22,
  },

  emptyCard: {
    backgroundColor: LOCUS_COLORS.surface,
    padding: 22,
    borderRadius: LOCUS_RADIUS.lg,
    borderWidth: 1,
    borderColor: LOCUS_COLORS.border,
    ...LOCUS_SHADOW,
  },

  emptyText: {
    color: LOCUS_COLORS.gray,
    fontSize: 15,
    textAlign: 'center',
  },

  card: {
    backgroundColor: LOCUS_COLORS.surface,
    borderRadius: LOCUS_RADIUS.lg,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: LOCUS_COLORS.border,
    ...LOCUS_SHADOW,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: LOCUS_COLORS.primary,
    marginBottom: 8,
  },

  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: LOCUS_COLORS.muted,
    color: LOCUS_COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    marginBottom: 10,
  },

  address: {
    fontSize: 14,
    color: LOCUS_COLORS.brown,
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: LOCUS_COLORS.gray,
    lineHeight: 20,
  },

  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    flexWrap: 'wrap',
  },

  editButton: {
    alignSelf: 'flex-start',
    backgroundColor: LOCUS_COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: LOCUS_RADIUS.md,
  },

  editButtonText: {
    color: LOCUS_COLORS.textLight,
    fontWeight: '800',
    fontSize: 13,
  },

  deleteButton: {
    alignSelf: 'flex-start',
    backgroundColor: LOCUS_COLORS.rose,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: LOCUS_RADIUS.md,
  },

  deleteButtonText: {
    color: LOCUS_COLORS.textLight,
    fontWeight: '800',
    fontSize: 13,
  },
});