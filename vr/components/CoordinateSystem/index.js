import React from 'react';
import { View, Text, StyleSheet } from 'react-360';
import { WIDTH, HEIGHT } from './../../utils/CoordinateUtils';

export default class CoordinateSystem extends React.Component {
    getPositionsX() {
        const {
            width = WIDTH,
            stepX = 100,
        } = this.props;
        const amountStepX = Math.ceil(width / stepX / 2);
        const positions = [0]

        for (let i = 1; i < amountStepX; i++) {
            positions.push(i * stepX);
            positions.unshift(i * stepX * -1);
        }

        return positions;
    }

    getPositionsY() {
        const {
            width = WIDTH,
            stepY = 100,
        } = this.props;
        const amountStepY = Math.ceil(width / stepY / 2);
        const positions = [0]

        for (let i = 1; i < amountStepY; i++) {
            positions.push(i * stepY);
            positions.unshift(i * stepY * -1);
        }

        return positions;
    }

    render() {
        const positionsX = this.getPositionsX();
        const positionsY = this.getPositionsY();
        
        return (
            <View style={styles.root}>
                <View style={[styles.axis, styles.axisX]} />
                {positionsX.map((i) => <View key={`x_${i}`} style={[styles.axis, styles.lineX, {
                    transform: [{ translate: [i, 0], }]
                }]} />)}
                {positionsX.map((i) => <Text key={`label_x_${i}`} style={[styles.label, {
                    transform: [{ translate: [i + 5, 5], }]
                }]}>{i}</Text>)}

                <View style={[styles.axis, styles.axisY]} />

                {positionsY.map((i) => <View key={`y_${i}`} style={[styles.axis, styles.lineY, {
                    transform: [{ translate: [0, i], }]
                }]} />)}
                {positionsY.map((i) => <Text key={`label_y_${i}`} style={[styles.label, {
                    transform: [{ translate: [5, i + 5], }]
                }]}>{i}</Text>)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: 'black',
        backgroundColor: 'rgba(255,255,255, 0.8)'
    },
    axis: {
        borderColor: 'black',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    axisX: {
        height: 5,
        width: '100%'
    },
    axisY: {
        width: 5,
        height: '100%'
    },
    lineX: {
        width: 2,
        height: '100%',
    },
    lineY: {
        width: '100%',
        height: 2,
    },
    label: {
        position: 'absolute',
        layoutOrigin: [-0.5, 0.5],
    }
});