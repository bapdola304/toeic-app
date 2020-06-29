import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Colors } from '../../util/colors';
import LANG from '../../language/vi';
import ButtonCustom from '../common/ButtonCustom';
import { HOME_NAV } from '../../util/navigationName';

class ResultComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onGoHome = () => {
        this.props.navigation.navigate(HOME_NAV.HOME);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapResultText}>
                    <Text style={styles.resultText}>Kết quả phần thi Part 1</Text>
                </View>
                <View style={styles.wrapContent}>
                    <View style={styles.circleProcess}>
                        <AnimatedCircularProgress
                            size={250}
                            width={30}
                            fill={80}
                            tintColor={'#00C139'}
                            onAnimationComplete={() => console.log('onAnimationComplete')}
                            backgroundColor="#3d5875"
                            duration={2000}
                        >
                            {
                                (fill) => (
                                    <View style={styles.wrapScore}>
                                        <Text style={styles.keyScore}>{LANG.HOME.PART_ONE.SCORE}</Text>
                                        <Text style={styles.valueScore}>{80}</Text>
                                    </View>
                                )
                            }
                        </AnimatedCircularProgress>
                    </View>
                    <View style={styles.wrapTextNotify}>
                        <Text style={styles.textNotify}>Bạn đã làm đúng 8/10 câu</Text>
                        <Text style={styles.textNotify}>Lần sau cố gắng hơn nhé</Text>
                    </View>
                    <View style={styles.btnGoHome}>
                        <ButtonCustom
                            size='medium'
                            onPress={this.onGoHome}
                            text={' Về trang chủ'}
                            color='#00C139'
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapResultText: {
        height: '40%',
        backgroundColor: '#65C8D0',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    resultText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: '10%'
    },
    wrapContent: {
        height: '82%',
        backgroundColor: '#E6EE9B',
        borderTopLeftRadius: 250,
        borderTopRightRadius: 250,
        top: '-22%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    circleProcess: {
        marginTop: '10%'
    },
    wrapScore: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    keyScore: { fontSize: 30 },
    valueScore: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    wrapTextNotify: {
        marginTop: '10%'
    },
    textNotify: {
        fontSize: 20, textAlign: 'center'
    },
    btnGoHome: {
        width: '80%',
        marginTop: '5%'
    }
})

export default ResultComponent;
