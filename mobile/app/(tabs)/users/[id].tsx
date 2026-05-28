import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { getCategoryEmoji } from '@/constants/categories';
import { useAuth } from '@/context/AuthContext';
import { profileStyles as styles } from '@/styles/profileStyles';
import { getPoints, toggleSavedUser } from '@/services/api';
import { API_URL } from '@/constants/api';

type PublicUser = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
};

type Point = {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  address: string;
  createdBy?: string;
};

export default function PublicUserProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { token, user: currentUser } = useAuth();

  const [isSaved, setIsSaved] = useState(false);
  const [profileUser, setProfileUser] = useState<PublicUser | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const userResponse = await fetch(`${API_URL}/users/${id}`);
        const userData = await userResponse.json();

        const allPoints = await getPoints();

        const userPoints = allPoints.filter((point: Point) => {
          return point.createdBy === id;
        });

        setProfileUser(userData);
        setPoints(userPoints);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadUserProfile();
  }, [id]);

  async function handleToggleSavedUser() {
    if (!token || !id) return;

    try {
      const data = await toggleSavedUser(token, id);
      setIsSaved(data.saved);
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#105666" />
      </View>
    );
  }

  if (!profileUser) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Користувача не знайдено</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileCard}>
        {profileUser.avatarUrl ? (
          <Image source={{ uri: profileUser.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.emptyAvatar}>
            <Image
            source={require('@/assets/images/locus_av.jpg')}
            style={styles.avatar}
            />
          </View>
        )}

        <Text style={styles.name}>{profileUser.name}</Text>
        <Text style={styles.email}>{profileUser.email}</Text>

        {profileUser.bio ? (
          <Text style={styles.description}>{profileUser.bio}</Text>
        ) : null}

        {token && currentUser?.id !== id ? (
          <Pressable
            style={styles.secondaryButton}
            onPress={handleToggleSavedUser}
          >
            <Text style={styles.secondaryButtonText}>
              {isSaved ? '★ Профіль збережено' : '☆ Зберегти профіль'}
            </Text>
          </Pressable>
        ) : null}
      </View>

      <Text style={styles.title}>Додані точки</Text>

      {points.length === 0 ? (
        <View style={styles.profileCard}>
          <Text style={styles.description}>
            Користувач ще не додав жодної точки
          </Text>
        </View>
      ) : (
        points.map((point) => {
          const pointId = point._id ?? point.id ?? '';

          return (
            <Pressable
              key={pointId}
              style={styles.profileCard}
              onPress={() => router.push(`/points/${pointId}` as any)}
            >
              <Text style={styles.name}>
                {getCategoryEmoji(point.category)} {point.title}
              </Text>

              <Text style={styles.email}>{point.address}</Text>
            </Pressable>
          );
        })
      )}

      <Pressable
        style={styles.backButton}
        onPress={() => router.push('/(tabs)/map' as any)}
      >
        <Text style={styles.backButtonText}>Назад до мапи</Text>
      </Pressable>
    </ScrollView>
  );
}