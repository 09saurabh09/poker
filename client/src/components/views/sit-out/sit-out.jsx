import React from 'react';
import utils from '../../../utils/utils';

const PlayIcon = '../../../../assets/img/home/svg/logo-bold.svg';
const LoginIcon = '../../../../assets/img/home/svg/login-button.svg';

export default class SitOut extends React.Component {
	constructor(props) {
		super(props);
	}

  componentDidUpdate() {
    if(this.props.open)
      $('.nav-dropdown').addClass('hide-dropdown');
  }

	render() {
    let display = this.props.open ? 'block': 'none';
    let styles = {
      display
    }
		return (
			<div className="modal fade-scale" id="sit-out" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
      style={styles}
      >
        <div className="vertical-alignment-helper">
            <div className="modal-dialog vertical-align-center">
                <div id="sit-out-content" className="modal-content">
                    <div className="modal-body">
                      <div className="modal-container">
                        <div className="play-icon-container">
                          <img src={PlayIcon} className="play-icon-wrapper icon-wrapper"/>
                        </div>
                         <div className="sit-in-button-container">
                          <button type="button" className="button text-uppercase" 
                          onClick={this.props.sitin.bind(this)}> Get Back </button>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
		)
	}
}