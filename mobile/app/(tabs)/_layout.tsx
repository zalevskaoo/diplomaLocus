import { Slot, router, usePathname } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { styles } from '@/styles/shellStyles';

export default function TabLayout() {
  const pathname = usePathname();
  const { user } = useAuth();

  const menuItems = [
    { title: 'Головна', path: '/' },
    { title: 'Мапа', path: '/map' },
    ...(user ? [{ title: 'Додати точку', path: '/add-point' }] : []),
    { title: 'Профіль', path: '/profile' },
  ];

  const isHome = pathname === '/';

  return (
    <View style={styles.shell}>
      <View style={styles.content}>
        <Slot />
      </View>

      <View style={styles.sidebar}>
        {!isHome ? (
          <View style={styles.logoBlock}>
            <Image
              source={require('@/assets/images/locus-logo.png')}
              style={styles.logoImage}
            />

            <Text style={styles.logo}>LOCUS</Text>
          </View>
        ) : (
          <View style={styles.logoSpacer} />
        )}

        <View style={styles.menu}>
          {menuItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Pressable
                key={item.path}
                style={[styles.menuItem, isActive && styles.menuItemActive]}
                onPress={() => router.push(item.path as any)}
              >
                <Text
                  style={[
                    styles.menuText,
                    isActive && styles.menuTextActive,
                  ]}
                >
                  {item.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}