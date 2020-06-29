import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { HeaderNavigation } from '../../component/common/TopNavigation';
import ResultComponent from '../../component/home/Result.component';

class ResultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <>
                <ResultComponent {...this.props} />
            </>
        );
    }
}

export default ResultScreen;