import { StyleSheet } from 'react-native';
import { Colors } from '../../../util/colors';

export const PartListStyles = StyleSheet.create({
    container: {
        // padding: 10,
        paddingTop: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        shadowColor: '#000',
        flex: 1
    },
    item: {
        flexDirection: 'row',
        paddingVertical: 10,

    },
    list: {
        marginTop: 20,
    },
    itemBody: {
        flex: 1,
        paddingHorizontal: 20
    },
    numHead: {
        fontSize: 20,
        fontWeight: '500',
        color: Colors.gray
    },
    itemTime: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.gray
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.black
    },
    itemPlayButton: {
        backgroundColor: Colors.green,
        width: 40,
        aspectRatio: 1,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    bottomContainer: {
        marginTop: 30,
        flexDirection: 'row',
        padding: 10,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        shadowColor: '#000',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.black
    },
    des: {
        fontSize: 18,
        color: Colors.black
    }
})