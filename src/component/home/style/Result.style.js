import { StyleSheet } from 'react-native';

export const ResultStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapResultText: {
        height: '40%',
        backgroundColor: '#65C8D0',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    resultText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: '10%'
    },
    wrapContent: {
        height: '82%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 250,
        borderTopRightRadius: 250,
        top: '-22%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    circleProcess: {
        marginTop: '10%'
    },
    wrapScore: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    keyScore: { fontSize: 30 },
    valueScore: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    wrapTextNotify: {
        marginTop: '10%'
    },
    textNotify: {
        fontSize: 20, textAlign: 'center'
    },
    btnGoHome: {
        width: '80%',
        marginTop: '5%'
    }
})