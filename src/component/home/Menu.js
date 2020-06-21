import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Dimensions, ImageBackground, ScrollView } from 'react-native';
import { Colors } from '../../util/colors'
const W = Dimensions.get("window").width
const data = [
    {
        id: '1',
        title: 'Part 1',
        num: 17,
    },
    {
        id: '2',
        title: 'Part 2',
        num: 25,
    }
    ,
    {
        id: '3',
        title: 'Part 3',
        num: 13,
    },
    {
        id: '4',
        title: 'Part 4',
        num: 20,
    },
    {
        id: '5',
        title: 'Part 5',
        num: 25,
    }
    ,
    {
        id: '6',
        title: 'Part 6',
        num: 13,
    },
    {
        id: '7',
        title: 'Part 7',
        num: 20,
    }
]

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Basic Test</Text>
                </View>
                <ScrollView>
                    <View style={styles.containerList}>
                        <View>
                            {
                                data.map((item, index) => {
                                    if (index % 2 == 0) {
                                        return <View style={[styles.item]}>
                                            <TouchableOpacity style={[styles.itemBtn]} onPress = {this.props.onPress}>
                                                <View style={styles.imageBtn} source={item.image}>
                                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                                    <Text style={styles.itemDesc}>{item.num} Course</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    return null

                                })
                            }
                        </View>
                        <View>
                            {
                                data.map((item, index) => {
                                    if (index % 2 == 1) {
                                        return <View style={[styles.item]}>
                                            <TouchableOpacity style={[styles.itemBtn, { minHeight: 200 }]}>
                                                <View style={styles.imageBtn} source={item.image}>
                                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                                    <Text style={styles.itemDesc}>{item.num} Course</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    return null

                                })
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    more: {
        fontWeight: '500',
        color: Colors.blue
    },
    item: {
        // flex: 0.5,
        width: (W - 20)/2,
      
        padding: 10,
    },
    itemBtn: {
        backgroundColor: 'gray',
        borderRadius: 20,
        minHeight: 150,
        overflow: 'hidden'
    },
    imageBtn: {
        flex: 1,
        borderRadius: 20,
        padding: 20
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000000',
        marginLeft: 30
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    itemDesc: {
        color: Colors.gray,
        marginTop: 8
    },
    containerList: {
        flexDirection: 'row',
        
    }
})
