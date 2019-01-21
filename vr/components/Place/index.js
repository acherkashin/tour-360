import React from 'react';
import { View, Text, Environment, StyleSheet } from 'react-360';
import Background from './Background';
import { CoordinateSystem } from "./../index";
import agro from './../../static-places/agro';

const HEIGHT = 600;
const WIDTH = 1170 * 4; // 90 deg * 4

export default class Place extends React.Component {
    constructor() {
        super();

        this.state = {
            currentPlace: agro
        }
    }

    componentDidMount() {
    }

    render() {
        //https://stackoverflow.com/questions/43437907/vr-view-360-photo-sphere-images-possible-cors-issue?rq=1

        return (
            <View style={styles.place}>
                <Background
                    url={this.state.currentPlace.url}
                    sound={this.state.currentPlace.sound}
                />
                <CoordinateSystem width={WIDTH} height={HEIGHT} stepX={200} stepY={100}/>
                {/* <Label
                    heading={' Курский Государственный Университет '}
                    onEyeClick={() => {
                        console.log('eye');
                    }}
                    onInfoClick={() => {
                        console.log('info');
                    }}
                /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    place: {
        width: WIDTH,
        height: HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    }
});