import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexGrow: 1,
    gap: 24,
    justifyContent: 'center'
  },
  hero: {
    alignItems: 'center',
    gap: 10
  },
  title: {
    color: '#0f172a',
    fontSize: 36,
    fontWeight: '900'
  },
  subtitle: {
    color: '#334155',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center'
  },
  actions: {
    gap: 10,
    maxWidth: 320,
    width: '100%'
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#14532d',
    borderRadius: 8,
    minHeight: 46,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: '100%'
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderColor: '#94a3b8',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 46,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: '100%'
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800'
  },
  primaryButtonMeta: {
    color: '#dcfce7',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
    textTransform: 'capitalize'
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800'
  }
});
