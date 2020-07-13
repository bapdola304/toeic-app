import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { MenuBarIcon } from '../../component/common/Icon';
import testIcon from '../../../assets/menu/write.png';
import tipsIcon from '../../../assets/menu/tips.png';
import { prepare, additionalKnowledge } from '../../util/menuConfig';

const { width, height } = Dimensions.get("window")

class MainHomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderMenuPrepare = () => {
        return prepare.map(item => {
            return (
                <View style={styles.wrapItemHeader} key={item.id}>
                    <Image source={item.icon} style={styles.menuIconSize} />
                    <Text>{item.text}</Text>
                </View>
            )
        })
    }

    renderAdditionalKnowledge = () => {
        return additionalKnowledge.map(item => {
            return (
                <View style={styles.wrapItemHeader} key={item.id}>
                    <Image source={item.icon} style={styles.menuIconSize} />
                    <Text>{item.text}</Text>
                </View>
            )
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={{}}>
                        <MenuBarIcon
                            fill="#ffffff"
                            style={styles.sizeIcon}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 26 }}>Hi, Hung Ngo!</Text>
                        </View>
                        <View>
                            <Image source={{ uri: 'https://noiswebsite.blob.core.windows.net/images/avatar_null.png' }} style={{ width: 50, height: 50 }} />
                        </View>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#65C8D0' }} />
                    <View style={{ flex: 1, backgroundColor: 'white', borderTopRightRadius: 75 }} >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 60, position: 'absolute', top: -35 }}>
                            <View style={styles.wrapItemHeader}>
                                <Image source={testIcon} style={styles.menuIconSize} />
                                <Text>Luyện tập Toeic</Text>
                            </View>
                            <View style={styles.wrapItemHeader}>
                                <Image source={tipsIcon} style={styles.menuIconSize} />
                                <Text>Mẹo thi</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 60 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, paddingHorizontal: 10, marginBottom: -10 }}>Ôn luyện</Text>
                            <View style={{ marginTop: 10, flexDirection: 'row', paddingHorizontal: 16, justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                {this.renderMenuPrepare()}
                            </View>
                        </View>
                        <View style={{ marginTop: 20, }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, paddingHorizontal: 10, marginBottom: -10 }}>Kiến thức bổ sung</Text>
                            <View style={{ marginTop: 10, flexDirection: 'row', paddingHorizontal: 16, justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                {this.renderAdditionalKnowledge()}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    top: {
        height: '25%',
        backgroundColor: '#65C8D0',
        borderBottomLeftRadius: 75,
        flexDirection: 'column',
        justifyContent: 'space-between',
        // alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    bottom: {
        flex: 1,
        height: '75%'
    },
    sizeIcon: {
        width: 24,
        height: 24,
        transform: [{ rotate: '-90deg' }]
    },
    wrapItemHeader: {
        width: '47%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 10,
        borderRadius: 15,
        borderColor: '#fff',
        borderBottomWidth: 0,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#ffffff',
        marginTop: 10
    },
    menuIconSize: {
        width: 32,
        height: 32
    }
});

export default MainHomeComponent;
