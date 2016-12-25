import React from 'react';

import './poker-table.scss';

var UpArrowIcon = require('babel!svg-react!../../../../assets/img/table/svg/up-arrow.svg?name=UpArrowIcon');
var DownArrowIcon = require('babel!svg-react!../../../../assets/img/table/svg/down-arrow.svg?name=DownArrowIcon');

export default class TournamentTable extends React.Component{

  constructor(props) {
    super(props);
    this.tableHeaders = [
    {
      text: 'Tourny Name',
      key: 'name',
      sortOrder: 1
    },
    {
      text: 'BUY-IN',
      key: 'buyIn',
      sortOrder: 0
    },{
      text: 'Enrolled',
      key: 'enrolled',
      sortOrder: 0
    },{
      text: 'Start time',
      key: 'startTime',
      sortOrder: 0
    },{
      text: 'JOIN Tourny',
      key: 'join'
    }];
    this.sortType = ['asc', 'desc'];
    this.sortIcons = [<DownArrowIcon />, <UpArrowIcon />];
    this.currentSortIndex = 0;
  }

  sortTable(arrayIndex) {
    let header = this.tableHeaders[arrayIndex];
    let newSortOrder = 1 - header.sortOrder ;
    console.log('Call api with sortType', this.sortType[newSortOrder]);
    this.tableHeaders[arrayIndex].sortOrder = newSortOrder;
    this.currentSortIndex = arrayIndex;
  }

  getSortingIcon(index, sortOrder) {
    return this.currentSortIndex === index ? this.sortIcons[sortOrder]: null;
  }

  render() {
    return (
         <div className="table-responsive poker-table">
          <table className="table">
            <thead className="table-head">
              <tr>{this.tableHeaders.map(({text, key, sortOrder}, index) =>
                <th className="table-header" key={index} >
                  <div href="#" className="table-header-container" onClick={this.sortTable.bind(this, index)}>
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
              <tr className="table-row">
                <td className="table-column">Mark</td>
              </tr>
            </tbody>
          </table>
        </div>
    );
  }
}
