import React, {
    Component
} from 'react';
import axios from 'axios';



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
            }
        };
    }

    componentWillMount() {
        axios.defaults.headers.common['X-Auth-Token'] = 'b408c5c69ade430f8958d8b56b89c786';

        axios.get(`http://api.football-data.org/v2/matches/${this.state.predictID}`) // MATCH DETAILS
            .then((response) => {
                let data = JSON.parse(response.request.responseText);
                this.setState({
                    ids: {
                        homeTeam: data.match.homeTeam.id,
                        awayTeam: data.match.awayTeam.id
                    },
                    homeTeam: {
                        name: data.match.homeTeam.name
                    },
                    awayTeam: {
                        name: data.match.awayTeam.name
                    }
                });
                return axios.get(`http://api.football-data.org/v2/teams/${data.match.homeTeam.id}/matches/`);
            })
            .then((response) => {
                let fixtures = JSON.parse(response.request.responseText).matches
                let newHomeTeam = this.state.homeTeam;
                newHomeTeam.fixtures = fixtures;
                this.setState({
                    homeTeam: newHomeTeam
                });
                return axios.get(`http://api.football-data.org/v2/teams/${this.state.ids.awayTeam}/matches/`);
            })
            .then((response) => {
                let fixtures = JSON.parse(response.request.responseText).matches;
                let newAwayTeam = this.state.awayTeam;
                newAwayTeam.fixtures = fixtures;
                this.setState({
                    awayTeam: newAwayTeam
                });
                return axios.get(`http://api.football-data.org/v2/teams/${this.state.ids.awayTeam}/`);
            })
            .then((response) => {
                let data = JSON.parse(response.request.responseText);
                let newAwayTeam = this.state.awayTeam;
                newAwayTeam.name = data.name;
                newAwayTeam.img = data.crestUrl;
                this.setState({
                    awayTeam: newAwayTeam
                });
                return axios.get(`http://api.football-data.org/v2/teams/${this.state.ids.homeTeam}/`);
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
    }


    render() { 
        console.log("state:", this.state);
        let f = this.state.homeTeam.fixtures || [];
        let homeTeamFixtures = f.filter((match) => {
            return (match.homeTeam.name === this.state.homeTeam.name) && match.status === "FINISHED" && match.id !== 264431;
        });
        let goalsDiffInHomeMatches = 0;
        let homeMatches = 0;

        homeTeamFixtures.map(match => {
            let { awayTeam, homeTeam } = match.score.fullTime
            goalsDiffInHomeMatches += homeTeam - awayTeam;
            homeMatches++;
            return null
        })
        let avgHomeGoals = (goalsDiffInHomeMatches / homeMatches).toFixed(2);

        let fa = this.state.awayTeam.fixtures || [];
        let awayTeamFixtures = fa.filter((match) => {
            return (match.awayTeam.name === this.state.awayTeam.name) && match.status === "FINISHED" && match.id !== 264431;
        });
        let goalsDiffInAwayMatches = 0;
        let awayMatches = 0;
        awayTeamFixtures.map(match => {
            let { awayTeam, homeTeam } = match.score.fullTime
            goalsDiffInAwayMatches += awayTeam - homeTeam;
            awayMatches++;
            return null;
        })
        let avgAwayGoals = (goalsDiffInAwayMatches / awayMatches).toFixed(2);

        let benefit = avgHomeGoals > avgAwayGoals 
            ? <span>{this.state.homeTeam.name} will win. Benefit: {(avgHomeGoals - avgAwayGoals).toFixed(2)} goals </span> 
            : <span>{this.state.awayTeam.name} will win. Benefit: {(avgAwayGoals - avgHomeGoals).toFixed(2)}</span>
        return (
            <div>
                <div className="grid-container"  >
                    <div className="grid-item one" > Домашня команда </div> 
                    <div className="grid-item two" > Прогноз на матч </div > 
                    <div className="grid-item three" > Гостьова команда </div>
                    <div className="grid-item four win" >
                        <img src={this.state.homeTeam.img} alt="img" height="300" />
                        <h2>{this.state.homeTeam.name}</h2></div>
                        <div className="grid-item five">
                            <h1>COFs</h1>
                            <h1>{avgHomeGoals}:{avgAwayGoals}</h1>
                            <h1>{(parseFloat(avgHomeGoals) / (parseFloat(avgHomeGoals) + parseFloat(avgAwayGoals))).toFixed(2)}:
                            {(parseFloat(avgAwayGoals) / (parseFloat(avgHomeGoals) + parseFloat(avgAwayGoals))).toFixed(2)}</h1>
                            <h1 className="">{benefit}</h1>
                        </div>
                    <div className="grid-item six win" >
                        <img src={this.state.awayTeam.img} alt="img" height="300" />
                        <h2> {this.state.awayTeam.name} </h2>
                    </div>

                </div>  
            </div>
        );
    }
}

export default Predict;