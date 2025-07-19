export const textVariants = {
  defaults: {
    fontFamily: 'System',
    color: 'text',
    fontSize: 16,
    lineHeight: 24,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  h1: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700' as const,
    lineHeight: 28,
  },
  h3: {
    fontSize: 18,
    fontWeight: '700' as const,
    lineHeight: 24,
  },
  body1: {
    fontSize: 16,
    lineHeight: 24,
  },
  body1Bold: {
    fontSize: 16,
    fontWeight: '700' as const,
    lineHeight: 24,
  },
  body1Medium: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    lineHeight: 20,
  },
  body2Bold: {
    fontSize: 14,
    fontWeight: '700' as const,
    lineHeight: 20,
  },
  body2Medium: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  caption1: {
    fontSize: 12,
    lineHeight: 16,
  },
  caption1Bold: {
    fontSize: 12,
    fontWeight: '700' as const,
    lineHeight: 16,
  },
  caption1Medium: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
}
