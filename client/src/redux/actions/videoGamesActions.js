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

export const fetchGenres = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/genres");
    console.log("API Data:", response.data);

    dispatch({ type: actionTypes.FETCH_GENRES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: actionTypes.FETCH_GENRES_FAILURE, payload: error.message });
  }
};

export const createVideoGame = (gameData) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3001/videogames",gameData);

    dispatch({
      type: actionTypes.CREATE_VIDEO_GAME_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_VIDEO_GAME_FAILURE,
      payload: error.message,
    });
  }
};

export const sortVideoGamesByName = (order) => ({
  type: actionTypes.SORT_VIDEO_GAMES_BY_NAME, payload: order,
});

export const sortVideoGamesByRating = (order) => {
  return {
    type: actionTypes.SORT_VIDEO_GAMES_BY_RATING,
    payload: order,
  };
};

export const filterVideoGamesByGenre = (genre) => (dispatch) => {
  console.log(genre);
  dispatch({ type: actionTypes.FILTER_VIDEO_GAMES_BY_GENRE, payload: genre });
};

export const filterVideoGamesByOrigin = (origin) => (dispatch) => {
  dispatch({ type: actionTypes.FILTER_VIDEO_GAMES_BY_ORIGIN, payload: origin });
};

export const updateVideoGames = (games) => ({
  type: actionTypes.UPDATE_VIDEO_GAMES,
  payload: games,
});

export const paginate = (page) => (dispatch) => {
  dispatch({ type: actionTypes.PAGINATE, payload: page });
};
