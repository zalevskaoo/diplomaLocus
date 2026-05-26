import { StyleSheet } from 'react-native';

import {
  LOCUS_COLORS,
  LOCUS_RADIUS,
  LOCUS_SHADOW,
} from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: LOCUS_COLORS.background,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 6,
    color: LOCUS_COLORS.primary,
  },

  subtitle: {
    fontSize: 15,
    marginBottom: 16,
    color: LOCUS_COLORS.brown,
  },

  searchInput: {
    backgroundColor: LOCUS_COLORS.surface,
    borderRadius: LOCUS_RADIUS.md,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 10,
    fontSize: 15,
    color: LOCUS_COLORS.text,
    borderWidth: 1,
    borderColor: LOCUS_COLORS.border,
  },

  searchButton: {
    alignSelf: 'flex-start',
    backgroundColor: LOCUS_COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: LOCUS_RADIUS.md,
    marginBottom: 16,
  },

  searchButtonText: {
    color: LOCUS_COLORS.textLight,
    fontWeight: '800',
  },

  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },

  filterButton: {
    backgroundColor: LOCUS_COLORS.surface,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: LOCUS_COLORS.border,
  },

  filterButtonActive: {
    backgroundColor: LOCUS_COLORS.primary,
    borderColor: LOCUS_COLORS.primary,
  },

  filterText: {
    fontSize: 13,
    fontWeight: '700',
    color: LOCUS_COLORS.text,
  },

  filterTextActive: {
    color: LOCUS_COLORS.textLight,
  },

  mapContainer: {
    height: 320,
    borderRadius: LOCUS_RADIUS.lg,
    overflow: 'hidden',
    marginBottom: 22,
    ...LOCUS_SHADOW,
  },

  nativeMap: {
    width: '100%',
    height: '100%',
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 12,
    color: LOCUS_COLORS.primary,
  },

  card: {
    backgroundColor: LOCUS_COLORS.surface,
    padding: 15,
    borderRadius: LOCUS_RADIUS.lg,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: LOCUS_COLORS.border,
    ...LOCUS_SHADOW,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 5,
    color: LOCUS_COLORS.primary,
  },

  cardText: {
    fontSize: 14,
    color: LOCUS_COLORS.gray,
    lineHeight: 19,
  },

  cardActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    flexWrap: 'wrap',
  },

  detailsButton: {
    alignSelf: 'flex-start',
    backgroundColor: LOCUS_COLORS.primary,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: LOCUS_RADIUS.md,
  },

  detailsButtonText: {
    color: LOCUS_COLORS.textLight,
    fontWeight: '800',
    fontSize: 13,
  },

  saveButton: {
    alignSelf: 'flex-start',
    backgroundColor: LOCUS_COLORS.muted,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: LOCUS_RADIUS.md,
  },

  saveButtonText: {
    color: LOCUS_COLORS.primary,
    fontWeight: '800',
    fontSize: 13,
  },

  input: {
    backgroundColor: LOCUS_COLORS.surface,
    padding: 12,
    borderRadius: LOCUS_RADIUS.md,
    marginBottom: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: LOCUS_COLORS.border,
    color: LOCUS_COLORS.text,
  },

  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },

  smallButton: {
    alignSelf: 'flex-start',
    backgroundColor: LOCUS_COLORS.muted,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: LOCUS_RADIUS.md,
  },

  smallButtonText: {
    color: LOCUS_COLORS.primary,
    fontWeight: '800',
    fontSize: 13,
  },

  smallButtonSecondary: {
    alignSelf: 'flex-start',
    backgroundColor: LOCUS_COLORS.cream,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: LOCUS_RADIUS.md,
    borderWidth: 1,
    borderColor: LOCUS_COLORS.border,
  },

  smallButtonSecondaryText: {
    color: LOCUS_COLORS.gray,
    fontWeight: '800',
    fontSize: 13,
  },

  deleteButton: {
    alignSelf: 'flex-start',
    backgroundColor: LOCUS_COLORS.rose,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: LOCUS_RADIUS.md,
  },

  label: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
    color: LOCUS_COLORS.primary,
  },

  locationCard: {
    backgroundColor: LOCUS_COLORS.surface,
    padding: 15,
    borderRadius: LOCUS_RADIUS.lg,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: LOCUS_COLORS.border,
  },
  scrollContent: {
    paddingBottom: 32,
  },
});