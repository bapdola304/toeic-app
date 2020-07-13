import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainHomeComponent from '../../component/mainHome/MainHome.component';

class MainHomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <MainHomeComponent {...this.props}/>
        );
    }
}

export default MainHomeScreen;

