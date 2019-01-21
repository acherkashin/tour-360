import { StyleSheet } from 'react-360';

const c = 150;
const BORDER_RADIUS = 0.036 * c;

const styles = StyleSheet.create({
    caption: {
        width: 2.7 * c,
        height: 0.4 * c,
        opacity: 0.90,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        layoutOrigin: [0.5, 0.5],
        transform: [{ translate: [0, 0, -3] }]
    },
    leftItem: {
        flex: 1,
        height: '100%',
        marginRight: 0.02 * c,
        backgroundColor: '#7E7E7E',
        borderWidth: 0.02 * c,
        borderColor: 'white',
        borderTopLeftRadius: BORDER_RADIUS,
        borderBottomLeftRadius: BORDER_RADIUS,
        alignItems: 'center',
        justifyContent: 'center'
    },
    middleItem: {
        flex: 1,
        height: '100%',
        marginRight: 0.02 * c,
        backgroundColor: '#7E7E7E',
        borderWidth: 0.02 * c,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightItem: {
        flex: 3,
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderWidth: 0.02 * c,
        borderColor: 'white',
        borderTopRightRadius: BORDER_RADIUS,
        borderBottomRightRadius: BORDER_RADIUS,
        paddingHorizontal: 0.08 * c,
        justifyContent: 'center'
    },
    icon: {
        height: 0.18 * c,
        width: 0.18 * c
    },
    btn: {
        // backgroundColor: 'white',
        height: 0.32 * c,
        width: 0.5 * c,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 0.12 * c,
        color: '#ffffff'
    }
});

export default styles;