import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { getCategoryEmoji } from '@/constants/categories';
import { useAuth } from '@/context/AuthContext';
import { profileStyles as styles } from '@/styles/profileStyles';

const API_URL = 'http://localhost:3000';

type Point = {
  _id: string;
  title: string;
  category: string;
  address?: string;
  description?: string;
  status?: string;
};

export default function AdminScreen() {
  const { token, user } = useAuth();

  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPendingPoints() {
    if (!token || user?.role !== 'admin') {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/points/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setPoints(Array.isArray(data) ? data : []);
      } else {
        Alert.alert('Помилка', data.message ?? 'Не вдалося завантажити точки');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Помилка', 'Не вдалося підключитися до сервера');
    } finally {
      setLoading(false);
    }
  }

  async function changeStatus(pointId: string, status: 'approved' | 'rejected') {
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/points/${pointId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Помилка', data.message ?? 'Не вдалося змінити статус');
        return;
      }

      setPoints((prev) => prev.filter((point) => point._id !== pointId));

      Alert.alert(
        'Успіх',
        status === 'approved' ? 'Точку схвалено' : 'Точку відхилено',
      );
    } catch (error) {
      console.log(error);
      Alert.alert('Помилка', 'Не вдалося підключитися до сервера');
    }
  }

  useEffect(() => {
    loadPendingPoints();
  }, [token, user]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#105666" />
      </View>
    );
  }

  if (!token || user?.role !== 'admin') {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Адмін-панель</Text>

        <View style={styles.profileCard}>
          <Text style={styles.description}>
            Доступ тільки для адміністратора.
          </Text>
        </View>

        <Pressable
          style={styles.backButton}
          onPress={() => router.push('/profile' as any)}
        >
          <Text style={styles.backButtonText}>Назад</Text>
        </Pressable>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Модерація точок</Text>

      {points.length === 0 ? (
        <View style={styles.profileCard}>
          <Text style={styles.description}>
            Немає точок на модерації
          </Text>
        </View>
      ) : (
        points.map((point) => (
          <View key={point._id} style={styles.profileCard}>
            <Text style={styles.name}>
              {getCategoryEmoji(point.category)} {point.title}
            </Text>

            {point.address ? (
              <Text style={styles.email}>{point.address}</Text>
            ) : null}

            {point.description ? (
              <Text style={styles.description}>{point.description}</Text>
            ) : null}

            <View style={styles.menu}>
              <Pressable
                style={styles.secondaryButton}
                onPress={() => changeStatus(point._id, 'approved')}
              >
                <Text style={styles.secondaryButtonText}>Схвалити</Text>
              </Pressable>

              <Pressable
                style={styles.logoutButton}
                onPress={() => changeStatus(point._id, 'rejected')}
              >
                <Text style={styles.logoutButtonText}>Відхилити</Text>
              </Pressable>
            </View>
          </View>
        ))
      )}

      <Pressable
        style={styles.backButton}
        onPress={() => router.push('/profile' as any)}
      >
        <Text style={styles.backButtonText}>Назад до профілю</Text>
      </Pressable>
    </ScrollView>
  );
}