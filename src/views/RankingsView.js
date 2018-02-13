import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRankingData } from '../store/actions';
import { orderedArray, numberWithCommas } from '../components/helper';

class RankingsView extends Component {

    componentDidMount() {
        this.props.getRankingData();
    }

    render() {
        console.log("Rendering Rankings View...");
        const {ranking} = this.props;
        const sortedArray = orderedArray(ranking);
        return (
            <div>
                <h2>Rankings</h2>

                <div className="margin-vert-large margin-horiz-large">

                    {
                        sortedArray.map( (player, index) => (

                            <div key={index} className="row card">
                                <div className="small-1 medium-1 columns">
                                    <h2><strong>{index+1}</strong></h2>
                                </div>
                                <div className="small-11 medium-5 text-center columns card">

                                    <img style={ {marginBottom: 15, height: 150} } src={player.avatarUrl} alt={`${player.name}'s Avatar`} title={player.name} />
                                    <h5>{player.name ? player.name : player.login}</h5>
                                </div>

                                <div className="small-12 medium-6 columns padding-right-large">
                                    <h3><span style={ {paddingRight: 10, fontWeight: 800} }>Score: </span>{numberWithCommas(player.score)}</h3>
                                </div>
                            </div>
                        ))

                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        ranking: state.ranking,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRankingData(){
            dispatch( getRankingData() );
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RankingsView)