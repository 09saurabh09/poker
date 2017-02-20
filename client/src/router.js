import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Layouts
import LobyLayoutContainer from './components/containers/loby-layout-container';
import MainLayoutContainer from './components/containers/main-layout-container';
// Pages
import Home from './components/containers/home/home-container';
import CashGameContainer from './components/containers/loby/cash-game/cash-game-container';
import TournamentContainer from './components/containers/loby/tournament/tournament-container';
import TableContainer from './components/containers/game-table/table-container';

export default (
	<Route component={MainLayoutContainer}>
		<Route path="/" component={Home} />
		<Route path="/cash-game">
			<Route component={LobyLayoutContainer} >
				<IndexRoute component={CashGameContainer} />
			</Route>
			<Route path=":id" component={TableContainer} />	
		</Route>
		
		<Route path="tournament">
			<Route component={LobyLayoutContainer} >
				<IndexRoute component={TournamentContainer} />
			</Route>
		</Route>
	</Route>
);