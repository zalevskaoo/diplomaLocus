import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { profileStyles as styles } from '@/styles/profileStyles';
import { getSavedUsers } from '@/services/api';

type SavedUser = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
};

export default function SavedUsersScreen() {
  const { token } = useAuth();

  const [users, setUsers] = useState<SavedUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSavedUsers() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getSavedUsers(token);
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadSavedUsers();
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
      <Text style={styles.title}>Збережені користувачі</Text>

      {users.length === 0 ? (
        <View style={styles.profileCard}>
          <Text style={styles.description}>
            У вас поки немає збережених користувачів
          </Text>
        </View>
      ) : (
        users.map((item) => {
          const userId = item._id ?? item.id ?? '';

          return (
            <Pressable
              key={userId}
              style={styles.profileCard}
              onPress={() => router.push(`/users/${userId}` as any)}
            >
              {item.avatarUrl ? (
                <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
              ) : (
                <View style={styles.emptyAvatar}>
                  <Image
                  source={require('@/assets/images/locus-avatar.png')}
                  style={styles.avatar}
                  />
                </View>
              )}

              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>

              {item.bio ? (
                <Text style={styles.description}>{item.bio}</Text>
              ) : null}
            </Pressable>
          );
        })
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