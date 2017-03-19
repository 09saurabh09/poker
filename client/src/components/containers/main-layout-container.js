import React from 'react';
import { connect } from 'react-redux';
import * as userApi from '../../api/user-api';
const aspectRatio = 1.651376146788991;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(userApi.getUserInfo('small'));
    $('document').ready(()=>{
      $('#dp-container').height($('#dp-container').width());  
      $(window).resize(function() {
        if($('.app').height() * aspectRatio  < $('.app').width()) {
          console.log('correcting width');
          console.log('previous width:: ', $('.app').width());
          console.log('next width:: ', $('.app').height() * aspectRatio);
          $('.app').width($('.app').height() * aspectRatio);
        } else if($('.app').height() * aspectRatio  > $('.app').width()) {
          console.log('correcting height');
          console.log('previous height:: ', $('.app').height());
          console.log('next height:: ', $('.app').width() / aspectRatio);
          $('.app').height($('.app').width() / aspectRatio);
        } else {
          console.log('achieved ratio');
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