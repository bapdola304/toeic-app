import { StyleSheet } from 'react-native';

export const PartOneStyles = StyleSheet.create({
    container:
    {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        paddingVertical: 20,
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
    },
    image: {
        width: '90%',
        marginLeft: '5%',
        height: 250
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
        paddingHorizontal: 10
    },
    groupRadio: {
        flexDirection: 'row', flexWrap: 'wrap'
    },
    wrapBtnCheck: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    btnCheck: {
        backgroundColor: '#65C8D0'
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
    }
})