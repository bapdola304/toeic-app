import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Colors } from '../../util/colors'
import Icon from 'react-native-vector-icons/Feather';

const data = [{
    id: '1',
    title: 'Level 250 - 500',
    time: 'Part 1'
},
{
    id: '2',
    title: 'Level 500 - 750',
    time: 'Part 1'
},
{
    id: '3',
    title: 'Level 750 - 990',
    time: 'Part 1'
}

]

class PartList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ padding: 10 }}>
                    <Text style={styles.heading}>TOEIC Listening Part 1</Text>
                    <Text style={styles.des}>là nội dung nhìn tranh và miêu tả. Phần này gồm 10 bức tranh (đề mới: 6 bức tranh), mỗi bức tranh sẽ có 4 câu mô tả không được in trong đề. Nhiệm vụ của các bạn là nghe và chọn đáp án mô tả đúng bức tranh nhất.</Text>
                    <ScrollView style={styles.list}>
                        {data.map(item => {
                            return (
                                <View style={styles.item}>
                                    <Text style={styles.numHead}>{'0' + item.id}</Text>
                                    <View style={styles.itemBody}>
                                        <Text style={styles.itemTime}>{item.time}</Text>
                                        <Text style={styles.itemTitle}>{item.title}</Text>
                                    </View>
                                    <View style={styles.itemPlayButton}>
                                        <Icon
                                            name={'play'}
                                            size={24}
                                            color={"#ffffff"}
                                            fill
                                        />
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
                <View style={styles.bottomContainer}>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // padding: 10,
        paddingTop: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        shadowColor: '#000',
        flex: 1
    },
    item: {
        flexDirection: 'row',
        paddingVertical: 10,

    },
    list: {
        marginTop: 20,
    },
    itemBody: {
        flex: 1,
        paddingHorizontal: 20
    },
    numHead: {
        fontSize: 20,
        fontWeight: '500',
        color: Colors.gray
    },
    itemTime: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.gray
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.black
    },
    itemPlayButton: {
        backgroundColor: Colors.green,
        width: 40,
        aspectRatio: 1,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    bottomContainer: {
        marginTop: 30,
        flexDirection: 'row',
        padding: 10,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        shadowColor: '#000',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    bag: {
        // width: 40,
        // height: 30,
        padding: 8,
        paddingHorizontal: 20,
        borderRadius: 40,
        backgroundColor: Colors.pink
    },
    btnBuy: {
        backgroundColor: Colors.blue,
        flex: 1,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleBuy: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff",
        textAlign: 'center'
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.black
    },
    des: {
        fontSize: 18,
        color: Colors.black
    }

})

export default PartList;
