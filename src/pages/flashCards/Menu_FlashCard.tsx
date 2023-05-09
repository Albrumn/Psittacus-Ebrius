import "../Page.scoped.css";
import FlashCard_Deck from "../../components/FlashCard_Deck";
import deck_0 from "../../data/fc/LLPSI_1.json";
import deck_1 from "../../data/fc/LLPSI_2.json";
import deck_2 from "../../data/fc/LLPSI_3.json";

export default function Menu_FlashCard() {
    return (
        <main>
            <h2>Flash Cards</h2>
            <h3>Which deck would you like to study?</h3>
            <section>
                <FlashCard_Deck id={deck_0} length={deck_0.deck.length} name={deck_0.title} description={deck_0.description} />
                <FlashCard_Deck id={deck_1} length={deck_1.deck.length} name={deck_1.title} description={deck_1.description} />
                <FlashCard_Deck id={deck_2} length={deck_2.deck.length} name={deck_2.title} description={deck_2.description} />
            </section>
        </main>
    )
}