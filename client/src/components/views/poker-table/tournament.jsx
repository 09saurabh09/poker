import React from 'react';

//import './poker-table.scss';

const UpArrowIcon = '../../../../assets/img/table/svg/up-arrow.svg';
const DownArrowIcon = '../../../../assets/img/table/svg/down-arrow.svg';
const SelectRoundIcon = '../../../../assets/img/table/svg/select-round.svg';
const TickIcon = '../../../../assets/img/table/svg/tick.svg';


export default class TournamentTable extends React.Component{

  constructor(props) {
    super(props);
    this.tableHeaders = [
    {
      text: 'Tourney Name',
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
      text: 'JOIN Tourney',
      key: 'join'
    }];
    this.sortType = ['asc', 'desc'];
    this.sortIcons = [
      <div className="sort-icon-container">
        <img className="down-arrow-icon-wrapper icon-wrapper" src={DownArrowIcon} />
      </div>,
      <div className="sort-icon-container">
        <img className="up-arrow-icon-wrapper icon-wrapper" src={UpArrowIcon} />
      </div>
    ];
    this.currentSortIndex = 0;
    this.TickIcon = <div className="join-icon-container">
                      <img className="join-icon-wrapper icon-wrapper" src={TickIcon}/>
                    </div> ;
    this.SelectRoundIcon = <div className="join-icon-container">
                      <img className="join-icon-wrapper icon-wrapper" src={SelectRoundIcon}/>
                    </div> ;
  }

  sortTable(arrayIndex) {
    let header = this.tableHeaders[arrayIndex];
    let newSortOrder = 1 - header.sortOrder ;
    this.tableHeaders[arrayIndex].sortOrder = newSortOrder;
    this.currentSortIndex = arrayIndex;
  }

  getSortingIcon(index, sortOrder) {
    return this.currentSortIndex === index ? this.sortIcons[sortOrder]: <span style={{paddingLeft: 14}}>&nbsp;</span>;
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
              {this.props.tableContents.map(({name, buyIn, enrolled, startTime, join}, index)=> 
                <tr className="table-row" key={index}>
                  <td className="table-column">{name}</td>
                  <td className="table-column">{buyIn}</td>
                  <td className="table-column">{enrolled}</td>
                  <td className="table-column">{startTime}</td>
                  <td className="table-column">{join ? this.TickIcon :  this.SelectRoundIcon}</td>
                </tr>
                )}
            </tbody>
          </table>
        </div>
    );
  }
}
