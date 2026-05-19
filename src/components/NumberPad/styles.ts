import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        justifyContent: 'center'
    },
    key: {
        alignItems: 'center',
        backgroundColor: '#e0f2fe',
        borderColor: '#0369a1',
        borderRadius: 8,
        borderWidth: 1,
        height: 44,
        justifyContent: 'center',
        minWidth: 44,
        paddingHorizontal: 12
    },
    clearKey: {
        backgroundColor: '#fff7ed',
        borderColor: '#c2410c'
    },
    keyText: {
        color: '#0c4a6e',
        fontSize: 18,
        fontWeight: '800'
    },
    clearText: {
        color: '#9a3412',
        fontSize: 14
    }
});