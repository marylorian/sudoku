import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center'
  },
  levelButton: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderColor: '#cbd5e1',
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 92,
    paddingHorizontal: 10,
    paddingVertical: 9
  },
  selectedLevel: {
    backgroundColor: '#14532d',
    borderColor: '#14532d'
  },
  levelTitle: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '700'
  },
  levelMeta: {
    color: '#475569',
    fontSize: 12,
    marginTop: 2,
    textTransform: 'capitalize'
  },
  selectedText: {
    color: '#ffffff'
  }
});
