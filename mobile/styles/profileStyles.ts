import { StyleSheet } from 'react-native';

import {
  LOCUS_COLORS,
  LOCUS_RADIUS,
  LOCUS_SHADOW,
} from '@/constants/theme';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LOCUS_COLORS.background,
    padding: 22,
  },
  title: {
    fontSize: 31,
    fontWeight: '900',
    color: LOCUS_COLORS.primary,
    marginBottom: 22,
  },
  description: {
    color: LOCUS_COLORS.gray,
    fontSize: 15,
    marginBottom: 16,
    lineHeight: 21,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 22,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 999,
    marginBottom: 14,
    backgroundColor: LOCUS_COLORS.surface,
  },
  emptyAvatar: {
    width: 165,
    height: 165,
    borderRadius: 999,
    backgroundColor: LOCUS_COLORS.muted,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  emptyAvatarText: {
    fontSize: 40,
  },
  secondaryButton: {
    alignSelf: 'flex-start',
    backgroundColor: LOCUS_COLORS.muted,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: LOCUS_RADIUS.md,
    marginTop: 10,
  },
  secondaryButtonText: {
    color: LOCUS_COLORS.primary,
    fontWeight: '800',
  },
  label: {
    fontSize: 15,
    fontWeight: '800',
    color: LOCUS_COLORS.primary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: LOCUS_COLORS.surface,
    borderRadius: LOCUS_RADIUS.md,
    padding: 14,
    fontSize: 15,
    color: LOCUS_COLORS.text,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: LOCUS_COLORS.border,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: LOCUS_COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: LOCUS_RADIUS.md,
    marginTop: 10,
    ...LOCUS_SHADOW,
  },
  buttonText: {
    color: LOCUS_COLORS.textLight,
    fontWeight: '800',
    fontSize: 15,
    
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 14,
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: LOCUS_RADIUS.md,
    borderWidth: 1,
    borderColor: LOCUS_COLORS.border,
  },
  backButtonText: {
    color: LOCUS_COLORS.primary,
    fontWeight: '800',
  },
  profileCard: {
    backgroundColor: LOCUS_COLORS.surface,
    borderRadius: LOCUS_RADIUS.lg,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: LOCUS_COLORS.border,
    ...LOCUS_SHADOW,
  },
  name: {
    fontSize: 22,
    fontWeight: '900',
    color: LOCUS_COLORS.primary,
    marginBottom: 6,
  },
  email: {
    fontSize: 15,
    color: LOCUS_COLORS.brown,
  },
  menu: {
    gap: 10,
  },
  menuButton: {
    alignSelf: 'flex-start',
    backgroundColor: LOCUS_COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: LOCUS_RADIUS.md,
  },
  menuButtonText: {
    color: LOCUS_COLORS.textLight,
    fontSize: 15,
    fontWeight: '800',
  },
  logoutButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: LOCUS_RADIUS.md,
    borderWidth: 1,
    borderColor: LOCUS_COLORS.rose,
  },
  logoutButtonText: {
    color: LOCUS_COLORS.rose,
    fontWeight: '800',
  },
  link: {
    marginTop: 18,
    textAlign: 'center',
    color: LOCUS_COLORS.brown,
    fontWeight: '800',
  },
  errorText: {
    color: LOCUS_COLORS.rose,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 12,
  },
  successText: {
    color: LOCUS_COLORS.primary,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 12,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LOCUS_COLORS.background,
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
  authorLink: {
    color: LOCUS_COLORS.brown,
    fontWeight: '800',
    fontSize: 16,
  },
  reviewCard: {
    backgroundColor: LOCUS_COLORS.background,
    borderRadius: LOCUS_RADIUS.md,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: LOCUS_COLORS.border,
  },
  photoRow: {
  gap: 10,
  paddingVertical: 4,
},

horizontalImage: {
  width: 180,
  height: 180,
  borderRadius: 18,
  resizeMode: 'cover',
  backgroundColor: LOCUS_COLORS.surface,
},

reviewImage: {
  width: 140,
  height: 140,
  borderRadius: 16,
  resizeMode: 'cover',
  backgroundColor: LOCUS_COLORS.surface,
},

reviewAuthorRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  marginBottom: 10,
},

reviewAvatar: {
  width: 34,
  height: 34,
  borderRadius: 999,
  backgroundColor: LOCUS_COLORS.surface,
},

reviewEmptyAvatar: {
  width: 34,
  height: 34,
  borderRadius: 999,
  backgroundColor: LOCUS_COLORS.muted,
  justifyContent: 'center',
  alignItems: 'center',
},

reviewEmptyAvatarText: {
  fontSize: 18,
},

statusBadge: {
  alignSelf: 'flex-start',
  backgroundColor: LOCUS_COLORS.muted,
  color: LOCUS_COLORS.primary,
  fontSize: 12,
  fontWeight: '800',
  paddingVertical: 6,
  paddingHorizontal: 10,
  borderRadius: 999,
  marginBottom: 14,
},
imageCard: {
  gap: 8,
},

removeImageButton: {
  backgroundColor: LOCUS_COLORS.rose,
  paddingVertical: 8,
  borderRadius: 12,
  alignItems: 'center',
},

removeImageButtonText: {
  color: LOCUS_COLORS.textLight,
  fontWeight: '800',
  fontSize: 12,
},
defaultAvatarImage: {
  width: 130,
  height: 130,
  resizeMode: 'contain',
},
defaultReviewAvatarImage: {
  width: 24,
  height: 24,
  resizeMode: 'contain',
},

errorPage: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 24,
  backgroundColor: LOCUS_COLORS.background,
},

errorLogo: {
  width: 190,
  height: 190,
  resizeMode: 'contain',
  marginBottom: 20,
},

errorTitle: {
  fontSize: 26,
  fontWeight: '900',
  color: LOCUS_COLORS.primary,
  textAlign: 'center',
  marginBottom: 10,
},

errorSubtitle: {
  fontSize: 16,
  color: LOCUS_COLORS.brown,
  textAlign: 'center',
  marginBottom: 22,
},
});