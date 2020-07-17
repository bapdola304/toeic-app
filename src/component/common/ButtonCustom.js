import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '@ui-kitten/components';

export default (props) => {
    const { size = 'medium', onPress, accessoryLeft, accessoryRight, text = '', color = '#65C8D0', style = {} } = props;
    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <Button
                size={size}
                accessoryLeft={accessoryLeft}
                accessoryRight={accessoryRight}
                onPress={onPress}
                appearance='outline'
                status='control'
                style = {style}
            >
                {text}
            </Button>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        height: 45,
    },
});