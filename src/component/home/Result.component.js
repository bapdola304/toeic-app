import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Colors } from '../../util/colors';
import LANG from '../../language/vi';
import ButtonCustom from '../common/ButtonCustom';
import { HOME_NAV } from '../../util/navigationName';
import { ResultStyles } from './style/Result.style';

class ResultComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            totalQuestion: 0,
            questionFinshed: 0,
            partType: 'P1',
            processState: 0,
            isFinish: false
        };
    }

    componentDidMount() {
        const data = this.props.route.params['result'];
        console.log('data', data);
        const { totalQuestion, partType, scrore } = data;
        const questionFinshed = scrore / 10;
        let processState = ((questionFinshed / totalQuestion) * 100);
        const isFinish = questionFinshed === totalQuestion;
        this.setState({
            scrore,
            partType,
            totalQuestion,
            questionFinshed,
            processState,
            isFinish
        })
    }

    onGoHome = () => {
        this.props.navigation.navigate(HOME_NAV.HOME);
    }

    renderMessage = () => {
        const {
            totalQuestion,
            questionFinshed
        } = this.state;
        return `Bạn đã làm đúng ${questionFinshed}/${totalQuestion} câu`
    }

    render() {
        const {
            scrore,
            partType,
            processState,
            isFinish
        } = this.state;
        return (
            <View style={ResultStyles.container}>
                <View style={ResultStyles.wrapResultText}>
                    <Text style={ResultStyles.resultText}>{`${LANG.HOME.RESULT.RESULT_TEXT} ${LANG.COMMON_TEXT[partType]}`}</Text>
                </View>
                <View style={ResultStyles.wrapContent}>
                    <View style={ResultStyles.circleProcess}>
                        <AnimatedCircularProgress
                            size={250}
                            width={30}
                            fill={processState}
                            tintColor='#00C139'
                            backgroundColor='#3d5875'
                            duration={3000}
                        >
                            {
                                (fill) => (
                                    <View style={ResultStyles.wrapScore}>
                                        <Text style={ResultStyles.keyScore}>{LANG.HOME.PART_ONE.SCORE}</Text>
                                        <Text style={ResultStyles.valueScore}>{scrore}</Text>
                                    </View>
                                )
                            }
                        </AnimatedCircularProgress>
                    </View>
                    <View style={ResultStyles.wrapTextNotify}>
                        <Text style={ResultStyles.textNotify}>{this.renderMessage()}</Text>
                        <Text style={ResultStyles.textNotify}>{isFinish ? LANG.HOME.RESULT.CONGRATULATION : LANG.HOME.RESULT.TRY_HARDER}</Text>
                    </View>
                    <View style={ResultStyles.btnGoHome}>
                        <ButtonCustom
                            size='medium'
                            onPress={this.onGoHome}
                            text={LANG.HOME.RESULT.GO_HOME}
                            color='#00C139'
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default ResultComponent;
