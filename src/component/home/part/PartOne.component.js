import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
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
import PartStorage from '../../../storage/part.storage';
import { translateApi } from '../../../apiCaller/api';
import translateIcon from '../../../../assets/icon/translate.png';

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
            data: [],
            question: {},
            countQuestion: 1,
            totalQuestion: 0,
            isShowDes: false,
            scrore: 0,
            isStop: false,
            translate: {
                0: null,
                1: null,
                2: null,
                3: null
            }
        };
        this.getData = true;
    }

    UNSAFE_componentWillMount() {
        // const { data } = this.props;
        // const { countQuestion, progressQuestion } = this.state;
        // const totalQuestion = data.length;
        // const question = data[countQuestion - 1];
        // let newProgressQuestion = progressQuestion + (100 / totalQuestion);
        // this.setState({ question, progressQuestion: newProgressQuestion, totalQuestion, data });
    }

    componentWillReceiveProps(nextProps) {
        const { data } = nextProps;
        if (data.length && this.getData) {
            this.handleGetData(data);
        }
    }

    handleGetData = (data) => {
        const { countQuestion, progressQuestion } = this.state;
        const totalQuestion = data.length;
        const question = data[countQuestion - 1];
        let newProgressQuestion = progressQuestion + (100 / totalQuestion);
        this.getData = false;
        this.setState({ question, progressQuestion: newProgressQuestion, totalQuestion, data });
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

    handleTranslate = async (text, quetionIndex) => {
        const { result } = await translateApi(`translate/single/${text}`);
        const { translate } = this.state;
        const newTranslate = {
            ...translate,
            [quetionIndex]: result
        }
        this.setState({ translate: newTranslate });
    }

    renderAnswerDes = () => {
        const { question: { answers = [] } = {}, selectedAnswer, translate } = this.state;
        return answers.length && answers.map((ans, index) => {
            const { content = '', answer_id = '', correct } = ans;
            const isAnswerCorrect = correct === '1';
            const isAnswerSelectedInCorrect = !isAnswerCorrect && selectedAnswer === index;
            return (
                <View key={answer_id}>
                    <View style={PartOneStyles.wrapDesText}>
                        <Text style={[PartOneStyles.keyQuestion, isAnswerSelectedInCorrect && PartOneStyles.inCorrectQuestion, isAnswerCorrect && PartOneStyles.correctQuestion]}>{`Câu ${optionAnswer[index]}: `}</Text>
                        <Text style={[PartOneStyles.valueQuestion, isAnswerSelectedInCorrect && PartOneStyles.inCorrectQuestion, isAnswerCorrect && PartOneStyles.correctQuestion]}>{content}</Text>
                        <TouchableOpacity onPress={() => this.handleTranslate(content, index)}>
                            <Image source={translateIcon} style={PartOneStyles.transIcon} />
                        </TouchableOpacity>
                    </View>
                    {
                        translate[index] && <View style={PartOneStyles.wrapTranslateText}>
                            <Text style={PartOneStyles.keyTranslate}>{`Dịch ${optionAnswer[index]}: `}</Text>
                            <Text style={PartOneStyles.valueTranslate}>{translate[index]}</Text>
                        </View>
                    }
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

    OnCheckAnswer = async () => {
        let { question: { answers = [], question_id = '', level = 1 } = {}, selectedAnswer, scrore } = this.state;
        const indexCorrect = answers.findIndex(ans => ans.correct === '1');
        const isCorrect = indexCorrect === selectedAnswer;
        const newScore = isCorrect ? scrore += 10 : scrore;
        this.handleSaveQuestionId(question_id, level);
        clearInterval(this.timer);
        this.setState({
            isShowDes: true,
            isPlay: false,
            scrore: newScore,
            isStop: true
        });
    }

    handleSaveQuestionId = async (question_id, level) => {
        const PartStorageInfo = await PartStorage.getPartOneInfo() || [];
        const data = {
            level,
            question_id
        }
        const newPartStorage = [...PartStorageInfo, data];
        PartStorage.setPartOneInfo(newPartStorage);
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
            selectedAnswer: 0,
            progressQuestion: newProgressQuestion,
            isPlay: true,
            progressTimer: 0,
            timeOfQuestionState: timeOfQuestion,
            isStop: false,
            translate: {
                0: null,
                1: null,
                2: null,
                3: null
            }
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
            question: { images = '', audio = '' } = {},
            isShowDes,
            progressQuestion,
            isStop
        } = this.state;
        return (
            <View style={PartOneStyles.container}>
                <PartHeader
                    progressQuestion={progressQuestion}
                    countQuestion={countQuestion}
                    totalQuestion={totalQuestion}
                    timeOfQuestionState={timeOfQuestionState}
                    progressTimer={progressTimer}

                />
                <View style={PartOneStyles.imagePartOne}>
                    <Image source={{ uri: images }} style={PartOneStyles.image} />
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
                                    style={PartOneStyles.btnBottom}
                                />
                            )
                                : (
                                    <ButtonCustom
                                        size='medium'
                                        accessoryRight={NextIcon}
                                        onPress={this.onNextQuestion}
                                        text={LANG.HOME.PART_ONE.NEXT_QUESTION}
                                        style={PartOneStyles.btnBottom}
                                    />
                                )
                        )
                            : (
                                <ButtonCustom
                                    size='medium'
                                    accessoryLeft={CheckIcon}
                                    onPress={this.OnCheckAnswer}
                                    text={LANG.HOME.PART_ONE.CHECK_ANSWER}
                                    style={PartOneStyles.btnBottom}
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
