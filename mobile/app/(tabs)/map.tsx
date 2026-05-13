import { Pressable, ScrollView, Text, View } from 'react-native';

import { styles } from '@/styles/mapStyles';
import AppMap from '../../components/Map/AppMap';

const categories = [
  '♿ Доступність',
  '🚲 Велодоріжки',
  '🤝 Допомога',
  '♻️ Переробка',
  '🗑️ Сортування',
];

const points = [
  {
    title: 'Аптека з пандусом',
    category: '♿',
    address: 'вул. Хрещатик, 22',
    latitude: 50.4501,
    longitude: 30.5234,
  },
  {
    title: 'Велодоріжка',
    category: '🚲',
    address: 'парк Наталка',
    latitude: 50.4897,
    longitude: 30.5209,
  },
  {
    title: 'Пункт гуманітарної допомоги',
    category: '🤝',
    address: 'Поділ',
    latitude: 50.465,
    longitude: 30.515,
  },
  {
    title: 'Контейнер для пластику',
    category: '♻️',
    address: 'Оболонь',
    latitude: 50.509,
    longitude: 30.498,
  },
];

export default function MapScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Мапа Києва</Text>

      <Text style={styles.subtitle}>
        Соціально важливі об’єкти міської інфраструктури
      </Text>

      <View style={styles.filters}>
        {categories.map((item) => (
          <Pressable key={item} style={styles.filterButton}>
            <Text style={styles.filterText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.mapContainer}>
        <AppMap points={points} />
      </View>

      <Text style={styles.sectionTitle}>Тестові об’єкти</Text>

      {points.map((point) => (
        <View key={point.title} style={styles.card}>
          <Text style={styles.cardTitle}>
            {point.category} {point.title}
          </Text>
          <Text style={styles.cardText}>{point.address}</Text>
        </View>
      ))}
    </ScrollView>
  );
}