import { StyleSheet } from 'react-native';

export const PartOneStyles = StyleSheet.create({
    container:
    {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10,
        alignItems: 'center',
        height: '11%'
    },
    wrapTimer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#65C8D0'
    },
    wrapTime: {
        width: '20%'
    },
    textTimer: {
        fontSize: 12,
    },
    valueTimer: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#65C8D0'
    },
    imagePartOne: {
        paddingHorizontal: 5,
        height: '30%'
    },
    image: {
        width: '90%',
        marginLeft: '5%',
        height: '100%',
        resizeMode: 'cover'
    },
    radio: {
        margin: 2,
    },
    controlContainer: {
        borderRadius: 20,
        margin: 10,
        padding: 15,
        backgroundColor: '#65C8D0',
        width: '44%'
    },
    wrapAnswer: {
        paddingHorizontal: 10,
        marginTop: 10,
        height: '55%',
        paddingBottom: '28%'
    },
    groupRadio: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    wrapBtnCheck: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    wrapBtn: {
        backgroundColor: '#65C8D0',
        borderRadius: 4,
    },
    btnCheck: {
        borderColor: '#65C8D0',
    },
    textAnswer: {
        fontSize: 18
    },
    textAnswerSelected: {
        fontWeight: 'bold',
    },
    numberOfQuestion: {
        position: 'absolute',
        top: 0,
        left: 20,
        color: '#000000',
        fontWeight: 'bold'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    textModal: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    wrapAnsDes: {
        paddingHorizontal: 10
    },
    wrapDesText: {
        flexDirection: 'row',
        marginTop: 10
    },
    keyQuestion: {
        fontSize: 17
    },
    valueQuestion: {
        fontSize: 17,
        fontWeight: 'bold',
        width: '82%'
    },
    correctQuestion: {
        color: '#49CC96'
    },
    inCorrectQuestion: {
        color: '#ff0000bd'
    },
    wrapProcessbar: {
        paddingHorizontal: 10,
        width: '80%'
    }
})