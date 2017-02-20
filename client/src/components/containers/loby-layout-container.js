import React from 'react';
import { connect } from 'react-redux';
import LobyLayout from '../layouts/loby/loby-layout';

const mapStateToProps = function(state) {
  return {
    userData: state.userState.userData,
  };
};

export default connect(mapStateToProps)(LobyLayout);
