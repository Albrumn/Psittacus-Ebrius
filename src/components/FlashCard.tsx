import React from 'react';
import "./FlashCard.scoped.css";
import { appModes } from '../constants/Global';

export default function FlashCard(props: any) {
    const flipSpeed = props.flipSpeed;
    const [hideSourceLang, setHideSourceLang] = React.useState(false);
    const [hideTargetLang, setHideTargetLang] = React.useState(false);
    const [showSourceLang, setShowSourceLang] = React.useState(!props.showTargetLang);
    const [showTargetLang, setShowTargetLang] = React.useState(props.showTargetLang);

    function decline(): any {
        const term = props.cardData.trg;
        switch (props.cardData.dec) {
            case 1:
                if (term.substring(term.length - 1) === "a") {
                    const stem = term.substring(0, term.length - 1);
                    return { nom: stem + "a", gen: stem + "ae", dat: stem + "ae", acc: stem + "am", abl: stem + "ā", voc: term.voc || stem + "a", loc: term.loc };
                }
                if (term.substring(term.length - 2) === "ae") {
                    const stem = term.substring(0, term.length - 2);
                    return { nom: stem + "ae", gen: stem + "ārum", dat: stem + "īs", acc: stem + "ās", abl: stem + "īs", voc: term.voc || stem + "ae", loc: term.loc };
                }
                return {};
            case 2:
                if (term.substring(term.length - 2) === "us") {
                    const stem = term.substring(0, term.length - 2);
                    return { nom: stem + "us", gen: stem + "ī", dat: stem + "ō", acc: stem + "um", abl: stem + "ō", voc: term.voc || stem + "e", loc: term.loc };
                }
                if (term.substring(term.length - 1) === "r") {
                    const stem = term.substring(0, term.length - 1);
                    return { nom: stem + "r", gen: stem + "rī", dat: stem + "rō", acc: stem + "rum", abl: stem + "rō", voc: term.voc || stem + "r", loc: term.loc };
                }
                if (term.substring(term.length - 1) === "ī") {
                    const stem = term.substring(0, term.length - 1);
                    return { nom: stem + "ī", gen: stem + "ōrum", dat: stem + "īs", acc: stem + "ōs", abl: stem + "īs", voc: term.voc || stem + "ī", loc: term.loc };
                }
                return {};
            case 3:
                if (term.substring(term.length - 2) === "er") {
                    const stem = term.substring(0, term.length - 2);
                    return { nom: stem + "er", gen: stem + "ris", dat: stem + "rī", acc: stem + "rem", abl: stem + "re", voc: term.voc || stem + "er", loc: term.loc };
                }
                if (term.substring(term.length - 2) === "ex") {
                    const stem = term.substring(0, term.length - 2);
                    return { nom: stem + "ex", gen: stem + "is", dat: stem + "ī", acc: stem + "em", abl: stem + "e", voc: term.voc || stem + "ex", loc: term.loc };
                }
                if (term.substring(term.length - 2) === "is") {
                    const stem = term.substring(0, term.length - 2);
                    return { nom: stem + "is", gen: stem + "is", dat: stem + "ī", acc: stem + "em", abl: stem + "e", voc: term.voc || stem + "is", loc: term.loc };
                }
                if (term.substring(term.length - 2) === "or") {
                    const stem = term.substring(0, term.length - 2);
                    return { nom: stem + "or", gen: stem + "ōris", dat: stem + "ōrī", acc: stem + "ōrem", abl: stem + "ōre", voc: term.voc || stem + "or", loc: term.loc };
                }
                if (term.substring(term.length - 2) === "us") {
                    const stem = term.substring(0, term.length - 2);
                    return { nom: stem + "us", gen: stem + "oris", dat: stem + "orī", acc: stem + "us", abl: stem + "ore", voc: term.voc || stem + "us", loc: term.loc };
                }
                /* plural */
                if (term.substring(term.length - 2) === "ēs") {
                    const stem = term.substring(0, term.length - 2);
                    return { nom: stem + "ēs", gen: stem + "um", dat: stem + "ibus", acc: stem + "ēs", abl: stem + "ibus", voc: term.voc || stem + "ēs", loc: term.loc };
                }
                if (term.substring(term.length - 1) === "a") {
                    const stem = term.substring(0, term.length - 1);
                    return { nom: stem + "a", gen: stem + "um", dat: stem + "ibus", acc: stem + "a", abl: stem + "ibus", voc: term.voc || stem + "a", loc: term.loc };
                }
                return {};
            default:
                return {};
        }
    }

    React.useEffect(() => {
        if (props.showTargetLang) {
            setShowSourceLang(false);
            if (props.isSliding) {
                setShowTargetLang(true);
                setHideSourceLang(true);
                setTimeout(() => { setHideSourceLang(false); }, flipSpeed);
            }
            else {
                setTimeout(() => { setShowTargetLang(true); }, flipSpeed);
            }
        }
        else {
            setShowTargetLang(false);
            if (props.isSliding) {
                setShowSourceLang(true);
                setHideTargetLang(true);
                setTimeout(() => { setHideTargetLang(false); }, flipSpeed);
            }
            else {
                setTimeout(() => { setShowSourceLang(true); }, flipSpeed);
            }
        }
    }, [props.showTargetLang]);

    return (
        <div className={"flash-card-container " + props.slideClass}>
            <div className="flash-card-clickable">
                <div className={props.cardIndex <= 0 ? "hide-clickable" : ""} onClick={props.decCardIndex}></div>
                <div onClick={props.flip}></div>
                <div className={props.cardIndex >= props.deckLength - 1 ? "hide-clickable" : ""} onClick={props.incCardIndex}></div>
            </div>
            {!hideTargetLang && <div className={"flash-card-side flash-card-target-lang" + (showTargetLang ? " flash-card--show" : "")} data-language={appModes.TRG} data-number={(props.cardIndex + 1) + " of " + props.deckLength}>
                <p>{decline().nom}, {decline().gen}</p>
            </div>}
            {!hideSourceLang && <div className={"flash-card-side flash-card-source-lang" + (showSourceLang ? " flash-card--show" : "")} data-language={appModes.SRC} data-number={(props.cardIndex + 1) + " of " + props.deckLength}>
                <p>{props.cardData.src}</p>
            </div>}
        </div>
    );
}