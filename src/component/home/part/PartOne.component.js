import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Radio, RadioGroup, Button, Card, Modal } from '@ui-kitten/components';
import AudioPlayer from '../../common/AudioPlayer';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { CheckIcon, NextIcon, FinishIcon } from '../../common/Icon';
import { optionAnswer, data } from '../../../util/common';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import LANG from '../../../language/vi';
import { Colors } from '../../../util/colors';
import { PartOneStyles } from '../style/PartOne.style';
import ButtonCustom from '../../common/ButtonCustom';
import { HOME_NAV } from '../../../util/navigationName';

const barWidth = Dimensions.get('screen').width - 30;
const timeOfQuestion = 90;

class PartOneComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressQuestion: 0,
            selectedAnswer: 0,
            progressTimer: 0,
            timeOfQuestionState: timeOfQuestion,
            isPlay: false,
            showModal: true,
            data,
            question: {},
            countQuestion: 1,
            totalQuestion: data.length,
            isShowDes: false,
            scrore: 0,
            isStop: false,
        };
    }

    UNSAFE_componentWillMount() {
        const { countQuestion, progressQuestion, totalQuestion } = this.state;
        const question = data[countQuestion - 1];
        let newProgressQuestion = progressQuestion + (100 / totalQuestion);
        this.setState({ question, progressQuestion: newProgressQuestion });
    }

    countDown = () => {
        this.timer = setInterval(() => {
            let { timeOfQuestionState } = this.state;
            let newProcess = (100 - ((timeOfQuestionState / timeOfQuestion) * 100));
            let newTimeOfQuestionState = timeOfQuestionState -= 1;
            this.setState({ timeOfQuestionState: newTimeOfQuestionState, progressTimer: newProcess });
            if (newTimeOfQuestionState < 0) {
                clearInterval(this.timer);
                this.OnCheckAnswer();
                return;
            }
        }, 1000);
    }

    renderRadioButtonAnswer = () => {
        const { selectedAnswer } = this.state;
        return optionAnswer.map((item, index) => {
            return (
                <Radio style={PartOneStyles.controlContainer} status='control' key={item}>
                    <Text style={[PartOneStyles.textAnswer, selectedAnswer === index && PartOneStyles.textAnswerSelected]}>{`${LANG.HOME.PART_ONE.OPTION} ${item}`}</Text>
                </Radio>
            )
        })
    }

    renderAnswerDes = () => {
        const { question: { answers = [] }, selectedAnswer } = this.state;
        return answers.map((ans, index) => {
            const { content = '', answer_id = '', correct } = ans;
            const isAnswerCorrect = correct === '1';
            const isAnswerSelectedInCorrect = !isAnswerCorrect && selectedAnswer === index;
            return (
                <View style={PartOneStyles.wrapDesText} key={answer_id}>
                    <Text style={[PartOneStyles.keyQuestion, isAnswerSelectedInCorrect && PartOneStyles.inCorrectQuestion, isAnswerCorrect && PartOneStyles.correctQuestion]}>{`Câu ${optionAnswer[index]}: `}</Text>
                    <Text style={[PartOneStyles.valueQuestion, isAnswerSelectedInCorrect && PartOneStyles.inCorrectQuestion, isAnswerCorrect && PartOneStyles.correctQuestion]}>{content}</Text>
                </View>
            )
        })
    }

    setSelectedIndex = (index) => {
        this.setState({ selectedAnswer: index });
    }

    setShowModal = () => {
        this.countDown();
        this.setState((prevState) => ({ showModal: !prevState.showModal, isPlay: !prevState.isPlay }));
    }

    OnCheckAnswer = () => {
        let { question: { answers = [] }, selectedAnswer, scrore } = this.state;
        const indexCorrect = answers.findIndex(ans => ans.correct === '1');
        const isCorrect = indexCorrect === selectedAnswer;
        const newScore = isCorrect ? scrore += 10 : scrore;
        clearInterval(this.timer);
        this.setState({
            isShowDes: true,
            isPlay: false,
            scrore: newScore,
            isStop: true
        });
    }

    onNextQuestion = () => {
        let { countQuestion, progressQuestion, totalQuestion } = this.state;
        const countQuestionTemp = countQuestion += 1;
        const question = data[countQuestionTemp - 1];
        let newProgressQuestion = progressQuestion + (100 / totalQuestion);
        this.setState({
            question,
            countQuestion: countQuestionTemp,
            isShowDes: false,
            selectedAnswer: 0,
            progressQuestion: newProgressQuestion,
            isPlay: true,
            progressTimer: 0,
            timeOfQuestionState: timeOfQuestion,
            isStop: false
        }, () => this.countDown());
    }

    onFinsh = () => {
        let { totalQuestion, scrore } = this.state;
        const result = {
            totalQuestion,
            scrore,
            partType: 'P1'
        }
        this.props.navigation.navigate(HOME_NAV.RESULT, { result });
    }

    render() {
        const {
            selectedAnswer,
            progressTimer,
            timeOfQuestionState,
            isPlay,
            showModal,
            countQuestion,
            totalQuestion,
            question: { image = '', audio = '' },
            isShowDes,
            progressQuestion,
            scrore,
            isStop
        } = this.state;

        return (
            <View style={PartOneStyles.container}>
                <View style={PartOneStyles.wrapProcessbar}>
                    <ProgressBarAnimated
                        width={barWidth}
                        value={progressQuestion > 100 ? 100 : progressQuestion}
                        backgroundColorOnComplete={Colors.primaryColor}
                        backgroundColor={Colors.primaryColor}
                        height={20}
                        borderRadius={10}
                        borderColor={Colors.primaryColor}
                    />
                    <Text style={PartOneStyles.numberOfQuestion}>{`câu ${countQuestion}/${totalQuestion}`}</Text>
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
                        <Text style={PartOneStyles.valueTimer}>{scrore}</Text>
                    </View>
                </View>
                <View style={PartOneStyles.imagePartOne}>
                    <Image source={{ uri: image }} style={PartOneStyles.image} />
                </View>
                <View style={PartOneStyles.wrapAnswer}>
                    {
                        isShowDes ? (
                            <View style={PartOneStyles.wrapAnsDes}>
                                <ScrollView>
                                    {this.renderAnswerDes()}
                                </ScrollView>
                            </View>
                        )
                            : (
                                <RadioGroup
                                    selectedIndex={selectedAnswer}
                                    onChange={index => this.setSelectedIndex(index)}
                                    style={PartOneStyles.groupRadio}
                                >
                                    {this.renderRadioButtonAnswer()}
                                </RadioGroup>
                            )
                    }
                </View>
                <View style={PartOneStyles.wrapBtnCheck}>
                    <AudioPlayer
                        source={{ uri: audio }}
                        navigation={this.props.navigation}
                        isPlay={isPlay}
                        isStop={isStop}
                    />
                    {
                        isShowDes ? (
                            progressQuestion >= 100 ? (
                                <ButtonCustom
                                    size='medium'
                                    accessoryRight={FinishIcon}
                                    onPress={this.onFinsh}
                                    text={LANG.HOME.PART_ONE.FINISH}
                                />
                            )
                                : (
                                    <ButtonCustom
                                        size='medium'
                                        accessoryRight={NextIcon}
                                        onPress={this.onNextQuestion}
                                        text={LANG.HOME.PART_ONE.NEXT_QUESTION}
                                    />
                                )
                        )
                            : (
                                <ButtonCustom
                                    size='medium'
                                    accessoryLeft={CheckIcon}
                                    onPress={this.OnCheckAnswer}
                                    text={LANG.HOME.PART_ONE.CHECK_ANSWER}
                                />
                            )
                    }
                </View>
                <Modal
                    visible={showModal}
                    backdropStyle={PartOneStyles.backdrop}
                >
                    <Card disabled={true}>
                        <Text style={PartOneStyles.textModal}>{LANG.HOME.PART_ONE.ARE_YOU_READY}</Text>
                        <View style={PartOneStyles.wrapBtn}>
                            <ButtonCustom
                                size='medium'
                                onPress={this.setShowModal}
                                text={LANG.HOME.PART_ONE.READY}
                            />
                        </View>
                    </Card>
                </Modal>
            </View>
        );
    }
}

export default PartOneComponent;
