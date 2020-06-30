import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { HeaderNavigation } from '../../component/common/TopNavigation';
import PartOneComponent from '../../component/home/part/PartOne.component';
import { PART_TYPE } from '../../util/constant';
import LANG from '../../language/vi';

class PartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderPartComponent = (partType) => {
        let component = null;
        switch (partType) {
            case PART_TYPE.PART_ONE:
                component = <PartOneComponent {...this.props} />
                break;     
            default:
                component = <PartOneComponent {...this.props} />
                break;
        }
        return component;
    }

    render() {
        const partData = this.props.route.params['partData'];
        const { partType } = partData;
        return (
            <>
                <HeaderNavigation {...this.props} title = {LANG.COMMON_TEXT[partType]}/>
                {this.renderPartComponent(partType)}
            </>
        );
    }
}

export default PartScreen;
