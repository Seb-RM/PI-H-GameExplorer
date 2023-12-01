// videoGameActions.js
import * as actionTypes from ".//actions-types.js";

export const fetchVideoGames = () => async (dispatch) => {
    try {
        const response = await fetch("/videogames");
        const data = await response.json();
        dispatch({ type: actionTypes.FETCH_VIDEO_GAMES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
        type: actionTypes.FETCH_VIDEO_GAMES_FAILURE,
        payload: error.message,
        });
    }
};

export const filterByGenre = (genre) => (dispatch) => {
    dispatch({ type: actionTypes.FILTER_BY_GENRE, payload: genre });
};

export const orderBy = (sortBy, sortOrder) => (dispatch) => {
    dispatch({ type: actionTypes.ORDER_BY, payload: { sortBy, sortOrder } });
};

export const paginate = (page) => (dispatch) => {
    dispatch({ type: actionTypes.PAGINATE, payload: page });
};
