import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  board: {
    alignSelf: 'center',
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
    borderWidth: 2,
    maxWidth: 520,
    width: '100%'
  },
  row: {
    flexDirection: 'row'
  },
  cell: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#cbd5e1',
    borderWidth: 0.5,
    justifyContent: 'center'
  },
  fixedCell: {
    backgroundColor: '#e2e8f0'
  },
  selectedCell: {
    backgroundColor: '#bbf7d0'
  },
  rightBoxEdge: {
    borderRightColor: '#0f172a',
    borderRightWidth: 2
  },
  bottomBoxEdge: {
    borderBottomColor: '#0f172a',
    borderBottomWidth: 2
  },
  cellText: {
    color: '#064e3b',
    fontSize: 22,
    fontWeight: '700'
  },
  fixedText: {
    color: '#111827'
  }
});
