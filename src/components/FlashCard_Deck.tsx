import React from 'react';
import { Link } from "react-router-dom";
import { SelectedFlashCard } from "../helper/Context";
import "./FlashCard_Deck.scoped.css";

export default function FlashCard_Deck(props: any) {
    //@ts-ignore
    const {selectedFlashCard, setSelectedFlashCard} = React.useContext(SelectedFlashCard);

    return (
            <Link to="flashcards" onClick={() => {setSelectedFlashCard(props.id)}}>
        <div className="flashcard-deck">
                    <h2>{props.name}</h2>
                    <p>{props.description}</p>
        </div>
            </Link>
    );
}