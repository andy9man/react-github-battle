import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { getScore, numberWithCommas } from '../components/helper';

class ResultsView extends Component {

    render() {
        console.log("Rendering Results View...")

        const {player1, player2} = this.props;

        let winner, loser;
        if( getScore(player1) >= getScore(player2) ) {
            winner = player1;
            loser = player2;
        }
        else {
            winner = player2;
            loser = player1;
        }

        return (
            <div>
                {
                    (player1 === undefined || player2 === undefined) ? <Redirect to="/" /> :
                    <div>
                        <h2>Battle Results</h2>

                        <div className="margin-vert-large margin-horiz-large">
                            <div className="row">
                                <div className="small-12 medium-6 columns">

                                    <h1 style={ {color: 'green', fontWeight: 800}}>Winner</h1>
                                    <p className="winner margin-vert-medium">
                                        <span><strong>{winner.name ? winner.name : winner.login}</strong></span> <span>( Score:&nbsp;&nbsp; {numberWithCommas( getScore(winner) )} )</span>
                                    </p>

                                    <h1 style={ {color: 'red', fontWeight: 800}}>Loser</h1>
                                    <p className="loser margin-vert-medium">
                                        <span><strong>{loser.name ? loser.name : loser.login}</strong></span> <span>( Score:&nbsp;&nbsp; {numberWithCommas( getScore(loser) )} )</span>
                                    </p>

                                </div>

                                <div className="small-12 medium-6 columns text-center card">

                                    <img style={ {marginBottom: 15} } src={winner.avatar_url} alt={`${winner.name}'s Avatar`} title={winner.name} />
                                    <h3>{winner.name}</h3>

                                </div>
                            </div>
                            <div className="row margin-top-large">
                                <div className="small-12 columns">
                                    <button className="button btn-cta expand" onClick={() => {
                                        this.props.resetBattle();
                                        this.props.history.push("/");
                                    }}>Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        player1: state.player1,
        player2: state.player2,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetBattle() {
            dispatch( {type: "RESET_STATE"} );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsView)