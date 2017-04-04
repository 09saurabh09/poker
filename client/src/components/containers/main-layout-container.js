import React from 'react';
import { connect } from 'react-redux';
import * as userApi from '../../api/user-api';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(userApi.getUserInfo('small'));
    $('document').ready(()=>{
      const aspectRatio = $(window).width()/ $(window).height();
      let initialHeight = $(window).height();
      let initialWidth = $(window).width();
      $('#dp-container').height($('#dp-container').width());  
      $(window).resize(function(event) {
        /*if($('#root').height() * aspectRatio  < $('#root').width()) {
          console.log('correcting width');
          console.log('previous width:: ', $('#root').width());
          console.log('next width:: ', $('#root').height() * aspectRatio);
          $('#root').width($('#root').height() * aspectRatio);
        } else if($('#root').height() * aspectRatio  > $('#root').width()) {
          console.log('correcting height');
          console.log('previous height:: ', $('#root').height());
          console.log('next height:: ', $('#root').width() / aspectRatio);
          $('#root').height($('#root').width() / aspectRatio);
        } else {
          console.log('achieved ratio');
        }*/
        if(event.eventPhase && initialHeight > $(window).height()) {
          $('#root').css('maxWidth', '161vh');
        } else {

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