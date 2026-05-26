import { router } from 'expo-router';
import { Image, Linking, Pressable, Text, View } from 'react-native';

import { styles } from '@/styles/homeStyles';

const FEEDBACK_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdU4IfAVcDsZ-re8R-0CI6XwGJOjYDRKwgfT1l1UlGyl5kn0Q/viewform?usp=publish-editor';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/locus-logo.png')}
        style={styles.logo}
      />

      <Text style={styles.badge}>міська інфраструктура поруч</Text>

      <Text style={styles.appTitle}>LOCUS</Text>

      <Text style={styles.title}>
        Інтерактивна платформа доступності та міських сервісів Києва
      </Text>

      <Text style={styles.subtitle}>
        LOCUS допомагає швидко знаходити важливі міські об’єкти: укриття,
        пункти незламності, місця сортування, переробки, гуманітарної допомоги,
        доступні локації та велосипедну інфраструктуру.
      </Text>

      <Text style={styles.subtitle}>
        Користувачі можуть додавати нові точки, фото, відгуки та переглядати
        інформацію на мапі після модерації.
      </Text>

      <Pressable style={styles.button} onPress={() => router.push('/map' as any)}>
        <Text style={styles.buttonText}>Перейти на мапу</Text>
      </Pressable>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Допоможіть покращити LOCUS</Text>

        <Text style={styles.categoryText}>
          Залиште короткий відгук про застосунок — це допоможе покращити
          функціонал і зручність користування.
        </Text>

        <Pressable
          style={styles.feedbackButton}
          onPress={() => Linking.openURL(FEEDBACK_URL)}
        >
          <Text style={styles.feedbackButtonText}>Залишити відгук</Text>
        </Pressable>
      </View>
    </View>
  );
}