
import { Platform, StyleSheet } from 'react-native';
const HEADER_MAX_HEIGHT = 210;

export const HomeStyles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#37C1CB',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
        borderBottomRightRadius: 70,
        borderBottomLeftRadius: 40
    },
    backgroundImage: {
        position: 'absolute',
        top: 20,
        // left: 0,
        // right: 0,
        width: '90%',
        height: HEADER_MAX_HEIGHT,
        // resizeMode: 'cover',
    },
    bar: {
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 28 : 15,
        height: 32,
        // alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    title: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 15
    },
    scrollViewContent: {
        // iOS uses content inset, which acts like padding.
        paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
        paddingHorizontal: 10,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});