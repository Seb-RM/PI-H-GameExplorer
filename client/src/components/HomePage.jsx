import GameCard from "./GameCard.jsx";
import { useEffect,useState } from "react";
import { fetchVideoGames, sortVideoGamesByName, sortVideoGamesByRating, filterVideoGamesByGenre, fetchGenres } from "../redux/actions/videoGamesActions.js";
import { useDispatch, useSelector } from "react-redux";
import "../styles/HomePage.css"

const HomePage = () => {

    const dispatch = useDispatch();
    const { videoGames, loading, error } = useSelector(
      (state) => {console.log("State:",state)
        return state.gameStates}
    );
      
    const { genres } = useSelector((state) => state.gameStates);
    
    const [selectedGenre, setSelectedGenre] = useState("");

    useEffect(() => {
      dispatch(fetchGenres());
    }, [dispatch]);


    useEffect(() => {
      dispatch(fetchVideoGames());
    }, [dispatch]);

    if (loading) {
      return <p>Cargando...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }
    console.log(videoGames);
    videoGames.map((game)=>{
      console.log(game.id);
    console.log(game.name);
  console.log(game.genres);})

   const handleSortByName = (order) => {
      dispatch(sortVideoGamesByName(order));
   };

    const handleSortByRating = (order) => {
      dispatch(sortVideoGamesByRating(order));
    };

    const handleGenreChange = (event) => {
      setSelectedGenre(event.target.value);
      console.log("Selected Genre:", event.target.value);
    };

    const handleFilterByGenre = () => {
      if (selectedGenre === "All") {
        
        dispatch(fetchVideoGames());
      } else {
        
        dispatch(filterVideoGamesByGenre(selectedGenre));
      }
    };
    
    return (
      <div className="homeContainer">
        <div className="homeTitle">
          <h1>Game Explorer</h1>
        </div>
        <nav>
          <div>
            <label>Buscar:</label>
            <input type="search" />
          </div>
          <div>
            <label htmlFor="genres">Filtrar por género:</label>
            <input
              list="genreList"
              id="genres"
              name="genres"
              value={selectedGenre}
              onChange={handleGenreChange}
            />
            <datalist id="genreList">
              <option value="All" />
              {genres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </datalist>
            <button onClick={handleFilterByGenre}>Filtrar</button>
          </div>
          <div>
            <label>Ordenar por origen:</label>
            <input type="list" />
          </div>
          <div>
            <label>Ordenar por nombre:</label>
            <button onClick={() => handleSortByName("asc")}>Ascendente</button>
            <button onClick={() => handleSortByName("desc")}>
              Descendente
            </button>
          </div>
          <div>
            <label>Ordenar por Rating:</label>
            <button onClick={() => handleSortByRating("asc")}>
              Ascendente
            </button>
            <button onClick={() => handleSortByRating("desc")}>
              Descendente
            </button>
          </div>
        </nav>
        <main>
          <section className="cardsContainer">
            {videoGames.map((game, index) => (
              <GameCard
                key={index}
                id={game.id}
                name={game.name}
                image={game.image}
                genres={game.genres}
              />
            ))}
          </section>
          <div></div>
        </main>
      </div>
    );
};

export default HomePage;