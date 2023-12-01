/* eslint-disable no-unused-vars */
import React from "react";
import "../styles/LandingPage.css"; // Asegúrate de tener un archivo CSS para los estilos

const LandingPage = () => {
    return (
        <section className="landing-page">
        <div className="marquee">
            <span>Bienvenidos a Game Explorer</span>
        </div>
        <p>Haz clic para continuar</p>
        <button>Continuar</button>
        </section>
    );
};

export default LandingPage;
