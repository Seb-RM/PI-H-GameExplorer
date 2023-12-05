import * as actionTypes from "../actions/actions-types.js";

const initialState = {
    videoGames: [],
    genres: [],
    gameDetails: null,
    loading: true,
    error: null,
    filteredGames: [],
    selectedOrigin: "all",
    selectedGenre: "all",
    originalVideoGames: [],
};

const videoGameReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.FETCH_VIDEO_GAMES_SUCCESS:
        return {
          ...state,
          videoGames: action.payload,
          originalVideoGames: action.payload,
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

      case actionTypes.SORT_VIDEO_GAMES_BY_NAME: {
        const sortedGames = [...state.videoGames].sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          if (action.payload === "asc") {
            return nameA.localeCompare(nameB);
          } else if (action.payload === "desc") {
            return nameB.localeCompare(nameA);
          }

          return 0;
        });

        return {
          ...state,
          videoGames: sortedGames,
        };
      }

      case actionTypes.SORT_VIDEO_GAMES_BY_RATING: {
        const sortedByRating = [...state.videoGames].sort((gameA, gameB) => {
          const ratingA = parseFloat(gameA.rating);
          const ratingB = parseFloat(gameB.rating);
          return action.payload === "asc"
            ? ratingA - ratingB
            : ratingB - ratingA;
        });

        return {
          ...state,
          videoGames: sortedByRating,
        };
      }

      case actionTypes.FILTER_VIDEO_GAMES_BY_GENRE: {
        const genre = action.payload;
        console.log(genre);
        const filteredGames = state.videoGames.filter((game) => {
          return game.genres.includes(genre);
        });
        if(genre === "all"){
            return {
                ...state,
                videoGameReducer: state.videoGames,
            }
        }
        return {
          ...state,
          videoGames: filteredGames,
        };
      }

      case actionTypes.FILTER_VIDEO_GAMES_BY_ORIGIN:{
        const  origin = action.payload;
        console.log(origin)
        console.log(initialState.filteredGames);
        if (origin === "api") {
          return {
            ...state,
            filteredGames: state.videoGames.filter(
              (game) => game.id.length !== 36
            ),
            selectedOrigin: "api",
          };
        } else if (origin === "database") {
          
          return {
            ...state,
            filteredGames: state.videoGames.filter(
              (game) => game.id.length === 36
            ),
            selectedOrigin: "database",
          };
        } else {
          return {
            ...state,
            filteredGames: state.videoGames,
            selectedOrigin: "all",
          };
        }
    }
    
    case actionTypes.UPDATE_VIDEO_GAMES:
      return {
        ...state,
        videoGames: action.payload,
      };

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
