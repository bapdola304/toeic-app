import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { HeaderNavigation } from '../../component/common/TopNavigation';
import PartDetailComponent from '../../component/home/PartDetail.component';
import LANG from '../../language/vi';

class PartDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const partType = this.props.route.params['partType'];
    return (
      <>
        <HeaderNavigation {...this.props} title = {LANG.COMMON_TEXT[partType]}/>
        <PartDetailComponent {...this.props}/>
      </>
    );
  }
}

export default PartDetailScreen;

