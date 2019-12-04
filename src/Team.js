import React, { Component } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom'


class Team extends Component {
	constructor(props) {
		super(props);

		this.teamID = this.props.match.params.teamID

		this.state = {
			data: [],
			fixtures: []
		}

		this.generateMatches = this.generateMatches.bind(this)

	}
	componentDidMount() {
		axios.defaults.headers.common['X-Auth-Token'] = 'b408c5c69ade430f8958d8b56b89c786';

		axios.get(`http://api.football-data.org/v2/teams/${this.teamID}/matches/`) // FIXTURES
			.then((response) => {
				console.log("matches:", JSON.parse(response.request.responseText).matches)
				this.setState({ fixtures: JSON.parse(response.request.responseText).matches })
			});

		axios.get(`http://api.football-data.org/v2/teams/${this.teamID}`) // TEAM INFO
			.then((response) => {
				console.log(`response.req	uest.responseText form team data: ${JSON.stringify(JSON.parse(response.request.responseText).crestUrl)}`)
				this.setState({ data: JSON.parse(response.request.responseText) })
			});
	}

	generateMatches(match) {
		const homeTeamName = match.homeTeam.name, awayTeamName = match.awayTeam.name;
		return (
			<div className="flex-item" key={match.id}>
				<Link to={`/predict/${match.id}`}>
					<div > {homeTeamName}<span className="vs"> vs </span> {awayTeamName} </div>
				</Link>
			</div>
		)
	}
	render() {
		let teams = this.state.teams;
		console.log("state:", this.state);
		
		// if (!teams) { return null }
		return (
			<div className="flex-container">
				<img src={this.state.data.crestUrl} height="300" />
				<h1>{this.state.data.name}</h1>

				{this.state.fixtures.map(this.generateMatches)}

				Fixtures length: {this.state.fixtures.length}

			</div>
		)

	}
}

export default Team;