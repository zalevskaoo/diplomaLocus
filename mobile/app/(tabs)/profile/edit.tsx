import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { profileStyles as styles } from '@/styles/profileStyles';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useAuth } from '@/context/AuthContext';

import { API_URL } from '@/constants/api';

export default function EditProfileScreen() {
  const { token, user, loginUser } = useAuth();

  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name ?? '');
      setAvatarUrl(user.avatarUrl ?? '');
      setBio(user.bio ?? '');
    }
  }, [user]);

  async function pickAvatar() {
    if (!token) {
      Alert.alert('Помилка', 'Спочатку увійдіть в акаунт');
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Помилка', 'Потрібен доступ до галереї');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (result.canceled) return;

    const image = result.assets[0];

    const formData = new FormData();

    if (image.file) {
      formData.append('avatar', image.file);
    } else {
      formData.append('avatar', {
        uri: image.uri,
        name: 'avatar.jpg',
        type: 'image/jpeg',
      } as any);
    }

    try {
      const response = await fetch(`${API_URL}/users/me/avatar`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const updatedUser = await response.json();

      if (!response.ok) {
        Alert.alert(
          'Помилка',
          updatedUser.message ?? 'Не вдалося завантажити аватарку',
        );
        return;
      }

      loginUser(token, updatedUser);
      setAvatarUrl(updatedUser.avatarUrl ?? '');
      Alert.alert('Успіх', 'Аватарку оновлено');
    } catch (error) {
      console.log('Avatar upload error:', error);
      Alert.alert('Помилка', 'Не вдалося завантажити аватарку');
    }
  }

  async function saveProfile() {
    if (!token) {
      Alert.alert('Помилка', 'Спочатку увійдіть в акаунт');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          bio,
        }),
      });

      const updatedUser = await response.json();

      if (!response.ok) {
        Alert.alert(
          'Помилка',
          updatedUser.message ?? 'Не вдалося оновити профіль',
        );
        return;
      }

      loginUser(token, updatedUser);
      Alert.alert('Успіх', 'Профіль оновлено');
      router.push('/(tabs)/profile' as any);
    } catch {
      Alert.alert('Помилка', 'Не вдалося зберегти профіль');
    }
  }

  if (!user) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Потрібна авторизація</Text>

        <Text style={styles.description}>
          Увійдіть в акаунт, щоб редагувати профіль.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => router.push('/(tabs)/profile' as any)}
        >
          <Text style={styles.buttonText}>Перейти до входу</Text>
        </Pressable>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Редагування профілю</Text>

      <View style={styles.avatarWrapper}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.emptyAvatar}>
            <Image
            source={require('@/assets/images/locus_av.jpg')}
            style={styles.avatar}
            />
          </View>
        )}

        <Pressable style={styles.secondaryButton} onPress={pickAvatar}>
          <Text style={styles.secondaryButtonText}>Завантажити аватарку</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Ім’я</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ваше ім’я"
      />

      <Text style={styles.label}>Bio</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        value={bio}
        onChangeText={setBio}
        placeholder="Коротко про себе"
        multiline
      />

      <Pressable style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Зберегти зміни</Text>
      </Pressable>

      <Pressable
        style={styles.backButton}
        onPress={() => router.push('/(tabs)/profile' as any)}
      >
        <Text style={styles.backButtonText}>Назад до профілю</Text>
      </Pressable>
    </ScrollView>
  );
}

