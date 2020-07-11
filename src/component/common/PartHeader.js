import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { PartOneStyles } from '../home/style/PartOne.style';
import LANG from '../../language/vi';
import { Colors } from '../../util/colors';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const barWidth = Dimensions.get('screen').width - 120;

const PartHeader = ({ countQuestion, totalQuestion, timeOfQuestionState, progressQuestion, progressTimer }) => (
    <View style={PartOneStyles.header}>
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
        <View style={PartOneStyles.wrapTime}>
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
        </View>
    </View>
);

export default PartHeader;
