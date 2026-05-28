import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { POINT_CATEGORIES } from '@/constants/categories';
import { useAuth } from '@/context/AuthContext';
import { profileStyles as styles } from '@/styles/profileStyles';
import { getPoints, uploadPointImage } from '../../../../services/api';
import { API_URL } from '@/constants/api';

type Point = {
  _id: string;
  title: string;
  category: string;
  address: string;
  description?: string;
  latitude: number;
  longitude: number;
  status?: 'pending' | 'approved' | 'rejected';
  imageUrls?: string[];
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

export default function EditPointScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { token } = useAuth();

  const [point, setPoint] = useState<Point | null>(null);

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('accessibility');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  async function loadPoint() {
    try {
      const data = await getPoints();
      const foundPoint = data.find((item: Point) => item._id === id);

      if (!foundPoint) {
        Alert.alert('Помилка', 'Точку не знайдено');
        router.push('/profile/my-points' as any);
        return;
      }

      setPoint(foundPoint);
      setTitle(foundPoint.title ?? '');
      setAddress(foundPoint.address ?? '');
      setDescription(foundPoint.description ?? '');
      setCategory(foundPoint.category ?? 'accessibility');
      setLatitude(String(foundPoint.latitude ?? ''));
      setLongitude(String(foundPoint.longitude ?? ''));
    } catch (error) {
      console.log(error);
      Alert.alert('Помилка', 'Не вдалося завантажити точку');
    }
  }

  useEffect(() => {
    loadPoint();
  }, [id]);

  async function savePoint() {
    if (!token) {
      Alert.alert('Помилка', 'Спочатку увійдіть в акаунт');
      return;
    }

    const response = await fetch(`${API_URL}/points/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        address,
        description,
        category,
        latitude: Number(latitude),
        longitude: Number(longitude),
      }),
    });

    if (!response.ok) {
      Alert.alert('Помилка', 'Не вдалося оновити точку');
      return;
    }

    Alert.alert('Успіх', 'Точку оновлено');
    router.push('/profile/my-points' as any);
  }

  async function pickAndUploadImage() {
    if (!token || !id) {
      Alert.alert('Помилка', 'Спочатку увійдіть в акаунт');
      return;
    }

    if ((point?.imageUrls?.length ?? 0) >= 5) {
      Alert.alert('Помилка', 'Можна додати максимум 5 фото');
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Помилка', 'Потрібен доступ до галереї');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 5 - (point?.imageUrls?.length ?? 0),
      quality: 0.8,
    });

    if (result.canceled) return;

    try {
      let updatedPoint = point;

      for (const image of result.assets) {
        const imageFile = image.file
          ? image.file
          : ({
              uri: image.uri,
              name: 'point-image.jpg',
              type: 'image/jpeg',
            } as any);

        updatedPoint = await uploadPointImage(token, id, imageFile);
      }

      setPoint(updatedPoint);
      Alert.alert('Успіх', 'Фото додано');
    } catch (error) {
      console.log(error);
      Alert.alert('Помилка', 'Не вдалося завантажити фото');
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Редагування точки</Text>

      {point?.status ? (
        <Text style={styles.statusBadge}>
          {getStatusLabel(point.status)}
        </Text>
      ) : null}

      <Text style={styles.label}>Назва</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Адреса</Text>
      <TextInput style={styles.input} value={address} onChangeText={setAddress} />

      <Text style={styles.label}>Опис</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Категорія</Text>

      <View style={styles.input}>
        <Picker selectedValue={category} onValueChange={setCategory}>
          {POINT_CATEGORIES.map((item) => (
            <Picker.Item
              key={item.value}
              label={`${item.icon} ${item.label}`}
              value={item.value}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Latitude</Text>
      <TextInput style={styles.input} value={latitude} onChangeText={setLatitude} />

      <Text style={styles.label}>Longitude</Text>
      <TextInput style={styles.input} value={longitude} onChangeText={setLongitude} />

      <View style={styles.profileCard}>
        <Text style={styles.label}>Фото точки</Text>

        {point?.imageUrls?.length ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photoRow}
          >
            {point.imageUrls.map((url) => (
  <View key={url} style={styles.imageCard}>
    <Image
      source={{ uri: url }}
      style={styles.horizontalImage}
    />

    <Pressable
      style={styles.removeImageButton}
      onPress={async () => {
        if (!token) return;

        try {
          const response = await fetch(
            `${API_URL}/points/${id}/images`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                imageUrl: url,
              }),
            },
          );

          if (!response.ok) {
            Alert.alert('Помилка', 'Не вдалося видалити фото');
            return;
          }

          const updatedPoint = await response.json();

          setPoint(updatedPoint);

          Alert.alert('Успіх', 'Фото видалено');
        } catch (error) {
          console.log(error);

          Alert.alert('Помилка', 'Не вдалося видалити фото');
        }
      }}
    >
      <Text style={styles.removeImageButtonText}>
        Видалити
      </Text>
    </Pressable>
  </View>
))}
          </ScrollView>
        ) : (
          <Text style={styles.description}>Фото поки не додано</Text>
        )}

        <Pressable style={styles.secondaryButton} onPress={pickAndUploadImage}>
          <Text style={styles.secondaryButtonText}>Додати фото</Text>
        </Pressable>
      </View>

      <Pressable style={styles.button} onPress={savePoint}>
        <Text style={styles.buttonText}>Зберегти зміни</Text>
      </Pressable>

      <Pressable
        style={styles.backButton}
        onPress={() => router.push('/profile/my-points' as any)}
      >
        <Text style={styles.backButtonText}>Назад</Text>
      </Pressable>
    </ScrollView>
  );
}