import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import PartList from './PartList';
import part1Image from '../../../assets/images/photo.jpg';
import part2Image from '../../../assets/images/part2.jpg';
import part3Image from '../../../assets/images/part3.png';
import part4Image from '../../../assets/images/part4.png';
import part5Image from '../../../assets/images/part5.png';
import part6Image from '../../../assets/images/part6.png';
import { DetailPartStyles } from './style/detailPart.style';
import { HOME_NAV } from '../../util/navigationName';
import LANG from '../../language/vi';
import { PART_TYPE } from '../../util/constant';
import { partDetailData } from '../../data/partDetail.data';

class PartDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partDes: {}
        };
    }

    componentDidMount() {
        const partType = this.props.route.params['partType'];
        const partDes = partDetailData.find(part => part.partType === partType) || partDetailData[0];
        this.setState({ partDes });
    }

    onPressItem = (item) => {
        const { level = 1 } = item;
        const partType = this.props.route.params['partType'];
        const partData = {
            level,
            partType
        }
        this.props.navigation.navigate(HOME_NAV.PART, { partData });
    }

    renderImage = () => {
        const partType = this.props.route.params['partType'];
        let image = null;
        switch (partType) {
            case PART_TYPE.PART_ONE:
                image = part1Image
                break;
            case PART_TYPE.PART_TWO:
                image = part2Image
                break;
            case PART_TYPE.PART_THREE:
                image = part3Image
                break;
            case PART_TYPE.PART_FOUR:
                image = part4Image
                break;
            case PART_TYPE.PART_FIVE:
                image = part5Image
                break;
            case PART_TYPE.PART_SIX:
                image = part6Image
                break;
            default:
                image = part1Image
                break;
        }
        return image;
    }

    render() {
        const partType = this.props.route.params['partType'];
        const { partDes } = this.state;
        const isShowTitle = partType === 'P3' || partType === 'P5';
        return (
            <View style={DetailPartStyles.container}>
                <View style={DetailPartStyles.header}>
                    <ImageBackground resizeMode="cover" style={DetailPartStyles.background} source={this.renderImage()} >
                        <View style={DetailPartStyles.innerContainer}>
                            <View>
                                <Text style={DetailPartStyles[partType]}>{!isShowTitle && LANG.COMMON_TEXT[partType]}</Text>
                            </View>
                            <View style={[DetailPartStyles.wrapperBody, { alignItems: 'flex-end' }]}>
                                <Text style={DetailPartStyles[partType]}>{LANG.COMMON_TEXT.PART_NAME[partType]}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                <View style={DetailPartStyles.bottom}>
                    <PartList onPress={this.onPressItem} partDes={partDes} />
                </View>
            </View>
        );
    }
}

export default PartDetailComponent;
