import { Slot, router, usePathname } from 'expo-router';
import { Image, Pressable, Text, useWindowDimensions, View } from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { styles } from '@/styles/shellStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const { user } = useAuth();

  const isMobile = width < 768;

  const menuItems = [
    { title: 'Головна', shortTitle: 'Головна', path: '/' },
    { title: 'Мапа', shortTitle: 'Мапа', path: '/map' },
    ...(user
      ? [{ title: 'Додати точку', shortTitle: 'Додати', path: '/add-point' }]
      : []),
    { title: 'Профіль', shortTitle: 'Профіль', path: '/profile' },
  ];

  const isHome = pathname === '/';

  return (
  <SafeAreaView
  style={{ flex: 1, backgroundColor: '#E8E5DA' }}
  edges={['top']}
>
    <View style={styles.shell}>
      <View style={[styles.content, isMobile && styles.contentMobile]}>
        <Slot />
      </View>

      {!isMobile ? (
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
      ) : null}

      {isMobile ? (
        <View style={styles.bottomNav}>
          {menuItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Pressable
                key={item.path}
                style={[
                  styles.bottomNavItem,
                  isActive && styles.bottomNavItemActive,
                ]}
                onPress={() => router.push(item.path as any)}
              >
                <Text
                  style={[
                    styles.bottomNavText,
                    isActive && styles.bottomNavTextActive,
                  ]}
                >
                  {item.shortTitle}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}
          </View>
  </SafeAreaView>
  );
}