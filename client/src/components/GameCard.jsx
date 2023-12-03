import PropTypes from "prop-types";
import "../styles/gameCards.css";
import { Link } from "react-router-dom";

const GameCard = ({ id, name, image, genres }) => {
  console.log(name);
  console.log(genres);
  console.log(id);
  return (
    <div className="game-card">
      <img src={image} alt="`${name}`" className="cardImage" />
      <h2>{name}</h2>
      <ul>
        <span>Géneros:</span>
        {genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
      <Link to={`/detail/${id}`}>
        <button>Ver más...</button>
      </Link>
    </div>
  );
};

GameCard.propTypes = {
  id: PropTypes.number.isRequired,
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
