import GameCard from "./GameCard.jsx";
import { useEffect, useState } from "react";
import { fetchVideoGames, sortVideoGamesByName, sortVideoGamesByRating, filterVideoGamesByGenre, fetchGenres,filterVideoGamesByOrigin, updateVideoGames } from "../redux/actions/videoGamesActions.js";
import { useDispatch, useSelector } from "react-redux";
import "../styles/HomePage.css"

const HomePage = () => {

    const dispatch = useDispatch();

    const { videoGames, loading, error } = useSelector(
      (state) => {console.log("State:",state)
        return state.gameStates}
    );
      
    const { genres } = useSelector((state) => state.gameStates);

    const { selectedOrigin, selectedGenre, filteredGames, originalVideoGames } = useSelector((state) => state.gameStates);

    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
      dispatch(fetchVideoGames())
    }, [dispatch]);
    
    useEffect(() => {
      dispatch(updateVideoGames(filteredGames));
    }, [dispatch, filteredGames]);
    
    useEffect(() => {
      dispatch(fetchGenres());
    }, [dispatch]);

    if (loading) {
      return <p>Cargando...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

     const elementsPerPage = 15;
     const totalElements = videoGames.length;
     const totalPages = Math.ceil(totalElements / elementsPerPage);

     console.log(totalElements);
     console.log(totalPages)
     const startIndex = (currentPage - 1) * elementsPerPage;
     const endIndex = startIndex + elementsPerPage;
     const visibleGames = videoGames.slice(startIndex, endIndex);

   const handleSortByName = (order) => {
      dispatch(sortVideoGamesByName(order));
   };

    const handleSortByRating = (order) => {
      dispatch(sortVideoGamesByRating(order));
    };

    const handleFilterByGenre = () => {
      const { value } = event.target;
        dispatch(filterVideoGamesByGenre(value));
    };

    const handleOriginFilterChange = (event) => {
      const { value } = event.target;
      dispatch(filterVideoGamesByOrigin(value));
    };

     const handleClearFilters = () => {
  
       dispatch(filterVideoGamesByOrigin(''));
       dispatch(filterVideoGamesByGenre("all")); 
      dispatch(updateVideoGames(originalVideoGames));
     };

     const handlePageChange = (newPage) => {
       setCurrentPage(newPage);
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
            <select value={selectedGenre} onChange={handleFilterByGenre}>
              <option value="all">Todos</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Ordenar por origen:</label>
            <select value={selectedOrigin} onChange={handleOriginFilterChange}>
              <option value="all">Todos</option>
              <option value="api">API</option>
              <option value="database">Base de datos</option>
            </select>
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
          <button onClick={handleClearFilters}>Limpiar Filtros</button>
        </nav>
        <main>
          <section className="cardsContainer">
            {visibleGames.map((game, index) => (
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
        <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>{currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={endIndex >= videoGames.length}>
          Siguiente
        </button>
      </div>
      </div>
    );
};

export default HomePage;