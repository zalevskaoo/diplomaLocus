import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';

import { profileStyles as styles } from '@/styles/profileStyles';

const API_URL = 'http://localhost:3000';

export default function ResetPasswordScreen() {
  const { token } = useLocalSearchParams<{ token: string }>();

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleResetPassword() {
    if (!token) {
      Alert.alert('Помилка', 'Недійсний токен');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Помилка',
        'Пароль має містити мінімум 6 символів',
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/auth/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          'Помилка',
          data.message ?? 'Не вдалося змінити пароль',
        );
        return;
      }

      Alert.alert(
        'Успіх',
        'Пароль успішно змінено',
        [
          {
            text: 'Увійти',
            onPress: () => router.push('/profile' as any),
          },
        ],
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Помилка',
        'Не вдалося підключитися до сервера',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Відновлення пароля</Text>

      <Text style={styles.description}>
        Введіть новий пароль для акаунта.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Новий пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable
        style={styles.button}
        onPress={handleResetPassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading
            ? 'Збереження...'
            : 'Змінити пароль'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}