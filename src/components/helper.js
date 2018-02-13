import React from 'react';
import {Link, Route} from 'react-router-dom';

export const CustomNav = ( {label, to, activeOnlyWhenExact, generalClassName} ) => {
    return (
      <Route path={to} exact={activeOnlyWhenExact} children={ ({match}) => {
        return (
        <li className={`${generalClassName}${match ? ' active' : ''}`}>
          <Link to={to} style={ {fontWeight: 'normal'} }>{label}</Link>
        </li>
        )}
      } />
    );
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getScore = player => {
  return player === undefined ? 0 : (player.followers + player.public_repos) * 12;
}

export const orderedArray = array => {
  return array.sort( (a, b) => { return a.score < b.score });
}