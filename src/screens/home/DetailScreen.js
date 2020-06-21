import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { HeaderNavigation } from '../../component/common/TopNavigation';

class DetailScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <HeaderNavigation navigation = {this.props.navigation}/>
        <Text>Detail</Text>
      </>
    );
  }
}

export default DetailScreen;

