import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import reducers from './client/src/reducers';
import store from './client/src/store';
import routes from './client/src/router';

export default (req, res) => {
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if(error) {
			res.status(500).send(error.message);
		} else if(redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if(renderProps) {
			if(process.env.NODE_ENV == 'development') {
				res.status(200).send(`
					<!doctype html>
					<html>
						<header>
							<title>My Universal App</title>
						</header>
						<body>
							<div id='root'></div>
							<script src='bundle.js'></script>
						</body>
					</html>
				`);
			} else if(process.env.NODE_ENV == 'production') {
				res.status(200).send(`
					<!doctype html>
					<html>
						<header>
							<title>My Universal App</title>
							<link rel='stylesheet' href='bundle.css'>
						</header>
						<body>
							<div id='root'>${renderToString(
								<Provider store={store}>
									<RouterContext {...renderProps} />
								</Provider>
							)}</div>
							<script src='bundle.js'></script>
						</body>
					</html>
				`);
			}
		} else {
			res.status(404).send('Not found');
		}
	});
};
