import { StyleSheet } from 'react-native';

import {
  LOCUS_COLORS,
  LOCUS_RADIUS,
  LOCUS_SHADOW,
} from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: LOCUS_COLORS.background,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 20,
    color: LOCUS_COLORS.primary,
  },
  input: {
    backgroundColor: LOCUS_COLORS.surface,
    padding: 14,
    borderRadius: LOCUS_RADIUS.md,
    marginBottom: 12,
    fontSize: 15,
    color: LOCUS_COLORS.text,
    borderWidth: 1,
    borderColor: LOCUS_COLORS.border,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: LOCUS_COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: LOCUS_RADIUS.md,
    marginTop: 8,
    ...LOCUS_SHADOW,
  },
  buttonText: {
    color: LOCUS_COLORS.textLight,
    fontWeight: '800',
    fontSize: 15,
  },
  text: {
    fontSize: 15,
    color: LOCUS_COLORS.gray,
    marginBottom: 8,
  },
  userName: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
    color: LOCUS_COLORS.primary,
  },
  linkText: {
    marginTop: 16,
    textAlign: 'center',
    color: LOCUS_COLORS.brown,
    fontSize: 15,
    fontWeight: '800',
  },
});