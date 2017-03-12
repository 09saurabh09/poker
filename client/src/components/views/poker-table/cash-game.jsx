import React from 'react';
import { Router, browserHistory } from 'react-router';

//import './poker-table.scss';

const UpArrowIcon = '../../../../assets/img/table/svg/up-arrow.svg';
const DownArrowIcon = '../../../../assets/img/table/svg/down-arrow.svg';
const SelectRoundIcon = '../../../../assets/img/table/svg/select-round.svg';
const TickIcon = '../../../../assets/img/table/svg/tick.svg';
const HotIcon = '../../../../assets/img/table/svg/hot.svg';
const ColdIcon = '../../../../assets/img/table/svg/cold.svg';


export default class CashGameTable extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      tableData: this.props.tableContents
    }
    this.tableHeaders = [
    {
      text: 'Table Name',
      key: 'tableName',
      sortOrder: -1
    },
    {
      text: 'BLINDS',
      key: 'bigBlind',
      sortOrder: -1
    },
    {
      text: 'BUY-IN',
      key: 'maxAmount',
      sortOrder: -1
    },{
      text: 'PLAYERS',
      key: 'players',
      sortOrder: -1
    },{
      text: 'ACTION',
      key: 'action',
      sortOrder: 0
    },{
      text: 'JOIN TABLE',
      key: 'join'
    }];
    this.sortType = ['asc', 'desc'];
    this.sortIcons = [
      <img className="down-arrow-icon-wrapper icon-wrapper" src={DownArrowIcon} />,
      <img className="up-arrow-icon-wrapper icon-wrapper" src={UpArrowIcon} />
    ];
    this.currentSortIndex = 0;
    this.hotIcon = <div className="hot-icon-container">
                      <img className="action-icon-wrapper icon-wrapper" src={HotIcon} />
                    </div> ;
    this.coldIcon = <div className="cold-icon-container">
                      <img className="action-icon-wrapper icon-wrapper" src={ColdIcon} />
                    </div> ;
    this.TickIcon = <div className="join-icon-container">
                      <img className="join-icon-wrapper icon-wrapper" src={TickIcon} />
                    </div> ;
    this.SelectRoundIcon = <div className="join-icon-container">
                      <img className="join-icon-wrapper icon-wrapper" src={SelectRoundIcon} />
                    </div> ;
  }

  sortTable(key, arrayIndex) {
    let header = this.tableHeaders[arrayIndex];
    let oldSortOrder = header.sortOrder == -1 ? 0 : header.sortOrder;
    let newSortOrder = 1 - oldSortOrder ;
    console.log('Call api with sortType', this.sortType[newSortOrder]);
    this.tableHeaders[arrayIndex].sortOrder = newSortOrder;
    this.currentSortIndex = arrayIndex;
    let sortedTableData = this.state.tableData.slice(0);
    sortedTableData.sort((a,b) =>{
      if(newSortOrder) {
        if (a[key] > b[key])
          return -1;
        if (a[key] < b[key])
          return 1;
      } else {
        if (a[key] < b[key])
          return -1;
        if (a[key] > b[key])
          return 1;
      }
      return 0;
    })
    this.setState({
      tableData : sortedTableData
    })
  }

  openTable(id) {
    browserHistory.push(`/cash-game/play/${id}`);
  }

  getSortingIcon(index, sortOrder) {
    return this.currentSortIndex === index ? this.sortIcons[sortOrder]: null;
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      tableData: nextProps.tableContents
    })
  }

  render() {
    return (
         <div className="table-responsive poker-table">
          <table className="table borderless">
            <thead className="table-head">
              <tr>{this.tableHeaders.map(({text, key, sortOrder}, index) =>
                <th className="table-header" key={index} >
                  <div className="table-header-container" onClick={this.sortTable.bind(this, key, index)}>
                    <div className="table-header-name">
                      <div className="sort-icon-container">
                        {this.getSortingIcon.call(this, index, sortOrder)}
                      </div>
                      <div>{text}</div>
                    </div> 
                  </div>  
                </th>
              )}
              </tr>
            </thead>
            <tbody>
              {this.state.tableData.map(({id, tableName, bigBlind, minAmount, maxAmount, currentlyPlaying, maxPlayer, action, userJoined}, index)=> 
                <tr className="table-row" key={index} onClick={this.openTable.bind(this, id)}>
                  <td className="table-column ">{tableName}</td>
                  <td className="table-column ">{bigBlind/2}/{bigBlind}</td>
                  <td className="table-column ">{minAmount}/{maxAmount}</td>
                  <td className="table-column ">{currentlyPlaying || 0}/{maxPlayer}</td>
                  <td className="table-column ">
                    {action=='hot'? this.hotIcon : this.coldIcon}
                  </td>
                  <td className="table-column ">{userJoined ?this.TickIcon : this.SelectRoundIcon}</td>
                </tr>
                )}
            </tbody>
          </table>
        </div>
    );
  }
}
