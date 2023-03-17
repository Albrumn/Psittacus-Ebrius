import React from 'react';
import "./FlashCard.scoped.css";
import { appModes } from '../contants/Global';

export default function FlashCard(props: any) {
    const flipSpeed = props.flipSpeed;
    const [showTargetLang, setShowTargetLang] = React.useState(props.showTargetLang);
    const [showSourceLang, setShowSourceLang] = React.useState(!props.showTargetLang);

    React.useEffect(() => {
        if (props.showTargetLang) {
            setShowSourceLang(false);
            setTimeout(() => { setShowTargetLang(true); }, flipSpeed);
        }
        else {
            setShowTargetLang(false);
            setTimeout(() => { setShowSourceLang(true); }, flipSpeed);
        }
    }, [props.showTargetLang]);

    return (
        <div className={"flash-card-container " + props.slideClass} onClick={props.onClick}>
            <div className={"flash-card-side flash-card-target-lang" + (showTargetLang ? " flash-card--show" : "")} data-language={appModes.TRG} data-number={props.cardNumber}>
                <p>{props.cardData.trg}</p>
            </div>
            <div className={"flash-card-side flash-card-source-lang" + (showSourceLang ? " flash-card--show" : "")} data-language={appModes.SRC} data-number={props.cardNumber}>
                <p>{props.cardData.src}</p>
            </div>
        </div>
    );
}