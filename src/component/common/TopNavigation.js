import React from 'react';
import { Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet } from 'react-native';



export const HeaderNavigation = (props) => {
    const { title = 'title', navigation } = props;
    console.log('navigation', navigation);

    const BackIcon = () => (
        <Icon
            name='chevron-left'
            size={26}
            color={'#ffffff'}
        />
    );

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={props.navigation.goBack} />
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
        fontWeight: 'bold'
    }
})