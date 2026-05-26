import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { POINT_CATEGORIES } from '@/constants/categories';
import { useAuth } from '@/context/AuthContext';
import { createPoint, searchAddresses, uploadPointImage } from '../../services/api';
import { styles } from '../../styles/addPointStyles';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';

type AddressResult = {
  label: string;
  latitude: number;
  longitude: number;
};

export default function AddPointScreen() {
  const { token } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('accessibility');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImages, setSelectedImages] = useState<any[]>([]);

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [addressResults, setAddressResults] = useState<AddressResult[]>([]);

  async function handleAddressSearch(value: string) {
    setAddress(value);
    setLatitude(null);
    setLongitude(null);

    if (value.trim().length < 3) {
      setAddressResults([]);
      return;
    }

    try {
      const results = await searchAddresses(value);
      setAddressResults(results);
    } catch (error) {
      console.log(error);
      setAddressResults([]);
    }
  }

  function selectAddress(item: AddressResult) {
    setAddress(item.label);
    setLatitude(item.latitude);
    setLongitude(item.longitude);
    setAddressResults([]);
  }

  async function pickImages() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Помилка', 'Потрібен доступ до галереї');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 5,
      quality: 0.8,
    });

    if (result.canceled) return;

    setSelectedImages(result.assets.slice(0, 5));
  }

  async function handleSave() {
    if (!token) {
      Alert.alert('Помилка', 'Спочатку увійдіть в акаунт');
      return;
    }

    if (!title.trim() || !address.trim() || !description.trim()) {
      Alert.alert('Помилка', 'Заповніть назву, адресу та опис');
      return;
    }

    if (latitude === null || longitude === null) {
      Alert.alert('Помилка', 'Оберіть адресу зі списку');
      return;
    }

    const point = {
      title: title.trim(),
      category,
      address: address.trim(),
      description: description.trim(),
      latitude,
      longitude,
    };

    try {
      const data = await createPoint(token, point);

      if (data._id) {
        for (const image of selectedImages) {
          const imageFile = image.file
          ? image.file
          : ({
            uri: image.uri,
            name: 'point-image.jpg',
            type: 'image/jpeg',
          } as any);
          await uploadPointImage(token, data._id, imageFile);
        }
        Alert.alert('Успіх', 'Точку додано');
        setTitle('');  
        setCategory('accessibility');
        setAddress('');
        setDescription('');
        setLatitude(null);
        setLongitude(null);
        setAddressResults([]);
        setSelectedImages([]);
      }
      
      else {
        Alert.alert('Помилка', 'Не вдалося додати точку');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Помилка', 'Не вдалося підключитися до сервера');
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Додати об’єкт</Text>

      <TextInput
        style={styles.input}
        placeholder="Назва місця"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Категорія</Text>

      <View style={styles.categoryContainer}>
        {POINT_CATEGORIES.map((item) => (
          <Pressable
            key={item.value}
            style={[
              styles.categoryButton,
              category === item.value && styles.categoryButtonActive,
            ]}
            onPress={() => setCategory(item.value)}
          >
            <Text
              style={[
                styles.categoryText,
                category === item.value && styles.categoryTextActive,
              ]}
            >
              {item.icon} {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Адреса"
        value={address}
        onChangeText={handleAddressSearch}
      />

      {addressResults.length > 0 ? (
        <View style={styles.addressDropdown}>
          {addressResults.map((item) => (
            <Pressable
              key={item.label}
              style={styles.addressItem}
              onPress={() => selectAddress(item)}
            >
              <Text style={styles.addressItemText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Опис"
        value={description}
        multiline
        onChangeText={setDescription}
      />

      <Pressable style={styles.secondaryButton} onPress={pickImages}>
        <Text style={styles.secondaryButtonText}>
          {selectedImages.length > 0
          ? `Обрано фото: ${selectedImages.length}`
          : 'Додати фото'}
        </Text>
      </Pressable>
      
      {selectedImages.map((image) => (
        <Image
        key={image.uri}
        source={{ uri: image.uri }}
        style={styles.previewImage}
        />
      ))}

      
      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Зберегти точку</Text>
      </Pressable>
    </ScrollView>
  );
}