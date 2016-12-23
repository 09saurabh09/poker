import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Layouts
import GameLayout from './components/layouts/game-layout';

// Pages
import Loby from './components/containers/loby/loby-container';
import CashGameContainer from './components/containers/game/cash-game/cash-game-container';

export default (
	<Route>
		<Route path="/" component={Loby} />
		<Route path="game" component={GameLayout} >
			<Route path="cash-games" component={CashGameContainer} />
		</Route>
	</Route>
);
