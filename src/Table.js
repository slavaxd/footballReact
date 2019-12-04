import React, { Component } from 'react';

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
		axios.get('http://api.football-data.org/v2/competitions/2021/standings')
			.then((response) => {
				// console.log(response.request.responseText)
				console.log("JSON.parse(response.request.responseText).standings.table", JSON.parse(response.request.responseText).standings[0].table);
				this.setState({ teams: JSON.parse(response.request.responseText).standings[0].table })
			})
	}

	render() {
		let teams = this.state.teams;
		let url = this.props.url;
		if (!teams) { return <div>loading</div> }
		return (
			<div >
				<div >
					<img src="http://www.freelogovectors.net/wp-content/uploads/2012/08/epl-premier-league-logo.png" height="300" />
					<h1>English Premier League </h1>
				</div>

				<div class="heading">
					<td>Position</td>
					<td>Team</td>
					<td>Points</td>
				</div>
				{/*<ol className="grid-item content">*/}
				<table class="table">
					{teams.map((team, index) => {
						let teamID = team.team.id//team["_links"].team.href.split("/").pop();
						return (
							<tr>
								<Link to={`/team/${teamID}`} key={index}>
									<td>{team.position}</td>
									<td>{team.team.name}</td>
									<td>{team.points}</td>
								</Link>
							</tr>
						)
					})}
				</table>
				{/*					<li class="grid-item">
					   <a href="#">Тотенхем</a>
						 Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					</li>*/}

				{/*</ol>*/}
			</div>
		)

	}
}

export default Table;