import GameCard from "./GameCard.jsx";
import { useEffect } from "react";
import { fetchVideoGames } from "../redux/actions/videoGamesActions.js";
import { useDispatch, useSelector } from "react-redux";
import "../styles/HomePage.css"

const HomePage = () => {
    const dispatch = useDispatch();
    const { videoGames, loading, error } = useSelector(
      (state) => {console.log("State:",state)
        return state.allStates}
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

    return (
      <div className="container">
        <nav></nav>
        <main>
          <h1>Main section</h1>
          <section className="cardsContainer">
            {videoGames.map((game) => (
            <GameCard
              key={game.id} /* Pasa las propiedades del videojuego */
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