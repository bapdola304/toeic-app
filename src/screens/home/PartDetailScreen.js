import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { HeaderNavigation } from '../../component/common/TopNavigation';
import PartDetailComponent from '../../component/home/PartDetail.component';

class PartDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <HeaderNavigation {...this.props}/>
        <PartDetailComponent {...this.props}/>
      </>
    );
  }
}

export default PartDetailScreen;

