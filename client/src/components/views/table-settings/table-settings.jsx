import React from 'react';

import CheckboxElement from '../checkbox-element/checkbox-element';

const CardRoyal = '../../../../assets/img/table-settings/svg/cardroyal-1.svg';
const CardElegent = '../../../../assets/img/table-settings/svg/cardelegant.svg';
const CardCool = '../../../../assets/img/table-settings/svg/cardCool.svg';
const CardTrendy = '../../../../assets/img/table-settings/svg/cardtrendy.svg';
const TwoCards = '../../../../assets/img/table-settings/svg/two-cards.svg';
const FourCards = '../../../../assets/img/table-settings/svg/four-cards.svg';

import Svg from '../svg/svg.jsx';

export default class TableSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBackTheme: 0,
      selectedFrontTheme:0,
      music: true,
      soundEffects: true,
      autoMuck: true,
      chatPopup: true
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

  updateSetting(setting) {
    this.setState(Object.assign({}, this.state, setting))
  }

  render() {
    let allCardBackThemes = [CardRoyal, CardElegent, CardCool, CardTrendy];
    let allCardFrontThemes = [TwoCards, FourCards];
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
                          <div onClick={this.updateSetting.bind(this, {selectedBackTheme: index})} key={index} 
                            className={`card-theme-icon-container${index==this.state.selectedBackTheme ? ' active-card-theme': ''}`}>
                            <img className="card-back-theme-icon-wrapper icon-wrapper" src={cardBackTheme} />
                          </div>  
                          ))}
                      </div>
                      <div className="card-theme-container">
                        {allCardFrontThemes.map((cardFrontTheme, index) => (
                          <div onClick={this.updateSetting.bind(this, {selectedFrontTheme: index})} key={index} 
                            className={`card-front-theme-icon-container-${index} card-theme-icon-container${index==this.state.selectedFrontTheme ? ' active-card-theme': ''}`}>
                            <img className="card-front-theme-icon-wrapper icon-wrapper" src={cardFrontTheme} />
                          </div>  
                          ))}
                      </div>
                      <div className="col-lg-12">
                        <div className="music col-lg-6">
                          <CheckboxElement 
                            onChangeCheckbox={e => this.updateSetting({music: e.target.checked})}
                            checked={this.state.music}
                            label="Music"
                            checkboxId="music"
                          />
                        </div>
                        <div className="sound-effects col-lg-6">
                          <CheckboxElement 
                            onChangeCheckbox={e => this.updateSetting({soundEffects: e.target.checked})}
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
                            onChangeCheckbox={e => this.updateSetting({autoMuck: e.target.checked})}
                            checked={this.state.autoMuck}
                            label="Auto muck"
                            checkboxId="auto-muck"
                          />
                        </div>
                        <div className="chat-popup col-lg-6">
                          <CheckboxElement 
                            onChangeCheckbox={e => this.updateSetting({chatPopup: e.target.checked})}
                            checked={this.state.chatPopup}
                            label="Chat Popup"
                            checkboxId="chat-popup"
                          />
                        </div>
                      </div>
                      <div className="set-button-container">
                          <button type="button" className="button text-uppercase" 
                          onClick={this.props.onSet.bind(null, this.state.inputValue, this.state.maintainStack, this.state.autoPost)}> Set </button>
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