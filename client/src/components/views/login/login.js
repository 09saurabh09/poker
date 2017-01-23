import React from 'react';
import './login.scss';

import PlayIcon from '../../../../assets/img/loby/svg/yoga-play.svg';
import LoginIcon from '../../../../assets/img/loby/svg/login-button.svg';

export default class Login extends React.Component {
	constructor(props) {
			super(props);
      this.login = this.login.bind(this);
      $(document).ready(()=>{
        var modal = document.getElementsByClassName('modal')[0];
        // Get the button that opens the modal
        var btn = document.getElementById('logout-link');

        // When the user clicks the button, open the modal 
        btn.onclick = function() {
            modal.style.display = 'block';
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
      })
	}

  login() {
    alert('login');
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
                          <div className="play-icon-wrapper icon-wrapper" style={{backgroundImage: `url(${PlayIcon})`}}></div>
                        </div>
                        <form className="form-horizontal form-container">
                          <div className="form-group">
                            <label htmlFor="inputUsername" className="sr-only">User name</label>
                            <div className="">
                              <input autoComplete="off" type="email" className="form-control" id="inputUsername" placeholder="User name" />
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <div className="password-container">
                              <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                              <div className="login-button">
                                <div className="login-icon-container">
                                  <div onClick={this.login} className="login-icon-wrapper icon-wrapper" 
                                    style={{backgroundImage: `url(${LoginIcon})`}}>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="sign-up-button-container">
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