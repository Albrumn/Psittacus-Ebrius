import React from "react";
import "../Page.scoped.css";
import FlashCard_Deck from "../../components/FlashCard_Deck";

export default function Menu_FlashCard() {
    return (
        <main>
            <h2>Flash Card Menu</h2>
            <h3>Which deck would you like to study?</h3>
            <section>
                <FlashCard_Deck id={0} name="Sample Deck 0" description="Just a small sample deck." />
                <FlashCard_Deck id={1} name="Sample Deck 1" description="Just another sample deck." />
            </section>
        </main>
    )
}