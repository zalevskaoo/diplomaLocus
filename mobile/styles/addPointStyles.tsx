import { StyleSheet } from 'react-native';

import {
  LOCUS_COLORS,
  LOCUS_RADIUS,
  LOCUS_SHADOW,
} from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: LOCUS_COLORS.background,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 20,
    color: LOCUS_COLORS.primary,
  },
  label: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
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
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  categoryButton: {
    backgroundColor: LOCUS_COLORS.surface,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: LOCUS_COLORS.border,
  },
  categoryButtonActive: {
    backgroundColor: LOCUS_COLORS.primary,
    borderColor: LOCUS_COLORS.primary,
  },
  categoryText: {
    color: LOCUS_COLORS.text,
    fontWeight: '700',
    fontSize: 13,
  },
  categoryTextActive: {
    color: LOCUS_COLORS.textLight,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: LOCUS_COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: LOCUS_RADIUS.md,
    marginTop: 8,
    marginBottom: 30,
    ...LOCUS_SHADOW,
  },
  buttonText: {
    color: LOCUS_COLORS.textLight,
    fontWeight: '800',
    fontSize: 15,
  },
  secondaryButton: {
    alignSelf: 'flex-start',
    backgroundColor: LOCUS_COLORS.muted,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: LOCUS_RADIUS.md,
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: LOCUS_COLORS.primary,
    fontWeight: '800',
  },
  coordinatesCard: {
    backgroundColor: LOCUS_COLORS.surface,
    padding: 14,
    borderRadius: LOCUS_RADIUS.md,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: LOCUS_COLORS.border,
  },
  coordinatesText: {
    color: LOCUS_COLORS.gray,
    fontSize: 14,
    marginBottom: 4,
  },
  addressDropdown: {
    backgroundColor: LOCUS_COLORS.surface,
    borderRadius: LOCUS_RADIUS.md,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: LOCUS_COLORS.border,
  },
  addressItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: LOCUS_COLORS.border,
  },
  addressItemText: {
    color: LOCUS_COLORS.text,
    fontSize: 14,
  },
  previewImage: {
    width: '100%',
    height: 240,
    borderRadius: LOCUS_RADIUS.lg,
    marginBottom: 14,
    resizeMode: 'contain',
    backgroundColor: LOCUS_COLORS.surface,
  },
  pointImage: {
    width: '100%',
    height: 240,
    borderRadius: LOCUS_RADIUS.lg,
    marginBottom: 12,
    resizeMode: 'contain',
    backgroundColor: LOCUS_COLORS.surface,
  },
});