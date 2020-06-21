import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onNavigation = () => {
        console.log(this.props.navigation.navigate('Oder'));
        
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onNavigation}>
                <Text>HomeScreen</Text>
            </TouchableOpacity>
        );
    }
}

export default HomeScreen;

