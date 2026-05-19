import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    gap: 20
  },
  hero: {
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
    lineHeight: 22
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#14532d',
    borderRadius: 8,
    minHeight: 46,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10
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
    paddingVertical: 10
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800'
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800'
  },
  levelSection: {
    gap: 12
  },
  sectionTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '800'
  }
});
