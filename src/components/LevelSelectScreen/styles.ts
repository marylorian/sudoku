import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    gap: 18
  },
  header: {
    gap: 8
  },
  title: {
    color: '#0f172a',
    fontSize: 32,
    fontWeight: '900'
  },
  subtitle: {
    color: '#334155',
    fontSize: 16,
    lineHeight: 22
  },
  actions: {
    alignItems: 'flex-start'
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderColor: '#94a3b8',
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '800'
  }
});
