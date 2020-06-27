import { StyleSheet } from 'react-native';

export const DetailPartStyles = StyleSheet.create({
    background: {
        width: '100%',
        height: 320,
    },
    container:
    {
        flex: 1
    },
    header: {
        height: '30%'
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10
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
    money1: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    bottom: {
        // position: 'absolute',
        // width: '100%',
        // bottom: 0,
        height: '70%'
    }
})