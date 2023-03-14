export default function FlashCard(props: any) {
    const sidesCount = 2;

    return (
        <div className="flash-card">
            <p className={"flash-card-front" + (props.showBack ? "" : " flash-card-side--show")}>
                {props.cardData[props.cardDataIndex]}
            </p>
            <p className={"flash-card-back" + (props.showBack ? " flash-card-side--show" : "")}>
                {props.cardData[(props.cardDataIndex + 1) % sidesCount]}
            </p>
        </div>
    );
}