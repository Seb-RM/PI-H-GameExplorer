// videoGameReducer.js
import * as actionTypes from "../actions/actions-types.js";

const initialState = {
    videoGames: [],
    genres: [],
    gameDetails: null,
    loading: true,
    error: null,
};

const videoGameReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_VIDEO_GAMES_SUCCESS:
            return {
            ...state,
            videoGames: action.payload,
            loading: false,
            error: null,
            };

        case actionTypes.FETCH_VIDEO_GAMES_FAILURE:
            return {
            ...state,
            loading: false,
            error: action.payload,
            };

        case actionTypes.FETCH_GAME_DETAILS_SUCCESS:
            return {
            ...state,
            gameDetails: action.payload,
            loading: false,
            error: null,
            };

        case actionTypes.FETCH_GAME_DETAILS_FAILURE:
            return {
            ...state,
            loading: false,
            error: action.payload,
            };

        case actionTypes.FETCH_GENRES_SUCCESS:
            return {
            ...state,
            genres: action.payload,
            };
            
        case actionTypes.FETCH_GENRES_FAILURE:
            return {
            ...state,
            error: action.payload,
        };

      // case actionTypes.FILTER_BY_GENRE:
      // return {
      //     ...state,
      //     selectedGenre: action.payload,
      //     currentPage: 1,
      // };

      // case actionTypes.ORDER_BY:
      // return {
      //     ...state,
      //     sortBy: action.payload.sortBy,
      //     sortOrder: action.payload.sortOrder,
      //     currentPage: 1,
      // };

      // case actionTypes.PAGINATE:
      // return {
      //     ...state,
      //     currentPage: action.payload,
      // };

      default:
        return state;
    }
};

export default videoGameReducer;
