import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/themed-view';
import { LOCUS_COLORS, LOCUS_RADIUS } from '@/constants/theme';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor?: {
    dark: string;
    light: string;
  };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1],
          ),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        style={[
          styles.header,
          headerAnimatedStyle,
        ]}
      >
        {headerImage}
      </Animated.View>

      <ThemedView style={styles.content}>
        {children}
      </ThemedView>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LOCUS_COLORS.background,
  },

  scrollContent: {
    backgroundColor: LOCUS_COLORS.background,
  },

  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
    backgroundColor: LOCUS_COLORS.primary,
    borderBottomLeftRadius: LOCUS_RADIUS.xl,
    borderBottomRightRadius: LOCUS_RADIUS.xl,
  },

  content: {
    flex: 1,
    padding: 24,
    gap: 16,
    overflow: 'hidden',
    backgroundColor: LOCUS_COLORS.background,
  },
});