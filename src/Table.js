import React, { Component } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom'


class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teams: [],
			teamIDtoStanding: {
				8: 57, // Arsenal
				15: 58, // Aston Villa
				4 : 61, // Chelsea
				17: 62, // Everton
				1: 64, //Liverpool
				2: 338, //Leicester
				3: 65, // Man City
				5: 73, // Spurs
				6: 76, // Wolves
				7: 356, // Sheffield Utd
				9: 66, // Man Utd
				10: 328, // Burnley
				11: 354, // Crystal Palace
				12: 1044, // Bournemouth
				13: 563, // West Ham
				14: 67, // Newcastle
				16: 397, // Brighton
				18: 340, // Southampton
				19: 68, // Norwich
				20: 346, // Watford
			}
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


				{/*<ol className="grid-item content">*/}
				<table className="table">
					<tbody>
					<tr className="heading">
						<td>Position</td>
						<td>Team</td>
						<td>Points</td>
					</tr>
						{teams.map((team, index) => {
							let teamID = team.team.id//team["_links"].team.href.split("/").pop();
							return (
								<tr key={index}>
									<td><Link to={`/team/${teamID}`} >
										{team.position}
									</Link></td>
									<td><Link to={`/team/${teamID}`}>
										{team.team.name}
									</Link></td>
									<td><Link to={`/team/${teamID}`}>
										{team.points}
									</Link></td>
								</tr>
							)
						})}
					</tbody>
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