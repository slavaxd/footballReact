import React, {Component} from 'react';

import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// import {observer} from "mobx-react";


class Predict extends Component {
	constructor(props) {
		super(props);
		
		
		this.state = {
			predictID: this.props.match.params.predictID,

			homeTeam: {
				fixtures: []
			},
			awayTeam: {
				fixtures: []
			},
			links: {
				homeTeam: "", 
				awayTeam: ""
			}
		};

		// this.generateMatches = this.generateMatches.bind(this);

	}
	componentWillMount() {
		axios.defaults.headers.common['X-Auth-Token'] = 'b408c5c69ade430f8958d8b56b89c786';
		
		axios.get(`http://api.football-data.org/v1/fixtures/${this.state.predictID}`) // MATCH DETAILS
			.then((response) => {
				// console.log(JSON.parse(response.request.responseText));
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
				// console.log(fixtures);
				let newHomeTeam = this.state.homeTeam;
				newHomeTeam.fixtures = fixtures;
				
				this.setState({
					homeTeam: newHomeTeam
				});
				let k;
				return axios.get(`${this.state.links.awayTeam}/fixtures`);
			})
			.then((response) => {
				let fixtures = JSON.parse(response.request.responseText).fixtures;
				// console.log(JSON.parse(response.request.responseText));
				
				let newAwayTeam = this.state.awayTeam;
				newAwayTeam.fixtures = fixtures;
				
				this.setState({
					awayTeam: newAwayTeam
				});
				return axios.get(`${this.state.links.awayTeam}/`);
			})		
			.then((response) => {
				let data = JSON.parse(response.request.responseText);
				let newAwayTeam = this.state.awayTeam;
				newAwayTeam.name = data.name;
				newAwayTeam.img = data.crestUrl;
				this.setState({
					awayTeam: newAwayTeam					
				});
				return axios.get(`${this.state.links.homeTeam}/`);
			})
			.then((response) => {
				let data = JSON.parse(response.request.responseText);
				let newHomeTeam = this.state.homeTeam;
				newHomeTeam.name = data.name;
				newHomeTeam.img = data.crestUrl;
				this.setState({
					homeTeam: newHomeTeam					
				});
			})
				// let homeTeamFixtures = this.state.homeTeam.fixtures.filter((match) => {
				// 	return (match.homeTeamName === this.state.homeTeam.name) && match.status === "FINISHED";
				// });
				// let goalsDiffInHomeMatches = 0;
				// let homeMatches = 0;
				// homeTeamFixtures.map(match => {
				// 	goalsDiffInHomeMatches += match.result.goalsHomeTeam - match.result.goalsAwayTeam;
				// 	homeMatches++;
				// })
				// let avgHomeGoals = goalsDiffInHomeMatches / homeMatches;
				// this.setState({
				// 	homeTeam: {
				// 		avgHomeGoals: goalsDiffInHomeMatches / homeMatches
				// 	}
				// });
			

			// .then(()){
			// }
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

		// console.log(typeof avgHomeGoals);
		let f = this.state.homeTeam.fixtures || []; 
		let homeTeamFixtures = f.filter((match) => {
			return (match.homeTeamName === this.state.homeTeam.name) && match.status === "FINISHED";
		});
		let goalsDiffInHomeMatches = 0;
		let homeMatches = 0;
		homeTeamFixtures.map(match => {
			goalsDiffInHomeMatches += match.result.goalsHomeTeam - match.result.goalsAwayTeam;
			homeMatches++;
		})
		let avgHomeGoals = (goalsDiffInHomeMatches / homeMatches).toFixed(2);
				
		let fa = this.state.awayTeam.fixtures || []; 
		let awayTeamFixtures = fa.filter((match) => {
			return (match.awayTeamName === this.state.awayTeam.name) && match.status === "FINISHED";
		});
		let goalsDiffInAwayMatches = 0;
		let awayMatches = 0;
		awayTeamFixtures.map(match => {
			goalsDiffInAwayMatches += match.result.goalsAwayTeam - match.result.goalsHomeTeam;
			awayMatches++;
		})
		let avgAwayGoals = (goalsDiffInAwayMatches / awayMatches).toFixed(2);

		let benefit = avgHomeGoals > avgAwayGoals ? <span> {this.state.homeTeam.name} will have benefit {(avgHomeGoals - avgAwayGoals).toFixed(2)} goals</span> : <span > {this.state.awayTeam.name} will have benefit {(avgAwayGoals - avgHomeGoals).toFixed(2)}</span>
		const result = (
				<div>
					<h1>Прогноз на матч</h1>

					<div className="grid-container">
						<div className="grid-item one">
							<img src={this.state.homeTeam.img} alt="img" height="300" />
							<h2>{this.state.homeTeam.name}</h2>
						</div>
						<div className="grid-item two">
							<img src={this.state.awayTeam.img} alt="img" height="300" />
							<h2>{this.state.awayTeam.name}</h2>
						</div>
						<div className="grid-item three">
							<h1>{avgHomeGoals}:{avgAwayGoals}</h1>
							<h1 className="">{benefit}</h1>	
						</div>
								
					</div>
					{/*{typeof avgHomeGoals !== 'undefined' ? (<h1>home team coef: avgHomeGoals</h1>) : null}
					<h1>home team coef: {avgHomeGoals}</h1>
					<h1>away team coef: {avgAwayGoals}</h1>*/}
				</div>
		);

		return result;
		
	}
}

export default Predict;