import React from 'react';
import Declension from './Declension';
import FlashCard from "./FlashCard";
import "./FlashCard.scoped.css";
import { langModes, partsOfSpeech, svg } from '../constants/Global';

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
    const [showDeclension, setShowDeclension] = React.useState(false);
    const [showTargetLang, setShowTargetLang] = React.useState(true);
    const [slideDirection, setSlideDirection] = React.useState(slideDirections.NONE)
    const [transitionClass, setTransitionClass] = React.useState("");

    const [deck, setDeck] = React.useState([
        { src: "man", trg: "vir", dec: 2, loc: undefined, prt: partsOfSpeech.NOUN },
        { src: "woman", trg: "fēmina", dec: 1, prt: partsOfSpeech.NOUN },
        { src: "father", trg: "pater", dec: 3, prt: partsOfSpeech.NOUN },
        { src: "mother", trg: "māter", dec: 3, prt: partsOfSpeech.NOUN },
        { src: "husband", trg: "marītus", dec: 2, prt: partsOfSpeech.NOUN },
        { src: "wife", trg: "uxor", dec: 3, prt: partsOfSpeech.NOUN },
        { src: "boy", trg: "puer", dec: 2, prt: partsOfSpeech.NOUN },
        { src: "girl", trg: "puella", dec: 1, prt: partsOfSpeech.NOUN },
        { src: "son", trg: "fīlius", dec: 2, voc: "fīlī", prt: partsOfSpeech.NOUN },
        { src: "daughter", trg: "fīlia", dec: 1, prt: partsOfSpeech.NOUN },
        { src: "older adult", trg: "senex", dec: 3, prt: partsOfSpeech.NOUN },
        { src: "young adult", trg: "iuvenis", dec: 3, prt: partsOfSpeech.NOUN },
        { src: "men", trg: "virī", dec: 2, prt: partsOfSpeech.NOUN },
        { src: "women", trg: "fēminae", dec: 1, prt: partsOfSpeech.NOUN },
        { src: "fathers", trg: "patrēs", dec: 3, prt: partsOfSpeech.NOUN },
        { src: "mothers", trg: "mātrēs", dec: 3, prt: partsOfSpeech.NOUN },
        { src: "husbands", trg: "marītī", dec: 2, prt: partsOfSpeech.NOUN },
        { src: "wives", trg: "uxorēs", dec: 3, prt: partsOfSpeech.NOUN },
        { src: "boys", trg: "puerī", dec: 2, prt: partsOfSpeech.NOUN },
        { src: "girls", trg: "puellae", dec: 1, prt: partsOfSpeech.NOUN },
        { src: "sons", trg: "fīliī", dec: 2, voc: "fīlī", prt: partsOfSpeech.NOUN },
        { src: "daughters", trg: "fīliae", dec: 1, prt: partsOfSpeech.NOUN },
        { src: "older adults", trg: "senēs", dec: 3, prt: partsOfSpeech.NOUN },
        { src: "young adults", trg: "iuvenēs", dec: 3, prt: partsOfSpeech.NOUN }
    ]);

    function decline(): any {
        const term = deck[cardIndex].trg;
        switch (deck[cardIndex].dec) {
            case 1:
                if (term.substring(term.length - 1) === "a") {
                    const stem = term.substring(0, term.length - 1);
                    return { nom: stem + "a", gen: stem + "ae", dat: stem + "ae", acc: stem + "am", abl: stem + "ā", voc: deck[cardIndex].voc || stem + "a", loc: deck[cardIndex].loc };
                }
                if (term.substring(term.length - 2) === "ae") {
                    const stem = term.substring(0, term.length - 2);
                    return { nom: stem + "ae", gen: stem + "ārum", dat: stem + "īs", acc: stem + "ās", abl: stem + "īs", voc: deck[cardIndex].voc || stem + "ae", loc: deck[cardIndex].loc };
                }
                return {};
            case 2:
                if (term.substring(term.length - 2) === "us") {
                    const stem = term.substring(0, term.length - 2);
                    return { nom: stem + "us", gen: stem + "ī", dat: stem + "ō", acc: stem + "um", abl: stem + "ō", voc: deck[cardIndex].voc || stem + "e", loc: deck[cardIndex].loc };
                }
                if (term.substring(term.length - 1) === "r") {
                    const stem = term.substring(0, term.length - 1);
                    return { nom: stem + "r", gen: stem + "rī", dat: stem + "rō", acc: stem + "rum", abl: stem + "rō", voc: deck[cardIndex].voc || stem + "r", loc: deck[cardIndex].loc };
                }
                if (term.substring(term.length - 1) === "ī") {
                    const stem = term.substring(0, term.length - 1);
                    return { nom: stem + "ī", gen: stem + "ōrum", dat: stem + "īs", acc: stem + "ōs", abl: stem + "īs", voc: deck[cardIndex].voc || stem + "ī", loc: deck[cardIndex].loc };
                }
                return {};
            case 3:
                if (term.substring(term.length - 2) === "er") {
                    const stem = term.substring(0, term.length - 2);
                    return { nom: stem + "er", gen: stem + "ris", dat: stem + "rī", acc: stem + "rem", abl: stem + "re", voc: deck[cardIndex].voc || stem + "er", loc: deck[cardIndex].loc };
                }
                if (term.substring(term.length - 2) === "ex") {
                    const stem = term.substring(0, term.length - 2);
                    return { nom: stem + "ex", gen: stem + "is", dat: stem + "ī", acc: stem + "em", abl: stem + "e", voc: deck[cardIndex].voc || stem + "ex", loc: deck[cardIndex].loc };
                }
                if (term.substring(term.length - 2) === "is") {
                    const stem = term.substring(0, term.length - 2);
                    return { nom: stem + "is", gen: stem + "is", dat: stem + "ī", acc: stem + "em", abl: stem + "e", voc: deck[cardIndex].voc || stem + "is", loc: deck[cardIndex].loc };
                }
                if (term.substring(term.length - 2) === "or") {
                    const stem = term.substring(0, term.length - 2);
                    return { nom: stem + "or", gen: stem + "ōris", dat: stem + "ōrī", acc: stem + "ōrem", abl: stem + "ōre", voc: deck[cardIndex].voc || stem + "or", loc: deck[cardIndex].loc };
                }
                if (term.substring(term.length - 2) === "us") {
                    const stem = term.substring(0, term.length - 2);
                    return { nom: stem + "us", gen: stem + "oris", dat: stem + "orī", acc: stem + "us", abl: stem + "ore", voc: deck[cardIndex].voc || stem + "us", loc: deck[cardIndex].loc };
                }
                /* plural */
                if (term.substring(term.length - 2) === "ēs") {
                    const stem = term.substring(0, term.length - 2);
                    return { nom: stem + "ēs", gen: stem + "um", dat: stem + "ibus", acc: stem + "ēs", abl: stem + "ibus", voc: deck[cardIndex].voc || stem + "ēs", loc: deck[cardIndex].loc };
                }
                if (term.substring(term.length - 1) === "a") {
                    const stem = term.substring(0, term.length - 1);
                    return { nom: stem + "a", gen: stem + "um", dat: stem + "ibus", acc: stem + "a", abl: stem + "ibus", voc: deck[cardIndex].voc || stem + "a", loc: deck[cardIndex].loc };
                }
                return {};
            default:
                return {};
        }
    }

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
                        {deck[cardIndex].prt === partsOfSpeech.VERB &&<button onClick={decCardIndex}>{svg.CONJUGATION}<span className="tooltip">show conjugation</span></button>}
                        {deck[cardIndex].prt === partsOfSpeech.NOUN &&<button onClick={() => setShowDeclension(true)}>{svg.DECLENSION}<span className="tooltip">show declension</span></button>}
                        <button onClick={() => setShowControls(prev => !prev)}>{svg.MORE}<span className="tooltip">show {showControls ? "less" : "more"}</span></button>
                    </div>
                </div>
            </div>
            {showDeclension === true && <Declension term={decline()} hide={() => setShowDeclension(false)} />}
        </section>
    );
}