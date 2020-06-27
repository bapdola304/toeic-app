import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { MenuStyles } from './style/menu.style';
import { menuList } from '../../util/optionList';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={MenuStyles.container}>
                <View style={MenuStyles.header}>
                    <Text style={MenuStyles.title}>Basic Test</Text>
                </View>
                <ScrollView>
                    <View style={MenuStyles.containerList}>
                        <View>
                            {
                                menuList.map((item, index) => {
                                    if (index % 2 == 0) {
                                        return (
                                            <View style={[MenuStyles.item]} key={item.id}>
                                                <TouchableOpacity style={[MenuStyles.itemBtn]} onPress={this.props.onPress}>
                                                    <View style={MenuStyles.imageBtn} source={item.image}>
                                                        <Text style={MenuStyles.itemTitle}>{item.title}</Text>
                                                        <Text style={MenuStyles.itemDesc}>{item.type} Course</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }
                                    return null

                                })
                            }
                        </View>
                        <View>
                            {
                                menuList.map((item, index) => {
                                    if (index % 2 == 1) {
                                        return (
                                            <View style={[MenuStyles.item]} key = {item.id}>
                                                <TouchableOpacity style={[MenuStyles.itemBtn, { minHeight: 200 }]}>
                                                    <View style={MenuStyles.imageBtn} source={item.image}>
                                                        <Text style={MenuStyles.itemTitle}>{item.title}</Text>
                                                        <Text style={MenuStyles.itemDesc}>{item.type} Course</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )
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
