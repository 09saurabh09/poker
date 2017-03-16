import React from 'react';

import CheckboxElement from '../checkbox-element/checkbox-element';
import utils from '../../../utils/utils';

const CardRoyal = '../../../../assets/img/table-settings/svg/cardroyal-1.svg';
const CardElegent = '../../../../assets/img/table-settings/svg/cardelegant.svg';
const CardCool = '../../../../assets/img/table-settings/svg/cardCool.svg';
const CardTrendy = '../../../../assets/img/table-settings/svg/cardtrendy.svg';
const TwoCards = '../../../../assets/img/table-settings/svg/two-cards.svg';
const FourCards = '../../../../assets/img/table-settings/svg/four-cards.svg';
import * as userApi from '../../../api/user-api';
import { UserInfoSuccess } from '../../../actions/user-actions';

export default class TableSettings extends React.Component {
  constructor(props) {
    super(props);
    let { userData } = this.props;
    this.state = {
      cardBackTheme: userData.cardBackTheme || 'royal',
      cardFrontTheme: userData.cardFrontTheme || 'twoColor',
      music: !!userData.music,
      soundEffects: !!userData.soundEffects,
      autoMuck: !!userData.autoMuck,
      chatPopup: !!userData.chatPopup
    };
  }

  componentDidMount() {
    $(document).ready(()=>{
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target.classList.contains("modal")) {
          $('.modal').hide();
        }
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    let { userData } = nextProps;
    if(userData.id && !this.props.userData.id) {
      this.setState(Object.assign({}, this.state,
        {
          cardBackTheme: userData.cardBackTheme || 'royal',
          cardFrontTheme: userData.cardFrontTheme || 'twoColor',
          music: !!userData.music,
          soundEffects: !!userData.soundEffects,
          autoMuck: !!userData.autoMuck,
          chatPopup: !!userData.chatPopup
      }))  
    }
  }

  updateSettings(settings) {
    this.setState(Object.assign({}, this.state, settings))
  }

  setClickHandler(settings) {
    userApi.updateUserInfo({user: settings}, this.props.userData)
    .then((response)=>{
      this.props.dispatch(UserInfoSuccess(settings))
      utils.closeModal('table-settings')
      this.props.onSet(settings);
    });
    
  }

  render() {
    let allCardBackThemes = [{
      name: 'royal',
      url: CardRoyal
    },{
      name: 'elegent',
      url: CardElegent
    },{
      name: 'cool',
      url: CardCool
    },{
      name: 'trendy',
      url: CardTrendy
    }];
    let allCardFrontThemes = [{
      name: 'twoColor',
      url: TwoCards
    },{
      name: 'fourColor',
      url: FourCards
    }];
    return (
      <div className="modal fade-scale" id="table-settings" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="vertical-alignment-helper">
          <div className="modal-dialog vertical-align-center">
            <div id="table-settings-content" className="modal-content">
              <div className="modal-body">
                <div className="modal-container">
                  <div className="settings-icon-container">
                    <img className="tournament-logo-icon-wrapper icon-wrapper" src="../../../../assets/img/game/table-setting.svg" />
                  </div>
                  <form className="form-horizontal">
                    <div className="form-container">
                      <div className="card-theme-container">
                        {allCardBackThemes.map((cardBackTheme, index) => (
                          <div onClick={this.updateSettings.bind(this, {cardBackTheme: cardBackTheme.name})} key={index} 
                            className={`card-theme-icon-container${cardBackTheme.name == this.state.cardBackTheme ? ' active-card-theme': ''}`}>
                            <img className="card-back-theme-icon-wrapper icon-wrapper" src={cardBackTheme.url} />
                          </div>  
                          ))}
                      </div>
                      <div className="card-theme-container">
                        {allCardFrontThemes.map((cardFrontTheme, index) => (
                          <div onClick={this.updateSettings.bind(this, {cardFrontTheme: cardFrontTheme.name})} key={index} 
                            className={`card-front-theme-icon-container-${index} card-theme-icon-container${cardFrontTheme.name==this.state.cardFrontTheme ? ' active-card-theme': ''}`}>
                            <img className="card-front-theme-icon-wrapper icon-wrapper" src={cardFrontTheme.url} />
                          </div>  
                          ))}
                      </div>
                      <div className="col-lg-12">
                        <div className="music col-lg-6">
                          <CheckboxElement 
                            onChangeCheckbox={e => this.updateSettings({music: e.target.checked})}
                            checked={this.state.music}
                            label="Music"
                            checkboxId="music"
                          />
                        </div>
                        <div className="sound-effects col-lg-6">
                          <CheckboxElement 
                            onChangeCheckbox={e => this.updateSettings({soundEffects: e.target.checked})}
                            checked={this.state.soundEffects}
                            label="Sound Effects"
                            checkboxId="sound-effects"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="col-lg-6">
                          Preflop
                          <div className="display-flex">
                            <div className="input-wrapper">
                              <input type="text" id="preflop-text-1" className="form-control"/>x
                            </div>
                            <div className="input-wrapper">
                              <input type="text" id="preflop-text-2" className="form-control"/>x
                            </div>
                            <div className="input-wrapper">
                              <input type="text" id="preflop-text-3" className="form-control"/>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          Postflop
                          <div className="display-flex">
                            <div className="input-wrapper">
                              <input type="text" id="postflop-text-1" className="form-control"/>%
                            </div>
                            <div className="input-wrapper">
                              <input type="text" id="postflop-text-2" className="form-control"/>%
                            </div>
                            <div className="input-wrapper">
                              <input type="text" id="postflop-text-3" className="form-control"/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="auto-muck col-lg-6">
                          <CheckboxElement 
                            onChangeCheckbox={e => this.updateSettings({autoMuck: e.target.checked})}
                            checked={this.state.autoMuck}
                            label="Auto muck"
                            checkboxId="auto-muck"
                          />
                        </div>
                        <div className="chat-popup col-lg-6">
                          <CheckboxElement 
                            onChangeCheckbox={e => this.updateSettings({chatPopup: e.target.checked})}
                            checked={this.state.chatPopup}
                            label="Chat Popup"
                            checkboxId="chat-popup"
                          />
                        </div>
                      </div>
                      <div className="set-button-container">
                          <button type="button" className="button text-uppercase" 
                          onClick={this.setClickHandler.bind(this, this.state)}> Set </button>
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