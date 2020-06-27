import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../../util/colors';
const W = Dimensions.get("window").width;

export const MenuStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    more: {
        fontWeight: '500',
        color: Colors.blue
    },
    item: {
        // flex: 0.5,
        width: (W - 20) / 2,

        padding: 10,
    },
    itemBtn: {
        backgroundColor: 'gray',
        borderRadius: 20,
        minHeight: 150,
        overflow: 'hidden'
    },
    imageBtn: {
        flex: 1,
        borderRadius: 20,
        padding: 20
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000000',
        marginLeft: 30
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    itemDesc: {
        color: Colors.gray,
        marginTop: 8
    },
    containerList: {
        flexDirection: 'row',

    }
})