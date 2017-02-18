import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Layouts
import GameLayout from './components/layouts/loby/loby-layout';

// Pages
import HomeContainer from './components/containers/home/home-container';
import CashGameContainer from './components/containers/loby/cash-game/cash-game-container';
import TournamentContainer from './components/containers/loby/tournament/tournament-container';
import TableContainer from './components/containers/game-table/table-container';

export default (
	<Route>
		<Route path="/" component={HomeContainer} />
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