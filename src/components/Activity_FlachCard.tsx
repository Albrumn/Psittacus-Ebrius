import React from 'react';
import FlashCard from "./FlashCard";
import "./FlashCard.scoped.css";
import { langModes, svg } from '../constants/Global';

//@ts-ignore
export default function Activity_FlashCard() {
    const slideDirections = { AT_LEFT: "at-left", AT_RIGHT: "at-right", FROM_LEFT: "from-left", FROM_RIGHT: "from-right", PAUSE_LEFT: "pause-left", PAUSE_RIGHT: "pause-right", NONE: "none", TO_LEFT: "to-left", TO_RIGHT: "to-right", UNPAUSE_LEFT: "unpause-left", UNPAUSE_RIGHT: "unpause-right" };
    const transSpeed: number = 300; //milliseconds
    const transSpeed_half: number = transSpeed / 2; //milliseconds
    const transSpeed_tenth: number = transSpeed / 10; //milliseconds
    const [cardIndex, setCardIndex] = React.useState(0);
    const [isFlipping, setIsFlipping] = React.useState(false);
    const [isSliding, setIsSliding] = React.useState(false);
    const [langMode, setLangMode] = React.useState(langModes.TRG_TO_SRC);
    const [showControls, setShowControls] = React.useState(false);
    const [showTargetLang, setShowTargetLang] = React.useState(true);
    const [slideDirection, setSlideDirection] = React.useState(slideDirections.NONE)
    const [transitionClass, setTransitionClass] = React.useState("");

    const [deck, setDeck] = React.useState([
        { src: "man", trg: "vir" },
        { src: "woman", trg: "fēmina" },
        { src: "father", trg: "pater" },
        { src: "mother", trg: "māter" },
        { src: "boy", trg: "puer" },
        { src: "girl", trg: "puella" },
        { src: "son", trg: "fīlius" },
        { src: "daughter", trg: "fīlia" },
        { src: "older adult", trg: "senex" },
        { src: "young adult", trg: "iuvenis" }
    ]);

    function decCardIndex() {
        if (isFlipping || isSliding || cardIndex <= 0) return;

        setIsSliding(true);
        setSlideDirection(slideDirections.TO_RIGHT);
    }

    function flipCard() {
        if (isFlipping || isSliding) return;

        setIsFlipping(true);
        setShowTargetLang(prev => !prev);
        setTimeout(() => { setIsFlipping(false); }, transSpeed);
    }

    function incCardIndex() {
        if (isFlipping || isSliding || cardIndex >= deck.length - 1) return;

        setIsSliding(true);
        setSlideDirection(slideDirections.TO_LEFT);
    }

    function shuffleDeck() {
        const tempDeck = deck.slice();

        for (let i = tempDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = tempDeck[i];
            tempDeck[i] = tempDeck[j];
            tempDeck[j] = temp;
        }

        setDeck(tempDeck.slice());
        setCardIndex(0);
    }

    function switchLangMode() {
        if (langMode === langModes.SRC_TO_TRG)
            setLangMode(langModes.TRG_TO_SRC);
        else
            setLangMode(langModes.SRC_TO_TRG);
    }

    React.useEffect(() => {
        setShowTargetLang(langMode === langModes.TRG_TO_SRC);
    }, [cardIndex, langMode]);

    React.useEffect(() => {
        let tempTransitionClass: string = "";

        switch (slideDirection) {
            case slideDirections.AT_LEFT:
                tempTransitionClass = "flash-card-slide-left";
                setCardIndex(prev => prev + 1);
                setTimeout(() => { setSlideDirection(slideDirections.PAUSE_RIGHT); }, transSpeed_tenth);
                break;
            case slideDirections.AT_RIGHT:
                tempTransitionClass = "flash-card-slide-right";
                setCardIndex(prev => prev - 1);
                setTimeout(() => { setSlideDirection(slideDirections.PAUSE_LEFT); }, transSpeed_tenth);
                break;
            case slideDirections.FROM_LEFT:
            case slideDirections.FROM_RIGHT:
                tempTransitionClass = "flash-card-slide-trans";
                setTimeout(() => {setSlideDirection(slideDirections.NONE)}, transSpeed_half);
                break;
            case slideDirections.PAUSE_LEFT:
                tempTransitionClass = "flash-card-slide-left";
                setTimeout(() => { setSlideDirection(slideDirections.UNPAUSE_LEFT); }, transSpeed_tenth);
                break;
            case slideDirections.PAUSE_RIGHT:
                tempTransitionClass = "flash-card-slide-right";
                setTimeout(() => { setSlideDirection(slideDirections.UNPAUSE_RIGHT); }, transSpeed_tenth);
                break;
            case slideDirections.TO_LEFT:
                tempTransitionClass = "flash-card-slide-trans flash-card-slide-left";
                setTimeout(() => {setSlideDirection(slideDirections.AT_LEFT)}, transSpeed_half);
                break;
            case slideDirections.TO_RIGHT:
                tempTransitionClass = "flash-card-slide-trans flash-card-slide-right";
                setTimeout(() => {setSlideDirection(slideDirections.AT_RIGHT)}, transSpeed_half);
                break;
            case slideDirections.UNPAUSE_LEFT:
                tempTransitionClass = "flash-card-slide-trans flash-card-slide-left";
                setSlideDirection(slideDirections.FROM_LEFT);
                break;
            case slideDirections.UNPAUSE_RIGHT:
                tempTransitionClass = "flash-card-slide-trans flash-card-slide-right";
                setSlideDirection(slideDirections.FROM_RIGHT);
                break;
            case slideDirections.NONE:
            default:
                tempTransitionClass = "";
                setIsSliding(false);
                break;
        }

        setTransitionClass(tempTransitionClass);
    }, [slideDirection]);

    return (
        <section className="activity">
            <div className="activity-flash-card">
                <p>Sample Unit — Flash Cards</p>
                <FlashCard
                    cardData={deck[cardIndex]}
                    cardDataIndex={0}
                    cardIndex={cardIndex}
                    decCardIndex={decCardIndex}
                    deckLength={deck.length}
                    flip={flipCard}
                    flipSpeed={transSpeed / 2}
                    incCardIndex={incCardIndex}
                    isSliding={isSliding}
                    showTargetLang={showTargetLang}
                    slideClass={transitionClass} />
                <div className="tray tray-grid">
                    {showControls && <div className={showControls ? "" : " hide-controls"}>
                        <button disabled={cardIndex === 0} onClick={decCardIndex}>{svg.BACK}<span className="tooltip">previous card</span></button>
                        <button onClick={flipCard}>{svg.FLIP}<span className="tooltip">flip card</span></button>
                        <button disabled={cardIndex === deck.length - 1} onClick={incCardIndex}>{svg.NEXT}<span className="tooltip">next card</span></button>
                    </div>}
                    <div>
                        <button onClick={switchLangMode}>{svg.LANGUAGE}<span className="tooltip">{langMode === langModes.SRC_TO_TRG ? "english to latin" : "latin to english"}</span></button>
                        <button onClick={shuffleDeck} onMouseOver={() => {}}>{svg.SHUFFLE}<span className="tooltip">shuffle deck</span></button>
                        <button onClick={() => setShowControls(prev => !prev)}>{svg.MORE}<span className="tooltip">show {showControls ? "less" : "more"}</span></button>
                    </div>
                </div>
            </div>
        </section>
    );
}