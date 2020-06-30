import React from 'react';
import { Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { ArrowIosBackIcon } from './Icon';

export const HeaderNavigation = (props) => {
    const { title = 'title' } = props;

    const BackAction = () => (
        <TopNavigationAction icon={ArrowIosBackIcon} onPress={props.navigation.goBack} />
    );

    return (
        <TopNavigation
            accessoryLeft={BackAction}
            title={() => <Text style={styles.title}>{title}</Text>}
            appearance='control'
            style={styles.topNavigation}
            alignment = 'center'
        />
    )
};

const styles = StyleSheet.create({
    topNavigation: {
        backgroundColor: '#65C8D0',
        color: 'red'
    },
    title: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})