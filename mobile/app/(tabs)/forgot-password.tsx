import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';

import { profileStyles as styles } from '@/styles/profileStyles';
import { API_URL } from '@/constants/api';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleForgotPassword() {
    if (!email.trim()) {
      Alert.alert('Помилка', 'Введіть email');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          'Помилка',
          data.message ?? 'Не вдалося надіслати лист',
        );
        return;
      }

      Alert.alert(
        'Перевірте пошту',
        'Якщо акаунт з таким email існує, ми надіслали інструкцію для відновлення пароля.',
      );

      router.push('/(tabs)/profile' as any);
    } catch (error) {
      console.log(error);
      Alert.alert('Помилка', 'Не вдалося підключитися до сервера');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Відновлення пароля</Text>

      <Text style={styles.description}>
        Введіть email, який ви використовували для реєстрації.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Pressable
        style={styles.button}
        onPress={handleForgotPassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Надсилання...' : 'Надіслати лист'}
        </Text>
      </Pressable>

      <Pressable
        style={styles.backButton}
        onPress={() => router.push('/(tabs)/profile' as any)}
      >
        <Text style={styles.backButtonText}>Назад до входу</Text>
      </Pressable>
    </ScrollView>
  );
}