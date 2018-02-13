import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRankingData, handlePlayerToRankings } from '../store/actions';
import Player from '../components/player';
import { getScore } from '../components/helper';

class BattleView extends Component {
    componentDidMount() {
        this.props.resetBattle();
        this.props.getRankingData();
    }

    render() {
        console.log("Rendering Battle View...");
        return (
            <div>
                <h2>Battle Time</h2>

                <div className="margin-vert-large margin-horiz-large">
                    <div className="row">
                        <div className="small-12 medium-6 columns">
                            <Player playerId="player1" name="Player 1" />
                        </div>

                        <div className="small-12 medium-6 columns">
                            <Player playerId="player2" name="Player 2" />
                        </div>
                    </div>
                    <div className="row margin-top-large">
                        <div className="small-12 columns">
                            { (!(this.props.player1 === undefined) && !(this.props.player2 === undefined) ) &&
                                <button className="button btn-cta warning expand" onClick={ () => {
                                    const {player1, player2, ranking} = this.props;


                                    this.props.handlePlayer({...player1, score: getScore(player1)}, ranking);
                                    this.props.handlePlayer({...player2, score: getScore(player2)}, ranking);

                                    this.props.history.push("/results");
                                }}>BATTLE!</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        player1: state.player1,
        player2: state.player2,
        ranking: state.ranking

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRankingData(){
            dispatch( getRankingData() );
        },
        handlePlayer( player, ranking ) {
            dispatch( handlePlayerToRankings( player, ranking ) );
        },
        resetBattle() {
            dispatch( {type: "RESET_STATE"} );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BattleView)