import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Colors } from '../../util/colors'
import Icon from 'react-native-vector-icons/Feather';
import { PartListStyles } from './style/partList.style';

const data = [{
    id: '1',
    title: 'Level 250 - 500',
    time: 'Part 1',
    level: 1
},
{
    id: '2',
    title: 'Level 500 - 750',
    time: 'Part 1',
    level: 2
},
{
    id: '3',
    title: 'Level 750 - 990',
    time: 'Part 1',
    level: 3
}

]

class PartList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { partDes: { title = '', des = '' } = {} } = this.props;
        return (
            <View style={PartListStyles.container}>
                <View style={{ padding: 10 }}>
                    <Text style={PartListStyles.heading}>{title}</Text>
                    <Text style={PartListStyles.des}>{des}</Text>
                    <ScrollView style={PartListStyles.list}>
                        {data.map(item => {
                            return (
                                <View style={PartListStyles.item} key={item.id}>
                                    <Text style={PartListStyles.numHead}>{'0' + item.id}</Text>
                                    <View style={PartListStyles.itemBody}>
                                        <Text style={PartListStyles.itemTime}>{item.time}</Text>
                                        <Text style={PartListStyles.itemTitle}>{item.title}</Text>
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
                    </ScrollView>
                </View>
                <View style={PartListStyles.bottomContainer}>

                </View>
            </View>
        );
    }
}

export default PartList;
