import videoGamesReducer from "./videoGamesReducer.js";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    gameStates: videoGamesReducer,
  
});

export default rootReducer;
