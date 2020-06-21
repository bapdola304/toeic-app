import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, ImageEditor, Image } from 'react-native';
import { Colors } from '../../util/colors';
import PartList from './PartList';
import photoIcon from '../../../assets/images/photo.jpg';

class PartDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <ImageBackground resizeMode="cover" style={styles.background} source={photoIcon} >
                        <View style={styles.innerContainer}>
                            <View>
                                <Text style={styles.heading}>Part 1 Toeic</Text>
                            </View>
                            <View style={[styles.wrapperBody, { alignItems: 'flex-end' }]}>
                                <Text style={styles.money1}>Photographs</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                <View style={styles.bottom}>
                    <PartList />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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

export default PartDetailComponent;
