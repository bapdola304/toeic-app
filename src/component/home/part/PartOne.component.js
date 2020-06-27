import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Radio, RadioGroup, Button } from '@ui-kitten/components';
import AudioPlayer from '../../common/AudioPlayer';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { CheckIcon } from '../../common/Icon';
import { optionAnswer } from '../../../util/common';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import LANG from '../../../language/vi';
import { Colors } from '../../../util/colors';
import { PartOneStyles } from '../style/PartOne.style';

const barWidth = Dimensions.get('screen').width - 30;
const timeOfQuestion = 30;

class PartOneComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 10,
            selectedIndex: -1,
            progressTimer: 0,
            timeOfQuestionState: timeOfQuestion
        };
    }

    componentDidMount() {
        this.countDown();
    }

    countDown = () => {
        this.timer = setInterval(() => {
            let { timeOfQuestionState } = this.state;          
            let newProcess = (100 - ((timeOfQuestionState / timeOfQuestion) * 100));
            let newTimeOfQuestionState = timeOfQuestionState -= 1;
            this.setState({ timeOfQuestionState: newTimeOfQuestionState, progressTimer: newProcess });
            if(newTimeOfQuestionState < 0){
                clearInterval(this.timer);
                return;
            }
        }, 1000);
    }

    renderRadioButtonAnswer = () => {
        const { selectedIndex } = this.state;
        return optionAnswer.map((item, index) => {
            return (
                <Radio style={PartOneStyles.controlContainer} status='control' key = {item}>
                    <Text style={[PartOneStyles.textAnswer, selectedIndex === index && PartOneStyles.textAnswerSelected]}>{`${LANG.HOME.PART_ONE.OPTION} ${item}`}</Text>
                </Radio>
            )
        })
    }

    setSelectedIndex = (index) => {
        this.setState({ selectedIndex: index });
    }

    render() {
        const { selectedIndex, progressTimer, timeOfQuestionState } = this.state;
        return (
            <View style={PartOneStyles.container}>
                <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                    <ProgressBarAnimated
                        width={barWidth}
                        value={this.state.progress}
                        backgroundColorOnComplete={Colors.primaryColor}
                        maxValue={100}
                        backgroundColor={Colors.primaryColor}
                        height = {20}
                        borderRadius = {10}
                        borderColor = {Colors.primaryColor}
                    />
                    <Text style = {PartOneStyles.numberOfQuestion}>1/10</Text>
                </View>
                <View style={PartOneStyles.header}>
                    <AnimatedCircularProgress
                        size={70}
                        width={5}
                        fill={progressTimer}
                        tintColor={Colors.primaryColor}
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="#3d5875"
                    >
                        {
                            (fill) => (
                                <View style={PartOneStyles.wrapTimer}>
                                    <Text style={PartOneStyles.textTimer}>{LANG.HOME.PART_ONE.SECOND}</Text>
                                    <Text style={PartOneStyles.valueTimer}>{timeOfQuestionState < 0 ? 0 : timeOfQuestionState}</Text>
                                </View>
                            )
                        }
                    </AnimatedCircularProgress>
                    <View style={PartOneStyles.wrapTimer}>
                        <Text style={PartOneStyles.textTimer}>{LANG.HOME.PART_ONE.SCORE}</Text>
                        <Text style={PartOneStyles.valueTimer}>30</Text>
                    </View>
                </View>
                <View style={PartOneStyles.imagePartOne}>
                    <Image source={{ uri: 'https://www.anhngumshoa.com/uploads/images/resize/550x550/2012/question/171708_05032012_818890.jpg' }} style={PartOneStyles.image} />
                </View>
                <View style={PartOneStyles.wrapAnswer}>
                    <RadioGroup
                        selectedIndex={selectedIndex}
                        onChange={index => this.setSelectedIndex(index)}
                        style={PartOneStyles.groupRadio}
                    >
                        {this.renderRadioButtonAnswer()}
                    </RadioGroup>
                </View>
                <View style={PartOneStyles.wrapBtnCheck}>
                    <AudioPlayer
                        source={{ uri: 'https://www.anhngumshoa.com/uploads/sound/2012/171708_05032012_301242.mp3' }}
                        navigation={this.props.navigation}
                    />
                    <Button
                        style={PartOneStyles.button}
                        size='medium'
                        accessoryLeft={CheckIcon}
                        status='control'
                        style={PartOneStyles.btnCheck}
                    >
                        {LANG.HOME.PART_ONE.CHECK_ANSWER}
                    </Button>
                </View>
            </View>
        );
    }
}

export default PartOneComponent;
