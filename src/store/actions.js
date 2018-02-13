import axios from 'axios';

export const GITHUB_API_URL = "https://api.github.com/users";
export const RANKING_API_URL = "http://5a81f9892f37a900124ecc8e.mockapi.io/api/v1/users";
export const LOAD_PLAYER = "LOAD_PLAYER";
export const LOAD_RANKING = "LOAD_RANKING";
export const RESET_STATE = "RESET_STATE";
export const DATA_STATUS_HANDLER = 'DATA_STATUS_HANDLER';


export const dataResultHandler = (actionType, stateObjectType, stateObjectResult) => {
  return {
    type: actionType,
    payload: {
      type: stateObjectType,
      result: stateObjectResult
    }
  }
}

export const handlePlayerToRankings = (player, ranking) => {
  return (dispatch, getState) => {
    if( player ) {
      console.log("Attempting to add...");

      const existingPlayer = ranking.find( element => element.gitHubId === player.id);
      const updatedObj = { gitHubId: player.id, avatarUrl: player.avatar_url, score: player.score, name: player.name, login: player.login};
      existingPlayer === undefined ? dispatch(addPlayer(updatedObj)) : dispatch( editPlayer(existingPlayer.id, updatedObj) );

    }
  }
}

export const getGitHubUser = (player, search) => {
  return (dispatch, getState) => {
    dispatch( dataResultHandler(DATA_STATUS_HANDLER, `${player}Loading`, true) );
    console.log(`Getting GitHub Data... ${GITHUB_API_URL}`);

    axios.get(`${GITHUB_API_URL}/${search}`)
      .then( ({data :{id, login, name, avatar_url, followers, public_repos}}) => {
        setTimeout( () => {
          dispatch( {
            type: LOAD_PLAYER,
            payload: {
              player: player,
              result: {id, login, name, avatar_url, followers, public_repos}
            }
          });
      }, 500);

      })
      .catch( error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            //  console.log(error.response.data.message);
            //  console.log(error.response.status);
            //  console.log(error.response.headers);
            console.log(`Error Response: ${error.response}`);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(`Error Request: ${error.request}`);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(`General Error: ${error.message}`);
        }
        console.log("Error has occured in loading data...");
        console.log(error);
        dispatch( dataResultHandler(DATA_STATUS_HANDLER, `${player}LoadingError`, true) );
        dispatch( dataResultHandler(DATA_STATUS_HANDLER, `${player}Loading`, false) );

    })
  }
}

export const getRankingData = () => {
  return (dispatch, getState) => {
    dispatch( dataResultHandler(DATA_STATUS_HANDLER, 'rankingLoading', true) );
    console.log(`Getting Ranking Data... ${RANKING_API_URL}`);

    axios.get(RANKING_API_URL)
      .then( ( {data} ) => {

        //setTimeout( () => { dispatch( {type: LOAD_DATA, payload: products} ) }, 1);
      //   setTimeout( () => {
      //   dispatch( {
      //     type: LOAD_PLAYER,
      //     payload: {
      //       player: player,
      //       result: {id, login, name, avatar_url, followers, public_repos}
      //     }
      //   });
      // }, 1000);

        dispatch( {type: LOAD_RANKING, payload: data} );

      })
      .catch( error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            //  console.log(error.response.data.message);
            //  console.log(error.response.status);
            //  console.log(error.response.headers);
            console.log(`Error Response: ${error.response}`);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(`Error Request: ${error.request}`);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(`General Error: ${error.message}`);
        }
        console.log("Error has occured in loading data...");
        console.log(error);
        dispatch( dataResultHandler(DATA_STATUS_HANDLER, 'rankingError', true) );
        dispatch( dataResultHandler(DATA_STATUS_HANDLER, 'rankingLoading', false) );

    })
  }
}


export const editPlayer = (id, obj) => {
  return (dispatch, getState) => {
    console.log(`Updating Data... ${id}`);
    console.log(obj);
    axios.put(`${RANKING_API_URL}/${id}`, obj)
      .then( (response) => {
        //dispatch( {type: DATA_STATUS_HANDLER, payload: {type: 'editSuccess', result: true}} );
      })
      .catch( error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            //  console.log(error.response.data.message);
            //  console.log(error.response.status);
            //  console.log(error.response.headers);
            console.log(`Error Response: ${error.response}`);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(`Error Request: ${error.request}`);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(`General Error: ${error.message}`);
        }
        console.log("Error has occured in updating data...");
        console.log(error);
        //dispatch( {type: DATA_STATUS_HANDLER, payload: {type: 'editError', result: true}} );
    })
  }
}

// export const delete = (id) => {
//   return (dispatch, getState, url) => {
//     console.log(`Deleting Data... ${id}`);
//     axios.delete(`${url}/${id}`)
//       .then( (response) => {
//         dispatch( {type: DATA_STATUS_HANDLER, payload: {type: 'deleteSuccess', result: true}} );
//       })
//       .catch( error => {
//         if (error.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             //  console.log(error.response.data.message);
//             //  console.log(error.response.status);
//             //  console.log(error.response.headers);
//             console.log(`Error Response: ${error.response}`);
//         } else if (error.request) {
//           // The request was made but no response was received
//           // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//           // http.ClientRequest in node.js
//           console.log(`Error Request: ${error.request}`);
//         } else {
//           // Something happened in setting up the request that triggered an Error
//           console.log(`General Error: ${error.message}`);
//         }
//         console.log("Error has occured in deleteing data...");
//         console.log(error);
//         dispatch( {type: DATA_STATUS_HANDLER, payload: {type: 'deleteError', result: true}} );
//     })
//   }
// }

export const addPlayer = (obj) => {
  return (dispatch, getState) => {
    console.log('Adding user...');
    console.log(obj);
    axios.post(RANKING_API_URL, obj)
      .then( response => {
        console.log(response);
        //dispatch( {type: DATA_STATUS_HANDLER, payload: {type: 'addSuccess', result: true}} );
      })
      .catch( error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            //  console.log(error.response.data.message);
            //  console.log(error.response.status);
            //  console.log(error.response.headers);
            console.log(`Error Response: ${error.response}`);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(`Error Request: ${error.request}`);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(`General Error: ${error.message}`);
        }
        console.log("Error has occured in adding data...");
        console.log(error);
        //dispatch( {type: DATA_STATUS_HANDLER, payload: {type: 'addError', result: true}} );
    })
  }
}