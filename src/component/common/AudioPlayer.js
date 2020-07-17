import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import Slider from 'react-native-slider';
import { Audio } from 'expo-av';
import { PlayIcon, PauseIcon, VolumeDownIcon, VolumeUpIcon, RefreshIcon } from '../../component/common/Icon';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFFFFF';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = 'Loading...';
const BUFFERING_STRING = 'Buffering...';
const RATE_SCALE = 3.0;

export default class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.index = 0;
        this.isSeeking = false;
        this.shouldPlayAtEndOfSeek = false;
        this.playbackInstance = null;
        this.state = {
            playbackInstanceName: LOADING_STRING,
            playbackInstancePosition: null,
            playbackInstanceDuration: null,
            shouldPlay: false,
            isPlaying: false,
            isBuffering: false,
            isLoading: true,
            fontLoaded: false,
            volume: 1.0,
            rate: 1.0,
            portrait: null,
        };
        this.isStartFirstTime = false;
    }

    componentDidMount() {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false
        });
        (async () => {
            this.setState({ fontLoaded: true });
        })();

        this._loadNewPlaybackInstance(false);
        this.focusListener = this.props.navigation.addListener("blur", () => {
            this._onStopPressed();
        });
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        const { isPlay, source, isStop } = nextProps;
        if (this.props.isPlay !== isPlay && source.uri !== '') {
            this._onPlayPausePressed(); //start audio
        }
        if (this.props.isStop !== nextProps.isStop && isStop === true) {
            this._onStopPressed(); // stop audio
        }
        if (this.props.source.uri !== nextProps.source.uri) {
            this._onStopPressed();
            await this.createAudio(source);
            this.isStartFirstTime && this._onPlayPausePressed();
            this.isStartFirstTime = true;
        }
    }

    createAudio = async (source) => {
        const initialStatus = {
            shouldPlay: false,
            rate: this.state.rate,
            volume: this.state.volume,
        };
        const { sound  } = await Audio.Sound.createAsync(
            source,
            initialStatus,
            this._onPlaybackStatusUpdate
        );
        this.playbackInstance = sound;
        this._updateScreenForLoading(false);
    }

    async _loadNewPlaybackInstance(playing) {
        const { source } = this.props;
        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync();
            this.playbackInstance.setOnPlaybackStatusUpdate(null);
            this.playbackInstance = null;
        }
        if (source.uri !== '') {
           this.createAudio(source)
        }
    }

    _updateScreenForLoading(isLoading) {
        if (isLoading) {
            this.setState({
                isPlaying: false,
                playbackInstanceName: LOADING_STRING,
                playbackInstanceDuration: null,
                playbackInstancePosition: null,
                isLoading: true,
            });
        } else {
            this.setState({
                isLoading: false,
                playbackInstanceName: 'Audio'
            });
        }
    }

    _onPlaybackStatusUpdate = status => {
        if (status.isLoaded) {
            this.setState({
                playbackInstancePosition: status.positionMillis,
                playbackInstanceDuration: status.durationMillis,
                shouldPlay: status.shouldPlay,
                isPlaying: status.isPlaying,
                isBuffering: status.isBuffering,
                rate: status.rate,
                volume: status.volume,
            });
            if (status.didJustFinish) {
                this._updatePlaybackInstanceForIndex(false);
            }
        } else {
            if (status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`);
            }
        }
    };

    async _updatePlaybackInstanceForIndex(playing) {
        this._updateScreenForLoading(true);
        this._loadNewPlaybackInstance(false);
    }

    _onPlayPausePressed = () => {
        this.playbackInstance.playAsync();
        if (this.playbackInstance != null) {
            if (this.state.isPlaying) {
                this.playbackInstance.pauseAsync();
            } else {
                this.playbackInstance.playAsync();
            }
        }
    };

    _onStopPressed = () => {
        if (this.playbackInstance != null) {
            this.playbackInstance.stopAsync();
        }
    };

    _onForwardPressed = () => {
        if (this.playbackInstance != null) {
            this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
        }
    };

    _onBackPressed = () => {
        if (this.playbackInstance != null) {
            this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
        }
    };

    _onVolumeSliderValueChange = value => {
        if (this.playbackInstance != null) {
            this.playbackInstance.setVolumeAsync(value);
        }
    };

    _trySetRate = async rate => {
        if (this.playbackInstance != null) {
            try {
                await this.playbackInstance.setRateAsync(rate);
            } catch (error) {
                // Rate changing could not be performed, possibly because the client's Android API is too old.
            }
        }
    };

    _onRateSliderSlidingComplete = async value => {
        this._trySetRate(value * RATE_SCALE);
    };

    _onSeekSliderValueChange = value => {
        if (this.playbackInstance != null && !this.isSeeking) {
            this.isSeeking = true;
            this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
            this.playbackInstance.pauseAsync();
        }
    };

    _onSeekSliderSlidingComplete = async value => {
        if (this.playbackInstance != null) {
            this.isSeeking = false;
            const seekPosition = value * this.state.playbackInstanceDuration;
            if (this.shouldPlayAtEndOfSeek) {
                this.playbackInstance.playFromPositionAsync(seekPosition);
            } else {
                this.playbackInstance.setPositionAsync(seekPosition);
            }
        }
    };

    _getSeekSliderPosition() {
        if (
            this.playbackInstance != null &&
            this.state.playbackInstancePosition != null &&
            this.state.playbackInstanceDuration != null
        ) {
            return (
                this.state.playbackInstancePosition /
                this.state.playbackInstanceDuration
            );
        }
        return 0;
    }

    _getMMSSFromMillis(millis) {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        const padWithZero = number => {
            const string = number.toString();
            if (number < 10) {
                return '0' + string;
            }
            return string;
        };
        return padWithZero(minutes) + ':' + padWithZero(seconds);
    }

    _getTimestamp() {
        if (
            this.playbackInstance != null &&
            this.state.playbackInstancePosition != null &&
            this.state.playbackInstanceDuration != null
        ) {
            return `${this._getMMSSFromMillis(
                this.state.playbackInstancePosition
            )} / ${this._getMMSSFromMillis(
                this.state.playbackInstanceDuration
            )}`;
        }
        return '';
    }

    render() {
        return !this.state.fontLoaded ? (
            <View />
        ) : (
                <View style={styles.container}>
                    {/* <View style={styles.portraitContainer}>
					<Image
						style={styles.portrait}
						source={{
							uri: this.state.portrait,
						}}
					/>
				</View> */}
                    <View style={styles.detailsContainer}>
                        <Text style={[styles.text]}>
                            {this.state.playbackInstanceName}
                        </Text>
                        <Text style={[styles.text]}>
                            {this.state.isBuffering ? (
                                BUFFERING_STRING
                            ) : (
                                    this._getTimestamp()
                                )}
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.buttonsContainerBase,
                            styles.buttonsContainerTopRow,
                            {
                                opacity: this.state.isLoading
                                    ? DISABLED_OPACITY
                                    : 1.0,
                            },
                        ]}
                    >
                        {/* <TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={styles.wrapper}
						onPress={this._onBackPressed}
						disabled={this.state.isLoading}
					>
						<View>
							<MaterialIcons
								name="fast-rewind"
								size={40}
								color="#56D5FA"
							/>
						</View>
					</TouchableHighlight> */}
                        <TouchableHighlight
                            underlayColor={BACKGROUND_COLOR}
                            style={styles.wrapper}
                            onPress={this._onPlayPausePressed}
                            disabled={this.state.isLoading}
                        >
                            <View>
                                {this.state.isPlaying ? (
                                    <PauseIcon
                                        fill="#65C8D0"
                                        style={styles.sizeIcon}
                                    />
                                ) : (
                                        <PlayIcon
                                            fill="#65C8D0"
                                            style={styles.sizeIcon}
                                        />
                                    )}
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={BACKGROUND_COLOR}
                            style={styles.wrapper}
                            onPress={this._onStopPressed}
                            disabled={this.state.isLoading}
                        >
                            <View>
                                <RefreshIcon
                                    fill="#65C8D0"
                                    style={styles.sizeIcon}
                                />
                            </View>
                        </TouchableHighlight>
                        {/* <TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={styles.wrapper}
						onPress={this._onForwardPressed}
						disabled={this.state.isLoading}
					>
						<View>
							<MaterialIcons
								name="fast-forward"
								size={40}
								color="#56D5FA"
							/>
						</View>
					</TouchableHighlight> */}
                    </View>
                    <View
                        style={[
                            styles.playbackContainer,
                            {
                                opacity: this.state.isLoading
                                    ? DISABLED_OPACITY
                                    : 1.0,
                            },
                        ]}
                    >
                        <Slider
                            style={styles.playbackSlider}
                            value={this._getSeekSliderPosition()}
                            onValueChange={this._onSeekSliderValueChange}
                            onSlidingComplete={this._onSeekSliderSlidingComplete}
                            thumbTintColor="#65C8D0"
                            minimumTrackTintColor="#65C8D0"
                            disabled={this.state.isLoading}
                        />
                    </View>
                    <View
                        style={[
                            styles.buttonsContainerBase,
                            styles.buttonsContainerMiddleRow,
                        ]}
                    >
                        <View style={styles.volumeContainer}>
                            <View>
                                <VolumeDownIcon
                                    fill="#65C8D0"
                                    style={styles.sizeIcon}
                                />
                            </View>
                            <Slider
                                style={styles.volumeSlider}
                                value={1}
                                onValueChange={this._onVolumeSliderValueChange}
                                thumbTintColor="#65C8D0"
                                minimumTrackTintColor="#65C8D0"
                            />
                            <View>
                                <VolumeUpIcon
                                    fill="#65C8D0"
                                    style={styles.sizeIcon}
                                />
                            </View>
                        </View>
                    </View>
                    {/* <View
					style={[
						styles.buttonsContainerBase,
						styles.buttonsContainerBottomRow,
					]}
				>
					<View>
						<MaterialIcons
							name="call-received"
							size={40}
							color="#56D5FA"
						/>
					</View>
					<Slider
						style={styles.rateSlider}
						value={this.state.rate / RATE_SCALE}
						onSlidingComplete={this._onRateSliderSlidingComplete}
						thumbTintColor="#000000"
						minimumTrackTintColor="#4CCFF9"
					/>
					<View>
						<MaterialIcons
							name="call-made"
							size={40}
							color="#56D5FA"
						/>
					</View>
				</View> */}
                </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: BACKGROUND_COLOR,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    },
    portraitContainer: {
        // marginTop: 80,
    },
    portrait: {
        height: 200,
        width: 200,
    },
    detailsContainer: {
        height: 20,
        marginTop: 10,
        alignItems: 'center',
    },
    playbackContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        // paddingHorizontal: 10
    },
    playbackSlider: {
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,
    },
    text: {
        fontSize: FONT_SIZE,
        minHeight: FONT_SIZE,
        fontWeight: 'bold'
    },
    buttonsContainerBase: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonsContainerTopRow: {
        maxHeight: 40,
        minWidth: DEVICE_WIDTH / 2.0,
        maxWidth: DEVICE_WIDTH / 2.0,
    },
    buttonsContainerMiddleRow: {
        maxHeight: 40,
        alignSelf: 'stretch',
        paddingRight: 20,
    },
    volumeContainer: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: DEVICE_WIDTH - 40,
        maxWidth: DEVICE_WIDTH - 40,
        marginLeft: 10
    },
    volumeSlider: {
        width: DEVICE_WIDTH - 90,
    },
    buttonsContainerBottomRow: {
        alignSelf: 'stretch',
    },
    rateSlider: {
        width: DEVICE_WIDTH - 80,
    },
    sizeIcon: {
        width: 32,
        height: 32
    }
});
