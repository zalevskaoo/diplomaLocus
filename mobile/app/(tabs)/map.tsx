import * as Location from 'expo-location';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View, Alert, TextInput } from 'react-native';
import { router } from 'expo-router';

import {
  POINT_FILTER_CATEGORIES,
  getCategoryEmoji,
} from '@/constants/categories';
import AppMap from '../../components/Map/AppMap';
import { getPoints } from '../../services/api';
import { styles } from '../../styles/mapStyles';
import {
  getSavedPointIds,
  toggleSavedPoint,
} from '../../services/api';

import { useAuth } from '@/context/AuthContext';


type LocationPoint = {
  latitude: number;
  longitude: number;
};

type Point = {
  _id?: string;
  id?: string;

  type?: 'point' | 'path';

  title: string;
  category: string;

  address?: string;
  description?: string;

  latitude?: number;
  longitude?: number;

  path?: {
    latitude: number;
    longitude: number;
  }[];
};

type ApiPoint = Point & {
  lat?: number;
  lng?: number;
};

function normalizePoint(point: ApiPoint): Point {
  return {
    _id: point._id,
    id: point.id,

    type: point.type ?? 'point',

    title: point.title,
    category: point.category,

    address: point.address,
    description: point.description,

    latitude:
      point.latitude !== undefined
        ? Number(point.latitude ?? point.lat)
        : undefined,

    longitude:
      point.longitude !== undefined
        ? Number(point.longitude ?? point.lng)
        : undefined,

    path: point.path ?? [],
  };
}



export default function MapScreen() {
  const { token } = useAuth();
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userLocation, setUserLocation] = useState<LocationPoint | null>(null);
  const [savedPointIds, setSavedPointIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [activeSearch, setActiveSearch] = useState('');

  async function loadPoints() {
    try {
      setLoading(true);

      const data = await getPoints();

      const normalizedPoints = Array.isArray(data)
        ? data
            .map(normalizePoint)
            .filter((point) => {
              if (point.type === 'path') {
                return point.path && point.path.length > 0;
              }
              
              return (
                !Number.isNaN(point.latitude) &&
                !Number.isNaN(point.longitude)
              )
            })
            : [];

      setPoints(normalizedPoints);
    } catch (error) {
      console.log('Failed to load points:', error);
    } finally {
      setLoading(false);
    }
  }

  async function getUserLocation() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.log('Location error:', error);
    }
  }

  useEffect(() => {
    loadPoints();
    getUserLocation();
    loadSavedPoints();
  }, []);

  async function loadSavedPoints() {
    if (!token) return;

    try {
      const ids = await getSavedPointIds(token);
      setSavedPointIds(ids);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleToggleSaved(pointId: string) {
  if (!token) {
    Alert.alert(
      'Потрібна авторизація',
      'Увійдіть в акаунт',
    );
    return;
  }

  try {
      const data = await toggleSavedPoint(token, pointId);

      if (data.saved) {
        setSavedPointIds((prev) => [...prev, pointId]);
      } else {
        setSavedPointIds((prev) =>
          prev.filter((id) => id !== pointId),
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  const filteredPoints = useMemo(() => {
    let result = points;
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'saved') {
        result = result.filter((point) => {
          const id = point._id ?? point.id ?? '';
          return savedPointIds.includes(id);
        });
      } else {
        result = result.filter(
          (point) => point.category === selectedCategory,
        );
      }
    }

    if (activeSearch.trim()) {
      const query = activeSearch.toLowerCase();
      result = result.filter((point) => {
        return (
          point.title?.toLowerCase().includes(query) ||
          point.address?.toLowerCase().includes(query) ||
          point.description?.toLowerCase().includes(query)
        );
      });
    }

    return result;
  }, [
    points,
    selectedCategory,
    savedPointIds,
    activeSearch,
  ]);

  return (
  <ScrollView
    style={styles.container}
    showsVerticalScrollIndicator={false}
    persistentScrollbar={false}
  >
    <Text style={styles.title}>Мапа LOCUS</Text>

    <TextInput
      style={styles.searchInput}
      placeholder="Пошук по назві або адресі"
      value={search}
      onChangeText={setSearch}
      onSubmitEditing={() => setActiveSearch(search)}
      returnKeyType="search"
    />
      <Pressable
        style={styles.searchButton}
        onPress={() => setActiveSearch(search)}
      >
        <Text style={styles.searchButtonText}>Шукати</Text>
      </Pressable>

      <View style={styles.filters}>
        {POINT_FILTER_CATEGORIES.map((item) => (
          <Pressable
            key={item.value}
            style={[
              styles.filterButton,
              selectedCategory === item.value && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedCategory(item.value)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === item.value && styles.filterTextActive,
              ]}
            >
              {item.icon} {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.mapContainer}>
        <AppMap points={filteredPoints} userLocation={userLocation} />
      </View>

      <Text style={styles.sectionTitle}>Об’єкти на мапі</Text>

      {loading ? (
        <Text style={styles.cardText}>Завантаження об’єктів...</Text>
      ) : filteredPoints.length === 0 ? (
        <Text style={styles.cardText}>Об’єктів у цій категорії поки немає</Text>
      ) : (
        filteredPoints.slice(0, 40).map((point) => {
          const id = point._id ?? point.id ?? '';

          return (
           <View key={id ?? point.title} style={styles.card}>
            <Text style={styles.cardTitle}>
              {getCategoryEmoji(point.category)} {point.title}
            </Text>

            <Text style={styles.cardText}>{point.address}</Text>

              <View style={styles.cardActions}>
               <Pressable
                 style={styles.detailsButton}
                  onPress={() => router.push(`/points/${id}` as any)}
               >
              <Text style={styles.detailsButtonText}>Детальніше</Text>
           </Pressable>

          {token ? (
        <Pressable
        style={styles.saveButton}
        onPress={() => handleToggleSaved(id)}
      >
        <Text style={styles.saveButtonText}>
          {savedPointIds.includes(id)
            ? '★ Збережено'
            : '☆ Зберегти'}
        </Text>
      </Pressable>
    ) : null}
  </View>
</View>
          );
        })
      )}
    </ScrollView>
  );
}