import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Radio, RadioGroup, Card, Modal } from '@ui-kitten/components';
import AudioPlayer from '../../common/AudioPlayer';
import { CheckIcon, NextIcon, FinishIcon } from '../../common/Icon';
import { optionAnswer } from '../../../util/common';
import LANG from '../../../language/vi';
import { PartOneStyles } from '../style/PartOne.style';
import ButtonCustom from '../../common/ButtonCustom';
import { HOME_NAV } from '../../../util/navigationName';
import { part1 } from '../../../util/mock_data';
import PartHeader from '../../common/PartHeader';

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
            showModal: false,
            data: part1,
            question: {},
            countQuestion: 1,
            totalQuestion: part1.length,
            isShowDes: false,
            scrore: 0,
            isStop: false,
        };
    }

    UNSAFE_componentWillMount() {
        const { countQuestion, progressQuestion, totalQuestion } = this.state;
        const question = part1[countQuestion - 1];
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
        const question = part1[countQuestionTemp - 1];
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
                <PartHeader
                    progressQuestion = {progressQuestion}
                    countQuestion = {countQuestion}
                    totalQuestion = {totalQuestion}
                    timeOfQuestionState = {timeOfQuestionState}
                    progressTimer = {progressTimer}

                 />
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
