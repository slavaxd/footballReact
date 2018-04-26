import React, {Component} from 'react';

import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


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
		
		axios.get(`http://api.football-data.org/v1/teams/${this.teamID}/fixtures`) // FIXTURES
		  .then((response) => {
			  // console.log(response.request.responseText)
				this.setState({fixtures: JSON.parse(response.request.responseText).fixtures})
			});
		
		axios.get(`http://api.football-data.org/v1/teams/${this.teamID}`) // TEAM INFO
			.then((response) => {
			  console.log(`response.request.responseText form team data: ${response.request.responseText}`)
				this.setState({data: JSON.parse(response.request.responseText)})
			});
	}

	generateMatches(match) {
		let matchID = match["_links"].self.href.split("/").pop();
		return (
			<div className="flex-item"> 
				<Link to={`/predict/${matchID}`}>
					<div > <span className="vs">vs</span> {this.state.data.name === match.awayTeamName ? match.homeTeamName : match.awayTeamName} </div>
				</Link>
			</div>
		)
	}
	render() {
		let teams = this.state.teams;
		let url = this.props.url;

		return (
			<div className="flex-container">
				<img src={this.state.data.crestUrl} height="300" />
				<h1>{this.state.data.name} <span className="vs">VS</span></h1>
	
							{this.state.fixtures.map(this.generateMatches)}
			
				Fixtures length: {this.state.fixtures.length}

			</div>
		)
		
	}
}

export default Team;