import React from "react";
import "../Page.scoped.css";
import { Link } from "react-router-dom";
import { SelectedFlashCard } from "../../helper/Context";

export default function Menu_FlashCard() {
    //@ts-ignore
    const {selectedFlashCard, setSelectedFlashCard} = React.useContext(SelectedFlashCard);

    return (
        <main>
            <h1>Flash Card Menu</h1>
            <section>
                <Link to="flashcards" onClick={() => {setSelectedFlashCard(0)}}>
                    Sample Deck
                </Link>
                <Link to="flashcards" onClick={() => {setSelectedFlashCard(1)}}>
                    Another Sample Deck
                </Link>
            </section>
        </main>
    )
}