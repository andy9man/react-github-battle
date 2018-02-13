import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getGitHubUser, RESET_STATE} from '../store/actions';

class Player extends Component {
    constructor(props){
        super(props)

        this.state = {
            input: ''
        }
    }

    componentDidMount() {

    }

    render(){
        return(
            <div className="card">
                <h2>{this.props.name}</h2>

                <div style={ {height: 275} } className="padding-vert-medium padding-horiz-medium">

                    {
                        this.props.loading ?
                            <div className="loader">
                                <span className="loading-indicator medium"></span>
                            </div>

                        :

                            this.props.player === undefined ?
                                <form onSubmit={
                                    (e) => {
                                        e.preventDefault();
                                        this.props.getGitHubUser(this.props.playerId, this.state.input)
                                        this.setState({input: ''});
                                    }}>
                                    <div className="row">
                                        <div className="small-12 columns">
                                            <div className="md-text-field with-floating-label">
                                                <input
                                                    type="text"
                                                    id={`${this.props.playerId}Input`}
                                                    value={this.state.input}
                                                    className={this.props.error ? 'has-error' : ''}
                                                    onInput={(e) => (
                                                        this.setState({ input: e.target.value })
                                                    )}
                                                    required
                                                />
                                                <label htmlFor={`${this.props.playerId}Input`}>GitHub Username</label>
                                                {this.props.error && <small className="error">There was an issue finding that GitHub user.</small>}
                                                <button className="margin-top-small button btn-cta expand">Get User</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            :
                                <div className="row text-center">
                                    <img style={ {height: 125, marginBottom: 15} } src={this.props.player.avatar_url} alt={`${this.props.player.name}'s Avatar`} title={this.props.player.name} />
                                    <h3>{this.props.player.name ? this.props.player.name : this.props.player.login}</h3>
                                </div>
                        }
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        player: state[ownProps.playerId],
        loading: state[`${ownProps.playerId}Loading`],
        error: state[`${ownProps.playerId}LoadingError`],
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getGitHubUser(player, username){
            dispatch( getGitHubUser(player, username) );
        },
        resetState() {
            dispatch( {type: RESET_STATE} );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
