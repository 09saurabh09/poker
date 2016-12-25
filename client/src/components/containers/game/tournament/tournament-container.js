import React from 'react';
import * as userApi from '../../../../api/user-api';
import * as widgetApi from '../../../../api/widget-api';
import { loadSearchLayout } from '../../../../actions/search-layout-actions';
import SearchForm from '../../../views/search-form';

import TournamentTable from '../../../views/poker-table/tournament'

export default class CashGameContainer extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
   
  }

  render() {
    return (
      <TournamentTable tableContents={''} />
    );
  }
}
