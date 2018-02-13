import { LOAD_PLAYER, LOAD_RANKING, DATA_STATUS_HANDLER, RESET_STATE } from './actions'

const battleState = {
    player1: undefined,
    player2: undefined,
    player1Loading: false,
    player2Loading: false,
    player1LoadingError: false,
    player2LoadingError: false,
    rankingLoadSuccess: false,
    rankingLoading: true,
}

const initialState = {
    ...battleState,
    ranking: [],
}


export const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_PLAYER:
            return { ...state, [action.payload.player]: action.payload.result, [`${action.payload.player}Loading`]: false};
        case LOAD_RANKING:
            return {...state, ranking: action.payload, rankingLoading: false, rankingLoadSuccess: true};
        // case ADD_PLAYER:
        //     return {...state};
        case DATA_STATUS_HANDLER:
            return { ...state, [action.payload.type]: action.payload.result, displayAlert: action.payload.result};
        case RESET_STATE:
            return { ...state, ...battleState };
        default:
            return state;
    }


}
