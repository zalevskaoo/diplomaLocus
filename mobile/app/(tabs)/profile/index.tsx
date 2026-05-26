import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { profileStyles as styles } from '@/styles/profileStyles';
import { login, register } from '@/services/api';

export default function ProfileScreen() {
  const { user, loginUser, logoutUser } = useAuth();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  async function handleLogin() {
    setAuthError('');
    setAuthSuccess('');

    const data = await login(authEmail.trim(), authPassword);

    if (!data.ok) {
      setAuthError(data.message ?? 'Не вдалося увійти');
      return;
    }

    loginUser(data.accessToken, data.user);
  }

  async function handleRegister() {
    setAuthError('');
    setAuthSuccess('');

    const data = await register(
      authName.trim(),
      authEmail.trim(),
      authPassword,
    );

    if (!data.ok) {
      setAuthError(data.message ?? 'Не вдалося створити акаунт');
      return;
    }

    setAuthSuccess('Акаунт створено. Перевірте пошту для підтвердження email.');
    setIsRegisterMode(false);
    setAuthPassword('');
  }

  if (!user) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          {isRegisterMode ? 'Реєстрація' : 'Авторизація'}
        </Text>

        {isRegisterMode ? (
          <TextInput
            style={styles.input}
            placeholder="Ім’я"
            value={authName}
            onChangeText={setAuthName}
          />
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={authEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setAuthEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Пароль"
          value={authPassword}
          secureTextEntry
          onChangeText={setAuthPassword}
        />

        {authError ? <Text style={styles.errorText}>{authError}</Text> : null}
        {authSuccess ? <Text style={styles.successText}>{authSuccess}</Text> : null}

        <Pressable
          style={styles.button}
          onPress={isRegisterMode ? handleRegister : handleLogin}
        >
          <Text style={styles.buttonText}>
            {isRegisterMode ? 'Створити акаунт' : 'Увійти'}
          </Text>
        </Pressable>

        {!isRegisterMode ? (
          <Pressable onPress={() => router.push('/forgot-password' as any)}>
            <Text style={styles.link}>Забули пароль?</Text>
          </Pressable>
        ) : null}

        <Pressable
          onPress={() => {
            setAuthError('');
            setAuthSuccess('');
            setIsRegisterMode((prev) => !prev);
          }}
        >
          <Text style={styles.link}>
            {isRegisterMode
              ? 'Вже є акаунт? Увійти'
              : 'Немає акаунта? Зареєструватися'}
          </Text>
        </Pressable>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Профіль</Text>

      <View style={styles.profileCard}>
        {user.avatarUrl ? (
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.emptyAvatar}>
            <Image
              source={require('@/assets/images/locus_av.jpg')}
              style={styles.defaultAvatarImage}
            />
          </View>
        )}

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.menu}>
        <Pressable
        style={styles.menuButton}
          onPress={() => router.push('/profile/edit' as any)}
        >
          <Text style={styles.menuButtonText}>Редагувати профіль</Text>
        </Pressable>

        <Pressable
          style={styles.menuButton}
          onPress={() => router.push('/profile/my-points' as any)}
        >
          <Text style={styles.menuButtonText}>Мої точки</Text>
        </Pressable>

        <Pressable
          style={styles.menuButton}
          onPress={() => router.push('/profile/saved-points' as any)}
        >
          <Text style={styles.menuButtonText}>Збережені точки</Text>
        </Pressable>

        <Pressable
          style={styles.menuButton}
          onPress={() => router.push('/profile/saved-users' as any)}
        >
          <Text style={styles.menuButtonText}>Збережені користувачі</Text>
        </Pressable>

        {user.role === 'admin' ? (
          <Pressable
            style={styles.menuButton}
            onPress={() => router.push('/admin' as any)}
          >
            <Text style={styles.menuButtonText}>Адмін-панель</Text>
          </Pressable>
        ) : null}
      </View>

      <Pressable style={styles.logoutButton} onPress={logoutUser}>
        <Text style={styles.logoutButtonText}>Вийти</Text>
      </Pressable>
    </ScrollView>
  );
}