import React from 'react';
import * as userApi from '../../../../api/user-api';
import * as widgetApi from '../../../../api/widget-api';
import { loadSearchLayout } from '../../../../actions/search-layout-actions';
import SearchForm from '../../../views/search-form';

import TournamentFilter from '../../../views/filter/tournament'

export default class TournamentFilterContainer extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
   
  }

  render() {
    return (
      <TournamentFilter />
    );
  }
}
