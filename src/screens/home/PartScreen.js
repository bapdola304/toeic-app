import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { HeaderNavigation } from '../../component/common/TopNavigation';
import PartOneComponent from '../../component/home/part/PartOne.component';
import PartTwoComponent from '../../component/home/part/PartTwo.component';
import PartThreeComponent from '../../component/home/part/PartThree.component';
import PartFiveComponent from '../../component/home/part/PartFive.component';
import PartSixComponent from '../../component/home/part/PartSix.component';
import { PART_TYPE } from '../../util/constant';
import LANG from '../../language/vi';
import { part3, part4, part5, part6 } from '../../util/mock_data';

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
            case PART_TYPE.PART_TWO:
                component = <PartTwoComponent {...this.props} />
                break;
            case PART_TYPE.PART_THREE:
                component = <PartThreeComponent {...this.props} data={part3} />
                break;
            case PART_TYPE.PART_FOUR:
                component = <PartThreeComponent {...this.props} data={part4} />
                break;
            case PART_TYPE.PART_FIVE:
                component = <PartFiveComponent {...this.props} data={part5} />
                break;
            case PART_TYPE.PART_SIX:
                component = <PartSixComponent {...this.props} data={part6} />
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
                <HeaderNavigation {...this.props} title={`${LANG.COMMON_TEXT[partType]}: ${LANG.COMMON_TEXT.PART_NAME[partType]}`} />
                {this.renderPartComponent(partType)}
            </>
        );
    }
}

export default PartScreen;
