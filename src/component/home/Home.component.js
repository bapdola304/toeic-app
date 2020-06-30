import React, { Component } from 'react';
import {
    Animated,
    Platform,
    Text,
    View,
} from 'react-native';
import Menu from './Menu'
import homeBanner from '../../../assets/images/bannerImage.png';
import { HomeStyles } from './style/home.style';
import { HOME_NAV } from '../../util/navigationName';

const HEADER_MAX_HEIGHT = 210;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 48;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(
                // iOS has negative initial scroll value because content inset...
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
            refreshing: false,
        };
    }

    _renderScrollViewContent() {
        return (
            <View style={HomeStyles.scrollViewContent}>
                <Menu onPress={this.onPressItem} />
            </View>
        );
    }

    onPressItem = (item) => {
        this.props.navigation.navigate(HOME_NAV.PART_DETAIl, { partType: item.type });
    }

    getAnimateValue = () => {
        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
        );
        const headerTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });

        const imageOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        const titleScale = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0.8],
            extrapolate: 'clamp',
        });
        const titleTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -8],
            extrapolate: 'clamp',
        });

        return {
            headerTranslate,
            imageOpacity,
            imageTranslate,
            titleScale,
            titleTranslate
        }
    }

    render() {
        const {
            headerTranslate,
            imageOpacity,
            imageTranslate,
            titleScale,
            titleTranslate
        } = this.getAnimateValue();

        return (
            <View style={HomeStyles.fill}>
                <Animated.ScrollView
                    style={HomeStyles.fill}
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        { useNativeDriver: true },
                    )}
                    // iOS offset for RefreshControl
                    contentInset={{
                        top: HEADER_MAX_HEIGHT,
                    }}
                    contentOffset={{
                        y: -HEADER_MAX_HEIGHT,
                    }}
                >
                    {this._renderScrollViewContent()}
                </Animated.ScrollView>
                <Animated.View
                    pointerEvents="none"
                    style={[
                        HomeStyles.header,
                        { transform: [{ translateY: headerTranslate }] },
                    ]}
                >
                    <Animated.Image
                        style={[
                            HomeStyles.backgroundImage,
                            {
                                opacity: imageOpacity,
                                transform: [{ translateY: imageTranslate }],
                            },
                        ]}
                        source={homeBanner}
                    />
                </Animated.View>
                <Animated.View
                    style={[
                        HomeStyles.bar,
                        {
                            transform: [
                                { scale: titleScale },
                                { translateY: titleTranslate },
                            ],
                        },
                    ]}
                >
                    {/* <Text style={HomeStyles.title}>Toeic Tesing</Text> */}
                </Animated.View>
            </View>
        );
    }
}