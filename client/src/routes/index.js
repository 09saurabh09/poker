/*import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import configureStore from '../store/configureStore'

//import App from '../components/containers/App' 
//import LobyLayout from '../components/layouts/loby/loby-layout';

// Pages
import Home from '../components/containers/home/home-container.jsx';
import CashGameContainer from '../components/containers/loby/cash-game/cash-game-container';
import TournamentContainer from '../components/containers/loby/tournament/tournament-container';
import TableContainer from '../components/containers/game-table/table-container';

export default function(history) {
  return (
    <Router history={history}>
      	<Route path="/" component={Home} />
		<Route path="/cash-game">
			<Route component={LobyLayout} >
				<IndexRoute component={CashGameContainer} />
			</Route>
			<Route path=":id" component={TableContainer} />	
		</Route>
		
		<Route path="tournament">
			<Route component={LobyLayout} >
				<IndexRoute component={TournamentContainer} />
			</Route>
		</Route>
    </Router>
  )
}
*/

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

// Layouts
import LobyLayoutContainer from '../components/containers/loby-layout-container';
import MainLayoutContainer from '../components/containers/main-layout-container';
// Pages
import Home from '../components/containers/home/home-container.jsx';
/*import CashGameContainer from '../components/containers/loby/cash-game/cash-game-container';
import TournamentContainer from '../components/containers/loby/tournament/tournament-container';
import TableContainer from '../components/containers/game-table/table-container';*/
export default function(history) {
	return (
		<Router history={history}>
			<Route component={MainLayoutContainer}>
				<Route path="/" component={Home} />
				{/*<Route path="/cash-game">
					<Route component={LobyLayoutContainer} >
						<IndexRoute component={CashGameContainer} />
					</Route>
					<Route path=":id" component={TableContainer} />	
				</Route>
				
				<Route path="tournament">
					<Route component={LobyLayoutContainer} >
						<IndexRoute component={TournamentContainer} />
					</Route>
				</Route>*/}
			</Route>
		</Router>
	)
}
