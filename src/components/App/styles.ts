import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    safeArea: {
      backgroundColor: '#f8fafc',
      flex: 1
    },
    container: {
      gap: 18,
      padding: 20,
      paddingBottom: 32
    },
    header: {
      gap: 5
    },
    title: {
      color: '#0f172a',
      fontSize: 34,
      fontWeight: '900'
    },
    subtitle: {
      color: '#334155',
      fontSize: 16,
      textTransform: 'capitalize'
    },
    statusRow: {
      flexDirection: 'row',
      gap: 12,
      justifyContent: 'space-between'
    },
    statusText: {
      color: '#164e63',
      fontSize: 15,
      fontWeight: '700'
    }
  });