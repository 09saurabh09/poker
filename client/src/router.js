import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Layouts
import GameLayout from './components/layouts/loby/loby-layout';
import App from './components/layouts/main-layout';
// Pages
import Home from './components/containers/home/home-container';
import CashGameContainer from './components/containers/loby/cash-game/cash-game-container';
import TournamentContainer from './components/containers/loby/tournament/tournament-container';
import TableContainer from './components/containers/game-table/table-container';

export default (
	<Route component={App}>
		<Route path="/" component={Home} />
		<Route path="/cash-game">
			<Route component={GameLayout} >
				<IndexRoute component={CashGameContainer} />
			</Route>
			<Route path=":id" component={TableContainer} />	
		</Route>
		
		<Route path="tournament">
			<Route component={GameLayout} >
				<IndexRoute component={TournamentContainer} />
			</Route>
		</Route>
	</Route>
);