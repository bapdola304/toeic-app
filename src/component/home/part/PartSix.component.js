import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { Radio, RadioGroup, Card, Modal } from '@ui-kitten/components';
import AudioPlayer from '../../common/AudioPlayer';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { CheckIcon, NextIcon, FinishIcon } from '../../common/Icon';
import { optionAnswer } from '../../../util/common';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import LANG from '../../../language/vi';
import { Colors } from '../../../util/colors';
import { PartOneStyles } from '../style/PartOne.style';
import ButtonCustom from '../../common/ButtonCustom';
import { HOME_NAV } from '../../../util/navigationName';
import { PartTwoStyles } from '../style/partTwo.style';
import { PartThreeStyles } from '../style/partThree.style';
import { PartFiveStyles } from '../style/partFive.style';
import { PartSixStyles } from '../style/partSix.style';

const barWidth = Dimensions.get('screen').width - 30;
const timeOfQuestion = 90;

class PartSixComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressQuestion: 0,
            selectedAnswer: {
                1: 0,
                2: 0,
                3: 0,
            },
            progressTimer: 0,
            timeOfQuestionState: timeOfQuestion,
            showModal: false,
            data: [],
            question: {},
            countQuestion: 1,
            totalQuestion: 0,
            isShowDes: false,
            scrore: 0,
        };
    }

    componentWillMount() {
        const { data } = this.props;
        const totalQuestion = data.length;
        const { countQuestion, progressQuestion } = this.state;
        const question = data[countQuestion - 1];
        let newProgressQuestion = progressQuestion + (100 / totalQuestion);
        this.setState({ question, progressQuestion: newProgressQuestion, data, totalQuestion });
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

    renderRadioButtonAnswer = (questionListItem, questionIndexSelected) => {
        const { selectedAnswer, isShowDes } = this.state;
        return questionListItem.map((question, index) => {
            const { content = '', correct = '0' } = question;
            const isAnswerCorrect = correct === '1';
            const isAnswerSelectedInCorrect = !isAnswerCorrect && selectedAnswer[questionIndexSelected] === index;
            return (
                <Radio style={PartThreeStyles.radioButton} status='control' key={index} disabled={isShowDes}>
                    <Text
                        style={
                            [
                                PartOneStyles.textAnswer,
                                selectedAnswer[questionIndexSelected] === index && PartOneStyles.textAnswerSelected,
                                isShowDes && isAnswerCorrect && PartThreeStyles.correctQuestion,
                                isShowDes && isAnswerSelectedInCorrect && PartOneStyles.inCorrectQuestion
                            ]
                        }
                    >
                        {`(${optionAnswer[index]}): ${content}`}
                    </Text>
                </Radio>
            )
        })
    }

    setSelectedIndex = (index, quetionIndex) => {
        const { selectedAnswer } = this.state;
        const newSelectedAnswer = {
            ...selectedAnswer,
            [quetionIndex]: index
        }
        this.setState({ selectedAnswer: newSelectedAnswer });
    }

    setShowModal = () => {
        this.countDown();
        this.setState((prevState) => ({ showModal: !prevState.showModal }));
    }

    OnCheckAnswer = () => {
        let { question: { answers = [] }, selectedAnswer, scrore } = this.state;
        const checkScore = answers.map((item, index) => {
            const questionList = item.slice(1, 5);
            const indexCorrect = questionList.findIndex(ans => ans.correct === '1');
            return selectedAnswer[index + 1] === indexCorrect;
        });
        const score = checkScore.filter(item => item === true );
        const newScore = scrore += (score.length * 10);
        clearInterval(this.timer);
        this.setState({
            isShowDes: true,
            scrore: newScore,
        });
    }

    onNextQuestion = () => {
        let { countQuestion, progressQuestion, totalQuestion, data } = this.state;
        const countQuestionTemp = countQuestion += 1;
        const question = data[countQuestionTemp - 1];
        let newProgressQuestion = progressQuestion + (100 / totalQuestion);
        this.setState({
            question,
            countQuestion: countQuestionTemp,
            isShowDes: false,
            selectedAnswer: {
                1: 0,
                2: 0,
                3: 0,
            },
            progressQuestion: newProgressQuestion,
            progressTimer: 0,
            timeOfQuestionState: timeOfQuestion,
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

    renderQuestion = () => {
        const { question: { answers = [] }, selectedAnswer } = this.state;
        return answers.map((question, quetionIndex) => {
            const questionListItem = question.slice(1, 5);
            const questionIndexSelected = quetionIndex + 1;
            return (
                <View style={{ paddingHorizontal: 8, marginTop: 10 }}>
                    <View>
                        <Text style={PartThreeStyles.questionText}>{`${LANG.HOME.PART_ONE.OPTION} ${quetionIndex + 1}`}</Text>
                    </View>
                    <View>
                        <RadioGroup
                            selectedIndex={selectedAnswer[questionIndexSelected]}
                            onChange={index => this.setSelectedIndex(index, questionIndexSelected)}
                            style={PartTwoStyles.groupRadio}
                        >
                            {this.renderRadioButtonAnswer(questionListItem, questionIndexSelected)}
                        </RadioGroup>
                    </View>
                </View>
            )
        })
    }

    renderParagraph = () => {
        const { question: { answers = [], conversation = '' } = {} } = this.state;
        console.log('conversation', conversation);
        
        return (
            <View>
                <Text style={PartThreeStyles.questionText}>{conversation}</Text>
            </View>
        )
    }

    render() {
        const {
            progressTimer,
            timeOfQuestionState,
            showModal,
            countQuestion,
            totalQuestion,
            isShowDes,
            progressQuestion,
            scrore,
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
                        // onAnimationComplete={() => console.log('onAnimationComplete')}
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
                <View style={PartSixStyles.paragraph}>
                    <ScrollView>
                        {this.renderParagraph()}
                    </ScrollView>
                </View>
                <View style={PartSixStyles.wrapAnswer}>
                    <ScrollView>
                        {this.renderQuestion()}
                    </ScrollView>
                </View>
                <View style={PartOneStyles.wrapBtnCheck}>
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

export default PartSixComponent;
