import videoGamesReducer from "./videoGamesReducer.js";
import { combineReducers } from "redux";
// Combina los reducers aquí si tienes más de uno
const rootReducer = combineReducers({
    gameStates: videoGamesReducer,
  // ... otros reducers si los tienes
});

export default rootReducer;
