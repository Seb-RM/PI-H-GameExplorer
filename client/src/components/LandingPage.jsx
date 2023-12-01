/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css"; // Asegúrate de tener un archivo CSS para los estilos

const LandingPage = () => {
    return (
        <section className="landing-page">
            <div className="marquee">
                <span>Bienvenidos a Game Explorer</span>
            </div>
            <p className="message">Haz clic para continuar</p>
            <Link>
                <button className="button">
                    <span></span>Continuar
                </button>
            </Link>
        </section>
    );
};

export default LandingPage;
