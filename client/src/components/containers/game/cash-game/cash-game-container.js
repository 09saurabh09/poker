import React from 'react';
import { Link } from 'react-router';
import * as userApi from '../../../../api/user-api';
import * as widgetApi from '../../../../api/widget-api';
import { loadSearchLayout } from '../../../../actions/search-layout-actions';
import SearchForm from '../../../views/search-form';

import CashGameTable from '../../../views/poker-table/cash-game'

import CashGameFilterContainer from '../../filter/cash-game/cash-game-filter-container'
var FilterIcon = require('babel!svg-react!../../../../../assets/img/table/svg/filter.svg?name=FilterIcon');


export default class CashGameContainer extends React.Component{

  constructor(props) {
    super(props);
  }

  openCashGameFilter = () => {
    document.getElementById('cash-game-filter').style.display = 'block';
  }

  componentDidMount() {
   
  }

  render(props) {
    let tableData = [{
     tableId: 1,
     name: 'Amar',
     blinds: '$441',
     buyIn: '$50/$200',
     players: '2/9',
     action: 'hot',
     join: true
    },
    {
     tableId: 2,
     name: 'Amar',
     blinds: '$441',
     buyIn: '$50/$200',
     players: '2/9',
     action: 'hot',
     join: false
    },
    {
     tableId: 3,
     name: 'Amar',
     blinds: '$441',
     buyIn: '$50/$200',
     players: '2/9',
     action: 'cold',
     join: true
    }];
    return (
      <div>
        <CashGameTable tableContents={tableData} />
        {/*<div className="filter-icon-container">
          <a onClick={this.openCashGameFilter} className="filter-icon-wrapper">
            <FilterIcon className="filter-icon"/>
          </a>
        </div>*/}
        <CashGameFilterContainer />
      </div>
    );
  }
}
