import React, { Component } from 'react';
import { Dimensions, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Colors } from '../../util/colors'
import Icon from 'react-native-vector-icons/Feather';
import { PartListStyles } from './style/partList.style';
import { PartOneStyles } from '../home/style/PartOne.style';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { levelPart } from '../../util/optionList';
import PartStorage from '../../storage/part.storage';
import { PART_TYPE, PART_API } from '../../util/constant';
import { apiCommon } from '../../apiCaller/api';

const barWidth = Dimensions.get('screen').width/1.5;

class PartList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countPartData: {
                1: 0,
                2: 0,
                3: 0
            },
            countPartFinished: {
                1: 0,
                2: 0,
                3: 0
            }
        };
    }

    async componentDidMount() {
        const { partType } = this.props;
        const countPartData = await apiCommon(`${PART_API[partType]}/count/data`);
        const PartStorageInfo = await PartStorage.getPartOneInfo() || [];
        const level1 = PartStorageInfo.filter(data => data.level == 1);
        const level2 = PartStorageInfo.filter(data => data.level == 2);
        const level3 = PartStorageInfo.filter(data => data.level == 3);
        const countPartFinished = {
            1: level1.length,
            2: level2.length,
            3: level3.length
        }
        this.setState({ countPartData, countPartFinished });
    }

    render() {
        const { partDes: { title = '', des = '' } = {} } = this.props;
        const { countPartData, countPartFinished } = this.state;
        return (
            <View style={PartListStyles.container}>
                <ScrollView>
                    <View style={{ padding: 10 }}>
                        <Text style={PartListStyles.heading}>{title}</Text>
                        <Text style={PartListStyles.des}>{des}</Text>
                        <View style={PartListStyles.list}>
                            {levelPart.map(item => {
                                const total = countPartData[item.level];
                                const finished = countPartFinished[item.level];
                                const value =  (finished/total)*100;
                                return (
                                    <View style={PartListStyles.item} key={item.id}>
                                        <Text style={PartListStyles.numHead}>{'0' + item.id}</Text>
                                        <View style={PartListStyles.itemBody}>
                                            <Text style={PartListStyles.itemTitle}>{item.title}</Text>
                                            <View style={{width: '60%', marginTop: 10}}>
                                                <ProgressBarAnimated
                                                    width={barWidth}
                                                    value={value ? value : 0}
                                                    backgroundColorOnComplete={Colors.primaryColor}
                                                    backgroundColor={Colors.primaryColor}
                                                    height={20}
                                                    borderRadius={10}
                                                    borderColor={Colors.primaryColor}
                                                />
                                                <Text style={PartOneStyles.numberOfQuestion}>{`${finished}/${total}`}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={PartListStyles.itemPlayButton} onPress={() => this.props.onPress(item)}>
                                            <Icon
                                                name={'play'}
                                                size={24}
                                                color={"#ffffff"}
                                                fill
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View style={PartListStyles.bottomContainer}>

                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default PartList;
