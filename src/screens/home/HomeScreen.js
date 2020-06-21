import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import HomeComponent from '../../component/home/Home.component';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <HomeComponent {...this.props}/>
        );
    }
}

export default HomeScreen;

