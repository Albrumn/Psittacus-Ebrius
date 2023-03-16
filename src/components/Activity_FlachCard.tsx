import React from 'react';
import FlashCard from "./FlashCard";

const languageModes = { ENGLISH_TO_LATIN: "English to Latin", LATIN_TO_ENGLISH: "Latin to English"};

export default function Activity_FlashCard(props: any) {
    const flipSpeed: number = 300; //milliseconds
    const [isFlipping, setIsFlipping] = React.useState(false);
    const [langMode, setLangMode] = React.useState(props.langMode);
    const [showFront, setShowFront] = React.useState(langMode === languageModes.ENGLISH_TO_LATIN);

    function flipCard() {
        if (isFlipping) return;

        setIsFlipping(true);
        setShowFront(prev => !prev);
        setTimeout(() => { setIsFlipping(false); }, flipSpeed);
    }

    function switchLangMode() {
        if (langMode === languageModes.ENGLISH_TO_LATIN)
            setLangMode(languageModes.LATIN_TO_ENGLISH);
        else
            setLangMode(languageModes.ENGLISH_TO_LATIN);
    }

    return (
        <section className="activity">
            <div className="activity-flash-card">
                <FlashCard cardData={["man", "vir"]} cardDataIndex={0} flipSpeed={flipSpeed / 2} onClick={flipCard} showFront={showFront} />
                <div className="tray">
                    <button onClick={switchLangMode}>{langMode === languageModes.ENGLISH_TO_LATIN ? "Eng. > Ltn." : "Ltn. > Eng."}</button>
                    <button onClick={flipCard}>Flip</button>
                    <button onClick={flipCard} disabled>Shuffle</button>
                </div>
            </div>
        </section>
    );
}