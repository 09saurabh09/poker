import React from 'react';
//import './login.scss';

import * as userApi from '../../../api/user-api';
import Svg from '../svg/svg.jsx';

import PlayIcon from '../../../../assets/img/home/svg/yoga-play.svg';
import LoginIcon from '../../../../assets/img/home/svg/login-button.svg';
import io from 'socket.io-client';



export default class Login extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      email: '',
      password: ''
    };
	}
  componentDidMount() {
    $(document).ready(()=>{
      var modal = document.getElementById('login');

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = 'none';
          }
      }
    })
  }
  onEmailChange(event) {
    this.setState({
      email: event.target.value
    })
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  login() {
    userApi.login(this.state.email, this.state.password).then((data)=>{
      if(data.status == 200) {
        let token = data.data.data.token;
        localStorage.setItem('userToken', token);
        var modal = document.getElementById('login');
        modal.style.display = 'none';
        this.props.postLogin();
      }
    });
  }

  signup() {
    userApi.signup(this.state.email, this.state.password).then((data)=>{
      if(data.status == 200) {
        var modal = document.getElementById('login');
        modal.style.display = 'none';
      }
    });
  }



	render() {
		return (
			<div className="modal fade-scale" id="login" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="vertical-alignment-helper">
            <div className="modal-dialog vertical-align-center">
                <div id="login-content" className="modal-content">
                    <div className="modal-body">
                      <div className="modal-container">
                        {/*<div className="play-icon-container"><PlayIcon /></div>*/}
                        <div className="play-icon-container">
                          {/*<div className="play-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${PlayIcon})`}}></div>*/}
                          <Svg markup={PlayIcon} className="play-icon-wrapper icon-wrapper"/>
                        </div>
                        <form className="form-horizontal form-container">
                          <div className="form-group">
                            <label htmlFor="inputUsername" className="sr-only">User name</label>
                            <div className="">
                              <input autoComplete="off" type="email" className="form-control" id="inputUsername" placeholder="User name" 
                              value={this.state.email} onChange={this.onEmailChange.bind(this)}/>
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <div className="password-container">
                              <input type="password" className="form-control" id="inputPassword" placeholder="Password" 
                              value={this.state.password} onChange={this.onPasswordChange.bind(this)}/>
                              <div className="login-button" onClick={this.login.bind(this)}>
                                <div className="login-icon-container">
                                  <Svg markup={LoginIcon} className="login-icon-wrapper icon-wrapper" />
                                  {/*<div className="login-icon-wrapper icon-wrapper" 
                                    style={{backgroundImage: `url(${LoginIcon})`}}>
                                  </div>*/}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group bottom-button-container">
                            <div className="sign-up-button-container" onClick={this.signup.bind(this)}>
                              <button id="sign-up" type="button" className="btn btn-block" data-dismiss="modal">Sign up</button>  
                            </div>
                            <div className="facebook-login-button-container">
                              <button id="facebook-login" type="button" className="btn btn-block">Facebook login</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
		)
	}
}