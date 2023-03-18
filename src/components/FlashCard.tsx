import React from 'react';
import "./FlashCard.scoped.css";
import { appModes } from '../constants/Global';

export default function FlashCard(props: any) {
    const flipSpeed = props.flipSpeed;
    const [hideSourceLang, setHideSourceLang] = React.useState(false);
    const [hideTargetLang, setHideTargetLang] = React.useState(false);
    const [showSourceLang, setShowSourceLang] = React.useState(!props.showTargetLang);
    const [showTargetLang, setShowTargetLang] = React.useState(props.showTargetLang);

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
                <p>{props.cardData.trg}</p>
            </div>}
            {!hideSourceLang && <div className={"flash-card-side flash-card-source-lang" + (showSourceLang ? " flash-card--show" : "")} data-language={appModes.SRC} data-number={(props.cardIndex + 1) + " of " + props.deckLength}>
                <p>{props.cardData.src}</p>
            </div>}
        </div>
    );
}