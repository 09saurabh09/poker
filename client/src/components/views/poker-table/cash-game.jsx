import React from 'react';
import { Router, browserHistory } from 'react-router';

import './poker-table.scss';

var UpArrowIcon = require('babel!svg-react!../../../../assets/img/table/svg/up-arrow.svg?name=UpArrowIcon');
var DownArrowIcon = require('babel!svg-react!../../../../assets/img/table/svg/down-arrow.svg?name=DownArrowIcon');
import SelectRoundIcon from '../../../../assets/img/table/svg/select-round.svg';
import TickIcon from '../../../../assets/img/table/svg/tick.svg';
import HotIcon from '../../../../assets/img/table/svg/hot.svg';
import ColdIcon from '../../../../assets/img/table/svg/cold.svg';

export default class CashGameTable extends React.Component{

  constructor(props) {
    super(props);
    this.tableHeaders = [
    {
      text: 'Table Name',
      key: 'name',
      sortOrder: 1
    },
    {
      text: 'BLINDS',
      key: 'blinds',
      sortOrder: 0
    },
    {
      text: 'BUY-IN',
      key: 'buyIn',
      sortOrder: 0
    },{
      text: 'PLAYERS',
      key: 'players',
      sortOrder: 0
    },{
      text: 'ACTION',
      key: 'action',
      sortOrder: 0
    },{
      text: 'JOIN TABLE',
      key: 'join'
    }];
    this.sortType = ['asc', 'desc'];
    this.sortIcons = [<DownArrowIcon />, <UpArrowIcon />];
    this.currentSortIndex = 0;
    this.hotIcon = <div className="hot-icon-container">
                      <div className="action-icon-wrapper icon-wrapper" 
                        style={{backgroundImage: `url(${HotIcon})`}}>
                      </div>
                    </div> ;
    this.coldIcon = <div className="cold-icon-container">
                      <div className="action-icon-wrapper icon-wrapper" 
                        style={{backgroundImage: `url(${ColdIcon})`}}>
                      </div>
                    </div> ;
    this.TickIcon = <div className="join-icon-container">
                      <div className="join-icon-wrapper icon-wrapper" 
                        style={{backgroundImage: `url(${TickIcon})`}}>
                      </div>
                    </div> ;
    this.SelectRoundIcon = <div className="join-icon-container">
                      <div className="join-icon-wrapper icon-wrapper" 
                        style={{backgroundImage: `url(${SelectRoundIcon})`}}>
                      </div>
                    </div> ;
  }

  sortTable(arrayIndex) {
    let header = this.tableHeaders[arrayIndex];
    let newSortOrder = 1 - header.sortOrder ;
    console.log('Call api with sortType', this.sortType[newSortOrder]);
    this.tableHeaders[arrayIndex].sortOrder = newSortOrder;
    this.currentSortIndex = arrayIndex;
  }

  openTable(id) {
    browserHistory.push(`/cash-game/${id}`);
  }

  getSortingIcon(index, sortOrder) {
    return this.currentSortIndex === index ? this.sortIcons[sortOrder]: null;
  }

  render() {
    return (
         <div className="table-responsive poker-table">
          <table className="table borderless">
            <thead className="table-head">
              <tr>{this.tableHeaders.map(({text, key, sortOrder}, index) =>
                <th className="table-header" key={index} >
                  <div className="table-header-container" onClick={this.sortTable.bind(this, index)}>
                    <span className="sort-icon-container">
                      {this.getSortingIcon.call(this, index, sortOrder)}
                    </span>
                    <span className="table-header-name">
                      {text}
                    </span> 
                  </div>  
                </th>
              )}
              </tr>
            </thead>
            <tbody>
              {this.props.tableContents.map(({id, tableName, bigBlind, minAmount, maxAmount, currentlyPlaying, maxPlayer, action, join}, index)=> 
                <tr className="table-row" key={index} onClick={this.openTable.bind(this, id)}>
                  <td className="table-column ">{tableName}</td>
                  <td className="table-column ">{bigBlind/2}/{bigBlind}</td>
                  <td className="table-column ">{minAmount}/{maxAmount}</td>
                  <td className="table-column ">{currentlyPlaying || 0}/{maxPlayer}</td>
                  <td className="table-column ">
                    {action=='hot'? this.hotIcon : this.coldIcon}
                  </td>
                  <td className="table-column ">{join ?this.TickIcon : this.SelectRoundIcon}</td>
                </tr>
                )}
            </tbody>
          </table>
        </div>
    );
  }
}
