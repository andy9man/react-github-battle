import React, { Component } from 'react';
import './App.css';
import {
  Switch,
  Route
} from 'react-router-dom';
import {Navigation as Nav} from './components/nav';
import BattleView from './views/BattleView';
import ResultView from './views/ResultView';
import RankingsView from './views/RankingsView';

class App extends Component {
  render() {
    return (
      <div className="App padding-vert-xlarge padding-horiz-xlarge">
        <Nav style={ {float: 'right', marginRight: 25} } />
        <h1><strong>GitHub Battle Royale</strong></h1>

        <div className="row">
          <div className="small-12 medium-11 large-10 medium-centered columns">
            <Switch>
              <Route exact path='/' component={BattleView} />
              <Route exact path='/results' component={ResultView} />
              <Route exact path='/rankings' component={RankingsView} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
