import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import PartList from './PartList';
import photoIcon from '../../../assets/images/photo.jpg';
import { DetailPartStyles } from './style/detailPart.style';
import { HOME_NAV } from '../../util/navigationName';

class PartDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onPressItem = () => {      
        this.props.navigation.navigate(HOME_NAV.PART);
    }

    render() {
        return (
            <View style={DetailPartStyles.container}>
                <View style={DetailPartStyles.header}>
                    <ImageBackground resizeMode="cover" style={DetailPartStyles.background} source={photoIcon} >
                        <View style={DetailPartStyles.innerContainer}>
                            <View>
                                <Text style={DetailPartStyles.heading}>Part 1 Toeic</Text>
                            </View>
                            <View style={[DetailPartStyles.wrapperBody, { alignItems: 'flex-end' }]}>
                                <Text style={DetailPartStyles.money1}>Photographs</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                <View style={DetailPartStyles.bottom}>
                    <PartList onPress = {this.onPressItem} />
                </View>
            </View>
        );
    }
}

export default PartDetailComponent;
