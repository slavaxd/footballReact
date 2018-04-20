import React, {Component} from 'react';

import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class Table extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			teams: []
		}
	}
	componentDidMount() {
		axios.defaults.headers.common['X-Auth-Token'] = 'b408c5c69ade430f8958d8b56b89c786';
		axios.get('http://api.football-data.org/v1/competitions/445/leagueTable')
		  .then((response) => {
		  	console.log(response.request.responseText)
			this.setState({teams: JSON.parse(response.request.responseText).standing})
		})
	}

	render() {
		let teams = this.state.teams;
		let url = this.props.url;
		return (
			<div className="grid-container">
				<div className="grid-item header">
					<h1>EPL</h1>
				</div>

				<ol className="grid-item content">
					{teams.map((team, index) => {
						let teamID = team["_links"].team.href.split("/").pop();
						return (
							<Link to={`/team/${teamID}`}>
								<div key={index}>{team.position}. {team.teamName} {team.points} points</div>
							</Link>
						)
					})}
{/*					<li class="grid-item">
					   <a href="#">Тотенхем</a>
						 Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					</li>*/}

				</ol>
			</div>
		)
		
	}
}

export default Table;