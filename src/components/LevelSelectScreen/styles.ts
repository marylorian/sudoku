import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexGrow: 1,
    gap: 18,
    justifyContent: 'center',
    width: '100%'
  },
  header: {
    alignItems: 'center',
    gap: 8
  },
  title: {
    color: '#0f172a',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center'
  },
  subtitle: {
    color: '#334155',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center'
  },
  actions: {
    alignItems: 'flex-start',
    maxWidth: 320,
    width: '100%'
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderColor: '#94a3b8',
    borderRadius: 8,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44
  },
  iconButtonText: {
    color: '#0f172a',
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 28
  },
  difficultySection: {
    alignItems: 'center',
    gap: 12,
    maxWidth: 320,
    width: '100%'
  },
  levelSection: {
    alignItems: 'center',
    gap: 12,
    width: '100%'
  },
  sectionTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center'
  },
  difficultyOptions: {
    gap: 8,
    width: '100%'
  },
  difficultyButton: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderColor: '#94a3b8',
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 14,
    paddingVertical: 10,
    width: '100%'
  },
  selectedDifficultyButton: {
    backgroundColor: '#14532d',
    borderColor: '#14532d'
  },
  difficultyButtonText: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '800',
    textTransform: 'capitalize'
  },
  selectedDifficultyButtonText: {
    color: '#ffffff'
  }
});
