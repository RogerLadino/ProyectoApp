// Theme colors
export const colors = {
  primary: '#231F20',
  secondary: '#FBFBFB',
  accent: '#F97E72',
  card: '#363031',
  warning: '#F15152',
  success: '#32E875',
  border: '#363031',
  text: '#FBFBFB',
  textSecondary: '#999',
  background: '#231F20',
};

// Common styles
export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

// Typography
export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  body: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    color: colors.text,
  },
  caption: {
    fontSize: 12,
    color: colors.textSecondary,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Border radius
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
};
