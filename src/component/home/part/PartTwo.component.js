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
import partTwoImage from '../../../../assets/images/part2_detai.jpg'
import { part2 } from '../../../util/mock_data';
import { PartTwoStyles } from '../style/partTwo.style';
import PartHeader from '../../common/PartHeader';

const timeOfQuestion = 90;

class PartTwoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressQuestion: 0,
            selectedAnswer: 0,
            progressTimer: 0,
            timeOfQuestionState: timeOfQuestion,
            isPlay: false,
            showModal: true,
            data: part2,
            question: {},
            countQuestion: 1,
            totalQuestion: part2.length,
            isShowDes: false,
            scrore: 0,
            isStop: false,
        };
    }

    UNSAFE_componentWillMount() {
        const { countQuestion, progressQuestion, totalQuestion } = this.state;
        const question = part2[countQuestion - 1];
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
        const optionAnswerPartTwo = optionAnswer.slice(0, 3);
        return optionAnswerPartTwo.map((item, index) => {
            return (
                <Radio style={PartTwoStyles.radioButton} status='control' key={item}>
                    <Text style={[PartOneStyles.textAnswer, selectedAnswer === index && PartOneStyles.textAnswerSelected]}>{`${LANG.HOME.PART_ONE.OPTION} ${item}`}</Text>
                </Radio>
            )
        })
    }

    renderAnswerDes = () => {
        const { question: { answers = [] }, selectedAnswer } = this.state;
        const answersParTwo = answers.slice(1, 4);
        return answersParTwo.map((ans, index) => {
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
        const answersParTwo = answers.slice(1, 4);
        const indexCorrect = answersParTwo.findIndex(ans => ans.correct === '1');
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
        const question = part2[countQuestionTemp - 1];
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
            partType: 'P2'
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
            question: { image = '', audio = '', answers = [] },
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
                    <Image source={partTwoImage} style={PartOneStyles.image} />
                </View>
                <View style={PartOneStyles.wrapAnswer}>
                    {
                        isShowDes ? (
                            <View style={PartOneStyles.wrapAnsDes}>
                                <View style={PartOneStyles.wrapDesText}>
                                    <Text style={[PartOneStyles.keyQuestion]}>{`Question: `}</Text>
                                    <Text style={[PartOneStyles.valueQuestion]}>{answers[0].content}</Text>
                                </View>
                                <ScrollView>
                                    {this.renderAnswerDes()}
                                </ScrollView>
                            </View>
                        )
                            : (
                                <RadioGroup
                                    selectedIndex={selectedAnswer}
                                    onChange={index => this.setSelectedIndex(index)}
                                    style={PartTwoStyles.groupRadio}
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

export default PartTwoComponent;
