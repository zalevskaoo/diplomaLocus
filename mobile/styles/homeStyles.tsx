import { StyleSheet } from 'react-native';

import {
  LOCUS_COLORS,
  LOCUS_RADIUS,
  LOCUS_SHADOW,
} from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    justifyContent: 'center',
    backgroundColor: LOCUS_COLORS.background,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: LOCUS_COLORS.surface,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    fontSize: 13,
    fontWeight: '800',
    color: LOCUS_COLORS.brown,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: LOCUS_COLORS.border,
  },


  title: {
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 14,
    color: LOCUS_COLORS.primary,
    lineHeight: 36,
  },

  subtitle: {
    fontSize: 16,
    color: LOCUS_COLORS.gray,
    lineHeight: 24,
    marginBottom: 14,
    maxWidth: 760,
  },

  button: {
    alignSelf: 'flex-start',
    backgroundColor: LOCUS_COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: LOCUS_RADIUS.md,
    marginTop: 6,
    marginBottom: 24,
    ...LOCUS_SHADOW,
  },

  buttonText: {
    color: LOCUS_COLORS.textLight,
    fontSize: 15,
    fontWeight: '800',
  },

  card: {
    backgroundColor: LOCUS_COLORS.surface,
    padding: 18,
    borderRadius: LOCUS_RADIUS.lg,
    gap: 10,
    borderWidth: 1,
    borderColor: LOCUS_COLORS.border,
    maxWidth: 680,
    ...LOCUS_SHADOW,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
    color: LOCUS_COLORS.primary,
  },

  categoryText: {
    fontSize: 15,
    color: LOCUS_COLORS.gray,
    lineHeight: 22,
  },

  feedbackButton: {
    alignSelf: 'flex-start',
    backgroundColor: LOCUS_COLORS.muted,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: LOCUS_RADIUS.md,
    marginTop: 4,
  },

  feedbackButtonText: {
    color: LOCUS_COLORS.primary,
    fontWeight: '800',
  },
  heroRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 18,
  marginBottom: 18,
},

logo: {
  width: 190,
  height: 190,
  resizeMode: 'contain',
},

appTitle: {
  fontSize: 56,
  fontWeight: '900',
  letterSpacing: 4,
  color: LOCUS_COLORS.brown,
},
});