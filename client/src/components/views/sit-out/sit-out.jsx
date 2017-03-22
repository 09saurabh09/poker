import React from 'react';
import utils from '../../../utils/utils';

const PlayIcon = '../../../../assets/img/home/svg/logo-bold.svg';
const LoginIcon = '../../../../assets/img/home/svg/login-button.svg';

export default class SitOut extends React.Component {
	constructor(props) {
		super(props);
	}
  
  componentDidMount() {
    $(document).ready(()=>{
      if(this.props.open) {
        utils.openModal('sit-out');
      }
    })
  }

	render() {
		return (
			<div className="modal fade-scale" id="sit-out" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="vertical-alignment-helper">
            <div className="modal-dialog vertical-align-center">
                <div id="sit-out-content" className="modal-content">
                    <div className="modal-body">
                      <div className="modal-container">
                        <div className="play-icon-container">
                          <img src={PlayIcon} className="play-icon-wrapper icon-wrapper"/>
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