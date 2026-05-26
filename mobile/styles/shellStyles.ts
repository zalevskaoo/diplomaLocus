import { StyleSheet } from 'react-native';

import {
  LOCUS_COLORS,
  LOCUS_RADIUS,
  LOCUS_SHADOW,
} from '@/constants/theme';

export const styles = StyleSheet.create({
  shell: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: LOCUS_COLORS.background,
  },

  content: {
    flex: 1,
    backgroundColor: LOCUS_COLORS.background,
  },

  sidebar: {
    width: 220,
    backgroundColor: LOCUS_COLORS.primary,
    paddingVertical: 26,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },

  logoBlock: {
    alignItems: 'center',
    marginBottom: 30,
  },

  logo: {
    color: LOCUS_COLORS.textLight,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
  },

  menu: {
    gap: 10,
    flex: 1,
  },

  menuItem: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: LOCUS_RADIUS.md,
  },

  menuItemActive: {
    backgroundColor: LOCUS_COLORS.muted,
    ...LOCUS_SHADOW,
  },

  menuText: {
    color: LOCUS_COLORS.textLight,
    fontSize: 15,
    fontWeight: '700',
  },

  menuTextActive: {
    color: LOCUS_COLORS.primary,
  },

  logoImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  logoSpacer: {
    height: 32,
  },
});