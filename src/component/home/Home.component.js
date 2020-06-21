import React, { Component } from 'react';
import {
    Animated,
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Menu from './Menu'
import homeBanner from '../../../assets/images/bannerImage.png';

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
        const data = Array.from({ length: 30 });
        return (
            <View style={styles.scrollViewContent}>
                <Menu onPress={this.onPressItem} />
            </View>
        );
    }

    onPressItem = () => {
        this.props.navigation.navigate('PartDetail');
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
            <View style={styles.fill}>
                <Animated.ScrollView
                    style={styles.fill}
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
                        styles.header,
                        { transform: [{ translateY: headerTranslate }] },
                    ]}
                >
                    <Animated.Image
                        style={[
                            styles.backgroundImage,
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
                        styles.bar,
                        {
                            transform: [
                                { scale: titleScale },
                                { translateY: titleTranslate },
                            ],
                        },
                    ]}
                >
                    {/* <Text style={styles.title}>Toeic Tesing</Text> */}
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#37C1CB',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
        borderBottomRightRadius: 70,
        borderBottomLeftRadius: 40
    },
    backgroundImage: {
        position: 'absolute',
        top: 20,
        // left: 0,
        // right: 0,
        width: '90%',
        height: HEADER_MAX_HEIGHT,
        // resizeMode: 'cover',
    },
    bar: {
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 28 : 15,
        height: 32,
        // alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    title: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 15
    },
    scrollViewContent: {
        // iOS uses content inset, which acts like padding.
        paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
        paddingHorizontal: 10,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});