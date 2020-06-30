import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import PartList from './PartList';
import photoIcon from '../../../assets/images/photo.jpg';
import { DetailPartStyles } from './style/detailPart.style';
import { HOME_NAV } from '../../util/navigationName';
import LANG from '../../language/vi';

class PartDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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

    render() {
        const partType = this.props.route.params['partType'];
        return (
            <View style={DetailPartStyles.container}>
                <View style={DetailPartStyles.header}>
                    <ImageBackground resizeMode="cover" style={DetailPartStyles.background} source={photoIcon} >
                        <View style={DetailPartStyles.innerContainer}>
                            <View>
                                <Text style={DetailPartStyles.heading}>{LANG.COMMON_TEXT[partType]}</Text>
                            </View>
                            <View style={[DetailPartStyles.wrapperBody, { alignItems: 'flex-end' }]}>
                                <Text style={DetailPartStyles.money1}>{LANG.COMMON_TEXT.PART_NAME[partType]}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                <View style={DetailPartStyles.bottom}>
                    <PartList onPress={this.onPressItem} />
                </View>
            </View>
        );
    }
}

export default PartDetailComponent;
