import { StyleSheet } from 'react-native';

export const DetailPartStyles = StyleSheet.create({
    background: {
        width: '100%',
        height: '110%',
    },
    container:
    {
        flex: 1
    },
    header: {
        height: '30%'
    },
    P1: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    P2: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: -150
    },
    P3: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: -190
    },
    P4: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    wrapperBody: {
        flexDirection: 'row',
        paddingVertical: 10
    },
    innerContainer: {
        padding: 10,
        marginTop: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    P1: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    P2: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: -150
    },
    bottom: {
        // position: 'absolute',
        // width: '100%',
        // bottom: 0,
        height: '70%'
    }
})