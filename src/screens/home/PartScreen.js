import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { HeaderNavigation } from '../../component/common/TopNavigation';
import PartOneComponent from '../../component/home/part/PartOne.component';

class PartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <>
                <HeaderNavigation {...this.props} />
                <PartOneComponent {...this.props} />
            </>
        );
    }
}

export default PartScreen;
