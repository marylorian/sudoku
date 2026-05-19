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
  },
  gameActions: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderColor: '#94a3b8',
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 42,
    paddingHorizontal: 14,
    paddingVertical: 9
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '800'
  },
  confirmOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.62)',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    padding: 20,
    position: 'absolute',
    right: 0,
    top: 0
  },
  confirmDialog: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    gap: 14,
    maxWidth: 420,
    padding: 22,
    width: '100%'
  },
  confirmTitle: {
    color: '#0f172a',
    fontSize: 24,
    fontWeight: '900'
  },
  confirmMessage: {
    color: '#334155',
    fontSize: 16,
    lineHeight: 22
  },
  confirmActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  dangerButton: {
    alignItems: 'center',
    backgroundColor: '#b91c1c',
    borderRadius: 8,
    justifyContent: 'center',
    minHeight: 42,
    paddingHorizontal: 14,
    paddingVertical: 9
  },
  dangerButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800'
  }
});
