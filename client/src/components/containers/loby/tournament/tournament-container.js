import React from 'react';
import { Link } from 'react-router';
import * as userApi from '../../../../api/user-api';
import * as widgetApi from '../../../../api/widget-api';
import { loadSearchLayout } from '../../../../actions/search-layout-actions';
import SearchForm from '../../../views/search-form';

var FilterIcon = require('babel!svg-react!../../../../../assets/img/table/svg/filter.svg?name=FilterIcon');

import TournamentFilterContainer from '../../filter/tournament/tournament-filter-container'
import TournamentTable from '../../../views/poker-table/tournament'

export default class CashGameContainer extends React.Component{

  constructor(props) {
    super(props);
  }

  openTouranamentFilter = () => {

  }

  componentDidMount() {
   
  }

  render() {
    let tableData = [{
     name: 'Amar',
     buyIn: '$50/$200',
     enrolled: '2/9',
     startTime: '18 Jun 11:31AM',
     join: true
    },
    {
     name: 'Amar',
     buyIn: '$50/$200',
     enrolled: '2/9',
     startTime: '18 Jun 11:31AM',
     join: false
    },
    {
     name: 'Amar',
     buyIn: '$50/$200',
     enrolled: '2/9',
     startTime: '18 Jun 11:31AM',
     join: true
    }];
    return (
      <div>
        <TournamentTable tableContents={tableData} />
        {/*<div className="filter-icon-container">
          <a data-toggle="modal" data-target="#login" href="#" className="filter-icon-wrapper" onClick={this.openTouranamentFilter}>
            <FilterIcon className="filter-icon"/>
          </a>
        </div>*/}
        <TournamentFilterContainer />
      </div>
    );
  }
}
