import React from 'react';
import { Link } from 'react-router';

var PlayIcon = require('babel!svg-react!../../../../assets/img/loby/svg/sit-and-go.svg?name=PlayIcon');
var HomePageIcon = require('babel!svg-react!../../../../assets/img/loby/svg/home-page.svg?name=HomePageIcon');
var AnalyticsIcon = require('babel!svg-react!../../../../assets/img/loby/svg/analytics.svg?name=AnalyticsIcon');
var SupportIcon = require('babel!svg-react!../../../../assets/img/loby/svg/support.svg?name=SupportIcon');
var SettingsIcon = require('babel!svg-react!../../../../assets/img/loby/svg/settings.svg?name=SettingsIcon');
var LogoutIcon = require('babel!svg-react!../../../../assets/img/loby/svg/logout.svg?name=LogoutIcon');

import './loby.scss';

export default class Loby extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		/*console.log(yogaPlay);
		const yogaPlayStyle = {
			backgroundImage: 'url(' + yogaPlay + ')'
		};*/
		return (
			<div className="ui grid">
				<aside className="two wide column">
					<ul>
						<li>
							<Link to="/game/cash-games" activeClassName="active">
								<PlayIcon />
							</Link>
						</li>
						<li>
							<Link to="/" activeClassName="active">
								<HomePageIcon />
							</Link>
						</li>
						<li>
							<Link to="/" activeClassName="active">
								<AnalyticsIcon />
							</Link>
						</li>
						<li>
							<Link to="/" activeClassName="active">
								<SupportIcon />
							</Link>
						</li>
						<li>
							<Link to="/" activeClassName="active">
								<SettingsIcon />
							</Link>
						</li>
						<li>
							<Link to="/" activeClassName="active">
								<LogoutIcon />
							</Link>
						</li>
					</ul>
				</aside>
				<main className="fourteen wide column">
					This is main content
				</main>
			</div>
		)
	}
}