import GameCard from "./GameCard.jsx";
import{ useEffect } from "react";
import "../styles/HomePage.css"

const HomePage = () => {
    return (
        <div className="container">
            <nav></nav>
            <main>
            <section>
                <GameCard />
            </section>
            <div></div>
            </main>

        </div>
    );
};

export default HomePage;