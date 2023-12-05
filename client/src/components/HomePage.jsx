import GameCard from "./GameCard.jsx";
import { useEffect } from "react";
import { fetchVideoGames } from "../redux/actions/videoGamesActions.js";
import { useDispatch, useSelector } from "react-redux";
import "../styles/HomePage.css"

const HomePage = () => {
    const dispatch = useDispatch();
    const { videoGames, loading, error } = useSelector(
      (state) => {console.log("State:",state)
        return state.gameStates}
    );
      
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
            <label>Ordenar por genero:</label>
            <input type="list" />
          </div>
          <div>
            <label>Ordenar por origen:</label>
            <input type="list" />
          </div>
          <div>
            <label>Ordenar por nombre:</label>
            <input type="button" value="Ascendente" />
            <input type="button" value="Descendente" />
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