import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.62)',
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  dialog: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    gap: 14,
    maxWidth: 420,
    padding: 22,
    width: '100%'
  },
  title: {
    color: '#0f172a',
    fontSize: 28,
    fontWeight: '900'
  },
  message: {
    color: '#334155',
    fontSize: 16,
    lineHeight: 22
  },
  actions: {
    gap: 10
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#14532d',
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    width: '100%'
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderColor: '#94a3b8',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    width: '100%'
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800'
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '800'
  }
});
