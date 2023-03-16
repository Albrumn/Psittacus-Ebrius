import React from 'react';
import "./FlashCard.css";

export default function FlashCard(props: any) {
    const flipSpeed = props.flipSpeed;
    const sidesCount = 2;
    const [showFront, setShowFront] = React.useState(props.showFront);
    const [showBack, setShowBack] = React.useState(!props.showFront);

    React.useEffect(() => {
        if (props.showFront) {
            setShowBack(false);
            setTimeout(() => { setShowFront(true); }, flipSpeed);
        }
        else {
            setShowFront(false);
            setTimeout(() => { setShowBack(true); }, flipSpeed);
        }
    }, [props.showFront]);

    return (
        <div className="flash-card-container" onClick={props.onClick}>
            <div className={"flash-card-side flash-card-front" + (showFront ? " flash-card--show" : "")}>
                <p>{props.cardData[props.cardDataIndex]}</p>
            </div>
            <div className={"flash-card-side flash-card-back" + (showBack ? " flash-card--show" : "")}>
                <p>{props.cardData[(props.cardDataIndex + 1) % sidesCount]}</p>
            </div>
        </div>
    );
}