import axios from "axios";
import * as actionTypes from "./actions-types.js"

export const fetchVideoGames = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:3001/videogames");
        console.log("API Data:", response.data);
        dispatch({
          type: actionTypes.FETCH_VIDEO_GAMES_SUCCESS,
          payload: response.data,
        });
    } catch (error) {
        dispatch({
          type: actionTypes.FETCH_VIDEO_GAMES_FAILURE,
          payload: error.message,
        });
    }
};

export const fetchGameDetails = (id) => async (dispatch) => {
  // dispatch({ type: actionTypes.FETCH_GAME_DETAILS_REQUEST });
  console.log(id)
  try {
    const response = await axios.get(`http://localhost:3001/videogames/${id}`);
    console.log("API Data:", response.data);

    dispatch({ type: actionTypes.FETCH_GAME_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_GAME_DETAILS_FAILURE,
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
