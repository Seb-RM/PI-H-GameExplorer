import { useParams, Link } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameDetails } from "../../redux/actions/videoGamesActions.js";
import styles from "./DetailPage.module.css";

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { gameDetails, loading, error } = useSelector(
    (state) => state.gameStates
  );
  console.log(id);

  useEffect(() => {
    dispatch(fetchGameDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  console.log(gameDetails);
  return (
    <div className={styles.container}>
      <section className={styles.detailSection}>
        <Link to="/home">
          <button className={styles.detailButton}>
            Volver
          </button>
        </Link>
        <h1 className={styles.title}>{gameDetails.name}</h1>
        <div className={styles.dataContainer}>
          <div className={styles.data}>
            <div>
              <h4>Id : </h4>
              <span>{gameDetails.id}</span>
            </div>
            <div>
              <h4>Fecha de lanzamiento : </h4>
              <span>{gameDetails.releaseDate}</span>
            </div>
            <div>
              <h4>Rating : </h4>
              <span>{gameDetails.rating}</span>
            </div>
            <div>
              <h4>Plataformas : </h4>
              {gameDetails.platforms.map((platform, index) => (
                <Fragment key={index}>
                  {index > 0 && ", "}
                  <span>{platform}</span>
                  {index === gameDetails.platforms.length - 1 && "."}
                </Fragment>
              ))}
            </div>
            <div>
              <h4>Géneros : </h4>
              {gameDetails.genres.map((genre, index) => (
                <Fragment key={index}>
                  {index > 0 && ", "}
                  <span>{genre}</span>
                  {index === gameDetails.genres.length - 1 && "."}
                </Fragment>
              ))}
            </div>
          </div>
          <img src={gameDetails.image} alt="`${name}`" />
        </div>
        <div className={styles.description}>
          <h3>Descripción : </h3>
          <div>{gameDetails.description}</div>
        </div>
      </section>
    </div>
  );
};

export default DetailPage;
