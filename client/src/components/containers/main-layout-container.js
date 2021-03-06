import React from 'react';
import { connect } from 'react-redux';
import * as userApi from '../../api/user-api';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let self = this;
    this.props.dispatch(userApi.getUserInfo('small'));
    $('document').ready(()=>{
      const aspectRatio = $(window).width()/ $(window).height();
      let initialHeight = $(window).height();
      let initialWidth = $(window).width();
      $('#root').height('100vh');
      $('#dp-container').height($('#dp-container').width());  
      $(window).resize(function(event) {
        if(!self.props.params.playAction && event.eventPhase && initialHeight > $(window).height()) {
          $('#root').css('maxWidth', '161vh');
        } else if(!self.props.params.playAction && event.eventPhase && initialWidth > $(window).width()) {
          $('#root').css('height', '51.25vw');
        }
      }).resize();
    });
  }

  render() {
    return (
      <div className="app">
        {this.props.children}
      </div> 
    )
  }
}

const mapStateToProps = function(state) {
  return {
    userData: state.userState.userData
  };
};

export default connect(mapStateToProps)(App);