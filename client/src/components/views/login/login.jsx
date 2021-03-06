import React from 'react';
//import './login.scss';

import * as userApi from '../../../api/user-api';
import utils from '../../../utils/utils';

const PlayIcon = '../../../../assets/img/home/svg/yoga-play.svg';
const LoginIcon = '../../../../assets/img/home/svg/login-button.svg';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      mobileNumber: '',
      otp: '',
      resendRemainingTime: 30,
      resendText: ''
    };
    this.expand = false;
	}
  componentDidMount() {
    $(document).ready(()=>{
      window.onclick = function(event) {
        if (event.target.classList.contains("modal")) {
          $('.modal').hide();
        }
      }
    })
  }

  onUserNameChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  onEmailChange(event) {
    this.setState({
      email: event.target.value
    })
  }

  onMobileChange(event) {
    this.setState({
      mobileNumber: event.target.value
    })
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  login() {
    this.props.dispatch(userApi.login(this.state.username, this.state.password))
    .then((data)=>{
      if(data.status == 200) {
        let token = data.data.data.token;
        localStorage.setItem('userToken', token);
        utils.closeModal('login');
        this.props.postLogin();
      }
    });
  }

  onOTPChange(event) {
    this.setState({
      otp: event.target.value
    })
  }

  sendOtp() {
    if(this.state.otp) {
      this.props.dispatch(userApi.signup({
        userName: this.state.username,
        email: this.state.email,
        password: this.state.password,
        mobileNumber: this.state.mobileNumber
      })).then((data)=>{
        if(data.status == 200) {
          utils.closeModal('login');
          let token = data.data.data.token;
          localStorage.setItem('userToken', token);
        }
      });
    } else {
      setTimeout(()=>{
        $('.mobile-container').toggle();
        this.resendTimer = setInterval(()=>{
          if(this.state.resendRemainingTime > 0) {
           this.setState({
            resendText: '',
            resendRemainingTime: this.state.resendRemainingTime - 1
           })
         } else {
          clearInterval(this.resendTimer);
          this.setState({
            resendText: 'Resend'
          })
         }
        }, 1000);
      }, 1000);
      $('.mobile-otp').toggleClass('show-otp');  
    }
    
  }

  componentWillUnmount() {
    clearInterval(this.resendTimer);
  }

  expandSignup() {
    $('#login .form-group').addClass('sign-up-form-group');
    $('#login .play-icon-container').addClass('sign-up-form-group');
    $('.forget-password').hide();
    $('.sign-up-form').animate({height:'8em', opacity: 1}, 1000);
    $('.sign-up-form').css('visibility', 'visible');
    $('.bottom-button-container').hide();  
  }

	render() {
		return (
			<div className="modal fade-scale" id="login" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div id="login-content" className="modal-content">
            <div className="modal-body">
              <div className="modal-container">
                <div className="play-icon-container">
                  <img src={PlayIcon} className="play-icon-wrapper icon-wrapper"/>
                </div>
                <form className="form-horizontal">
                  <div className="form-group">
                    <label htmlFor="inputUsername" className="sr-only">User name</label>
                    <div className="">
                      <input autoComplete="off" type="text" className="form-control" id="inputUsername" placeholder="User name" 
                      value={this.state.username} onChange={this.onUserNameChange.bind(this)}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <div className="login-action-container">
                      <input type="password" className="form-control" id="inputPassword" placeholder="Password" 
                      value={this.state.password} onChange={this.onPasswordChange.bind(this)}/>
                      <div className="login-action login-button" onClick={this.login.bind(this)}>
                        <div className="login-icon-container">
                          <img src={LoginIcon} className="login-icon-wrapper icon-wrapper" />
                        </div>
                      </div>
                    </div>
                    <div className="forget-password">
                      Forgot password?
                    </div>
                  </div>
                  <div className="sign-up-form">
                    <div className="form-group">
                      <label htmlFor="inputUserEmail" className="sr-only">Email Id</label>
                      <div className="">
                        <input autoComplete="off" type="email" className="form-control" id="inputUserEmail" placeholder="Email" 
                        value={this.state.email} onChange={this.onEmailChange.bind(this)}/>
                      </div>
                    </div>
                    <div className="form-group">
                      
                      <div className="login-action-container">
                        <div className="mobile-otp">
                          <div className="mobile-container">
                            <label htmlFor="inputUserPhone" className="sr-only">Phone Number</label>
                            <input autoComplete="off" type="number" className="form-control" id="inputUserNumber" placeholder="Phone Number" 
                            value={this.state.mobileNumber} onChange={this.onMobileChange.bind(this)}/>
                          </div>
                          <div className="otp-container">
                            <input autoComplete="off" type="number" className="form-control" id="inputOtp" placeholder="Enter OTP" 
                            value={this.state.otp} onChange={this.onOTPChange.bind(this)}/>
                            {!this.state.resendText ? <span className="resend-box">00:{this.state.resendRemainingTime}</span> : null }
                            {!!this.state.resendText ? <span className="resend-box"> {this.state.resendText}</span> : null }
                          </div>
                        </div>
                        <div className="login-action otp-button" onClick={this.sendOtp.bind(this)}>
                          <div className="otp-icon-container">
                            <img src={LoginIcon} className="otp-icon-wrapper icon-wrapper" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bottom-button-container">
                    <div className="sign-up-button-container" onClick={this.expandSignup.bind(this)}>
                      <button id="sign-up" type="button" className="button" data-dismiss="modal">Sign up</button>  
                    </div>
                    <div className="facebook-login-button-container">
                      <button id="facebook-login" type="button" className="button">Facebook login</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
		)
	}
}