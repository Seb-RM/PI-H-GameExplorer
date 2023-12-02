import axios from "axios";
import {
    FETCH_VIDEO_GAMES_SUCCESS,
    FETCH_VIDEO_GAMES_FAILURE,
    FILTER_BY_GENRE,
    ORDER_BY,
    PAGINATE,
} from "./actions-types.js";

export const fetchVideoGames = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:3001/videogames");
        console.log("API Data:", response.data);
        dispatch({ type: FETCH_VIDEO_GAMES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
        type: FETCH_VIDEO_GAMES_FAILURE,
        payload: error.message,
        });
    }
};

export const filterByGenre = (genre) => (dispatch) => {
  dispatch({ type: FILTER_BY_GENRE, payload: genre });
};

export const orderBy = (sortBy, sortOrder) => (dispatch) => {
  dispatch({ type: ORDER_BY, payload: { sortBy, sortOrder } });
};

export const paginate = (page) => (dispatch) => {
  dispatch({ type: PAGINATE, payload: page });
};
