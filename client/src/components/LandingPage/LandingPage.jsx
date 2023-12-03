/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css"; // Asegúrate de tener un archivo CSS para los estilos

const LandingPage = () => {
    return (
        <section className={styles.landingPage}>
            <div className={styles.marquee}>
                <div className={styles.marqueeGroup}>
                    <span>/ Gracias por visitar Game Explorer /</span>
                </div>
                <div className={styles.marqueeGroup} aria-hidden="true">
                    <span>/ Gracias por visitar Game Explorer /</span>
                </div>
            </div>
            <p className={styles.message}>Haz clic para</p>
            <Link to="/home">
                <button className={styles.ladingButton}>
                    <span className={styles.ladingSpan}></span>Continuar
                </button>
            </Link>
        </section>
    );
};

export default LandingPage;
