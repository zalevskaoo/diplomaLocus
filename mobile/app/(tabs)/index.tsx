import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../../styles/homeStyles';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>Kyiv Access</Text>

      <Text style={styles.title}>
        Платформа доступу до міської інфраструктури Києва
      </Text>

      <Text style={styles.subtitle}>
        Переглядайте соціально важливі об’єкти міста, фільтруйте їх за категоріями
        та додавайте нову інформацію.
      </Text>

      <Pressable style={styles.button} onPress={() => router.push('/map')}>
        <Text style={styles.buttonText}>Перейти до мапи</Text>
      </Pressable>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Категорії</Text>
        <Text style={styles.categoryText}>♿ Доступні місця</Text>
        <Text style={styles.categoryText}>🚲 Велодоріжки</Text>
        <Text style={styles.categoryText}>🤝 Гуманітарна допомога</Text>
        <Text style={styles.categoryText}>♻️ Переробка та сортування</Text>
      </View>
    </View>
  );
}