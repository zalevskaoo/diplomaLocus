import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import { LOCUS_COLORS } from '@/constants/theme';
import { profileStyles as styles } from '@/styles/profileStyles';

export default function NotFoundScreen() {
  return (
    <View style={styles.errorPage}>
      <Image
        source={require('@/assets/images/locus-logo.png')}
        style={styles.errorLogo}
      />

      <Text style={styles.errorTitle}>Упсі, щось пішло не так</Text>

      <Text style={styles.errorSubtitle}>
        Вирішуємо проблему. Вибачте!!
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.replace('/' as any)}
      >
        <Text style={styles.buttonText}>На головну</Text>
      </Pressable>
    </View>
  );
}