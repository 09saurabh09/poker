import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Layouts
import MainLayout from './components/layouts/main-layout';
import LobyLayout from './components/layouts/loby/loby-layout';

// Pages
import HomeContainer from './components/containers/home/home-container';
import CashGameContainer from './components/containers/loby/cash-game/cash-game-container';
import TournamentContainer from './components/containers/loby/tournament/tournament-container';
import TableContainer from './components/containers/game-table/table-container';

export default (
	<Route component={MainLayout}>
		<Route path="/" component={HomeContainer} />
		<Route path="/cash-game" component={LobyLayout}>
			<IndexRoute component={CashGameContainer} />
			<Route path=":id" component={TableContainer} />	
		</Route>
		
		<Route path="tournament" component={LobyLayout}>
			<IndexRoute component={TournamentContainer} />
		</Route>
	</Route>
);