/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css"; // Asegúrate de tener un archivo CSS para los estilos

const LandingPage = () => {
    return (
        <section className="landing-page">
            <div className="marquee">
                <div className="marquee__group">
                    <span>/ Gracias por visitar Game Explorer /</span>
                </div>
                <div className="marquee__group" aria-hidden="true">
                    <span>/ Gracias por visitar Game Explorer /</span>
                </div>
            </div>
            <p className="message">Haz clic para</p>
            <Link to="/home">
            <button className="button">
                <span className="span"></span>Continuar
            </button>
            </Link>
        </section>
    );
};

export default LandingPage;
