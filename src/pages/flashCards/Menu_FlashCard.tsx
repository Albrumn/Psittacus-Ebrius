import React from "react";
import "../Page.scoped.css";
import { Link } from "react-router-dom";
import { SelectedFlashCard } from "../../helper/Context";
import deck_0 from "../../data/fc/_sample.json";
import deck_1 from "../../data/fc/LLPSI_1.json";

export default function Menu_FlashCard() {
    //@ts-ignore
    const {selectedFlashCard, setSelectedFlashCard} = React.useContext(SelectedFlashCard);

    return (
        <main>
            <h1>Flash Card Menu</h1>
            <section>
                <Link to="flashcards" onClick={() => {setSelectedFlashCard(deck_0)}}>
                    {deck_0.title}
                </Link>
                <Link to="flashcards" onClick={() => {setSelectedFlashCard(deck_1)}}>
                    {deck_1.title}
                </Link>
            </section>
        </main>
    )
}