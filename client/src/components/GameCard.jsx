import PropTypes from "prop-types";
import "../styles/gameCards.css";

const GameCard = ({ name, image, genres }) => {
  console.log(name);
  console.log(genres);
  return (
    <div className="game-card">
      <img src={image} alt="`${name}`" />
      <h2>{name}</h2>
      <ul>
        <span>Géneros:</span>
        {genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
      <button>Ver más...</button>
    </div>
  );
};

GameCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default GameCard;
