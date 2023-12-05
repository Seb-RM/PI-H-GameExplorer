import { useState, useEffect } from "react";
import "../styles/GameFormPage.css"
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, createVideoGame } from "../redux/actions/videoGamesActions";

const initialGameData = {
    name: "",
    rating: "",
    image: "",
    releaseDate: "",
    platforms:"",
    genres:[],
    description: "",
};

const initialErrors = {};

const GameFormPage=()=>{

  const [formSubmitted, setFormSubmitted] = useState(false);

    const dispatch = useDispatch();

    const { genres } = useSelector((state) => state.gameStates);

    useEffect(() => {
      dispatch(fetchGenres());
    }, [dispatch]);

    const [gameData, setGameData] = useState(initialGameData);
    const [errors, setErrors] = useState(initialErrors);

    const isValidUrl = (url) => {
        return url.startsWith("http://") || url.startsWith("https://");
    };

    const isValidDate = (date) => {
        const minYear = 1950;
        const enteredYear = new Date(date).getFullYear();
        return !isNaN(enteredYear) && enteredYear >= minYear;
    };

    const isValidName = (text) => {
      const symbolRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;
      return symbolRegex.test(text);
    };

  const isValidRating = (rating) => {
    const maxRating = 5;
    return (
      !isNaN(rating) && parseFloat(rating) >= 0 && parseFloat(rating) <= maxRating
    );
  };
  const validateForm = () => {
      const newErrors = {};

      // Validaciones para cada campo
      if (!gameData.name.trim()) {
          newErrors.name = "Por favor ingresa el nombre del juego.";
      }

      if (!gameData.name.trim() || isValidName(gameData.name)) {
        newErrors.name = "No puedes usar símbolos en el nombre del juego.";
      }

      if (!gameData.rating || !isValidRating(gameData.rating)) {
        newErrors.rating = "Ingresa un rating válido (máximo 5)";
      }
      
      if (!gameData.image.trim() || !isValidUrl(gameData.image)) {
          newErrors.image = "Ingresa una URL válida para la imagen.";
      }

      if (!gameData.releaseDate || !isValidDate(gameData.releaseDate)) {
          newErrors.releaseDate = "Ingresa una fecha de lanzamiento válida.";
      }

      if (!gameData.platforms.trim()) {
          newErrors.platforms = "Ingresa al menos una plataforma.";
      }

      if (gameData.description.length > 500) {
          newErrors.description =
          "La descripción debe tener menos de 500 caracteres.";
      }

      return newErrors;
  };

  const handleInputChange = (event) => {
      const { name, value, type, checked } = event.target;

    setGameData((prevData) => {
      if (type === "checkbox") {
        return {
          ...prevData,
          genres: checked
            ? [...prevData.genres, value]
            : prevData.genres.filter((genre) => genre !== value),
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };
  console.log(gameData);

    const handleSubmit = async (event) => {
      event.preventDefault();

      const newErrors = validateForm();

      if (Object.keys(newErrors).length === 0) {

        try {
          
          dispatch(createVideoGame(gameData));

          setGameData(initialGameData);
          setErrors({});

          setFormSubmitted(true);

          setTimeout(() => {

            setFormSubmitted(false);

          }, 5000);

        } catch (error) {
          setErrors({ serverError: "Error al enviar el formulario" });
        }
      } else {
        setErrors(newErrors);
      }
    };
    console.log(gameData);
    return (
      <div className="formContainer">
        <div>
          <h1>Agrega un nuevo juego</h1>
          <p>
            Ingresa los datos que pide el formulario, para agregar un nuevo
            juego a la lista.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="gameData">
            <label>
              <h4>Nombre :</h4>
            </label>
            <input
              type="text"
              name="name"
              value={gameData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div className="gameData">
            <label>
              <h4>Rating :</h4>
            </label>
            <input
              type="number"
              name="rating"
              step="0.1"
              min="1"
              max="5"
              value={gameData.rating}
              onChange={handleInputChange}
            />
            {errors.rating && <p>{errors.rating}</p>}
          </div>
          <div className="gameData">
            <label>
              <h4>Image:</h4>
            </label>
            <input
              type="url"
              name="image"
              value={gameData.image}
              onChange={handleInputChange}
            />
            {errors.image && <p>{errors.image}</p>}
          </div>
          <div className="gameData">
            <label>
              <h4>Fecha de lanzamiento :</h4>
            </label>
            <input
              type="date"
              name="releaseDate"
              value={gameData.releaseDate}
              onChange={handleInputChange}
            />
            {errors.releaseDate && <p>{errors.releaseDate}</p>}
          </div>
          <div className="gameData">
            <label>
              <h4>Plataformas :</h4>
            </label>
            <input
              type="text"
              name="platforms"
              value={gameData.platforms}
              onChange={handleInputChange}
            />
            {errors.platforms && <p>{errors.platforms}</p>}
          </div>
          <div>
            <label>
              <h4>Géneros :</h4>
            </label>
            {genres.map((genre, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={genre.id}
                  name="genres"
                  value={genre.name}
                  onChange={handleInputChange}
                />
                <label htmlFor={genre.id}>{genre.name}</label>
              </div>
            ))}
          </div>
          <div className="gameData">
            <label>
              <h4>Descripción :</h4>
            </label>
            <textarea
              name="description"
              value={gameData.description}
              onChange={handleInputChange}
            />
            {errors.description && <p>{errors.description}</p>}
          </div>
          <button type="submit">Agregar Juego</button>
          {formSubmitted && <p>¡Formulario enviado exitosamente!</p>}
        </form>
      </div>
    );
};

export default GameFormPage;