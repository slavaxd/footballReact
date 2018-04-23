import React, {Component} from 'react';

import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class Predict extends Component {
	constructor(props) {
		super(props);
		
		this.predictID = this.props.match.params.predictID;

		this.state = {
			homeTeam: {

			},
			awayTeam: {},
			links: {}
		};

		// this.generateMatches = this.generateMatches.bind(this);

	}
	componentWillMount() {
		axios.defaults.headers.common['X-Auth-Token'] = 'b408c5c69ade430f8958d8b56b89c786';
		
		axios.get(`http://api.football-data.org/v1/fixtures/${this.predictID}`) // MATCH DETAILS
			.then((response) => {
				console.log(JSON.parse(response.request.responseText));
				let data = JSON.parse(response.request.responseText);
				let links = JSON.parse(response.request.responseText).fixture["_links"];
				this.setState({
					links: {
						homeTeam: links.homeTeam.href, 
						awayTeam: links.awayTeam.href
					},
					homeTeam: {
						name: data.fixture.homeTeamName
					},
					awayTeam: {
						name: data.fixture.awayTeamName
					}
				});
				return axios.get(`${links.homeTeam.href}/fixtures`);
			})
			.then((response) => {
				let fixtures = JSON.parse(response.request.responseText).fixtures;
				console.log(fixtures);
				this.setState({
					homeTeam: {
						fixtures: fixtures
					}
				});
				let k;
				return axios.get(`${this.state.links.awayTeam}/fixtures`);
			})
			.then((response) => {
				let fixtures = JSON.parse(response.request.responseText).fixtures;
				console.log(fixtures);
				this.setState({
					awayTeam: {
						fixtures: fixtures
					}
				});
			})		
		if (this.state.homeTeam.fixtures) {
			let homeTeamFixtures = this.state.homeTeam.fixtures.filter((match) => {
				return (match.homeTeamName === this.state.homeTeam.name) && match.status === "FINISHED";
			});
			let goalsDiffInHomeMatches = 0;
			let homeMatches = 0;
			homeTeamFixtures.map(match => {
				goalsDiffInHomeMatches += match.result.goalsHomeTeam - match.result.goalsAwayTeam;
				homeMatches++;
			})
			// let avgHomeGoals = goalsDiffInHomeMatches / homeMatches;
			this.setState({
				homeTeam: {
					avgHomeGoals: goalsDiffInHomeMatches / homeMatches
				}
			});
		}
		// axios.get(`http://api.football-data.org/v1/teams/${this.teamID}/fixtures`) // FIXTURES
		//   .then((response) => {
		// 	  	// console.log(response.request.responseText)
		// 		this.setState({fixtures: JSON.parse(response.request.responseText).fixtures})
		// 	});
		
		// axios.get(`http://api.football-data.org/v1/teams/${this.teamID}`) // TEAM INFO
		// 	.then((response) => {
		// 	  	console.log(`response.request.responseText form team data: ${response.request.responseText}`)
		// 		this.setState({data: JSON.parse(response.request.responseText)})
		// 	});
	}

	// generateMatches(match) {
	// 	let matchID = match["_links"].self.href.split("/").pop();
	// 	return (
	// 		<li>
	// 			<Link to={`/match/${matchID}`}>
	// 				<div> vs {this.state.data.name === match.awayTeamName ? match.homeTeamName : match.awayTeamName} </div>
	// 			</Link>
	// 		</li>
	// 	)
	// }
	render() {
		
		console.log(this.state.homeTeam);

		// if (typeof avgHomeGoals === 'undefined') {
		// 	console.log("geiohreioho");
		// 	let avgHomeGoals = 'nothing';
		// }
		// (avgHomeGoals, undefined) ? "nothing" : avgHomeGoals;

		console.log(typeof avgHomeGoals);

		const result = (
				<div>
					<h1>Прогноз на матч</h1>

					<div className="grid-container">
						<div class="grid-item one">
							<img src="" alt="img" />
							<h2>Spurs</h2>
						</div>
						<div class="grid-item two">
							<img src="" alt="img" />
							<h2>Ливерпуль</h2>
						</div>
						<div class="grid-item three"><h1>7:0</h1></div>
					</div>
					{/*<h1>{this.state.data.name}</h1>
					<ol>
						{this.state.fixtures.map(this.generateMatches)}
					</ol>
					Fixtures length: {this.state.fixtures.length}
					// {typeof avgHomeGoals !== 'undefined' ? (<h1>home team coef: avgHomeGoals</h1>) : null}
					<h1>home team coef: {this.state.homeTeam.avgHomeGoals}</h1>*/}
				</div>
		);

		return result;
		
	}
}

export default Predict;