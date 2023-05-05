import "./Declension.scoped.css";

export default function Declension(props: any) {
    return (
        <div className={props.showDeclension ? "visible" : ""} onClick={props.hide}>
            <section className={"declension" + (props.showDeclension ? " visible" : "")} onClick={(evt) => {evt.stopPropagation();} }>
                <p className="declension-case declension-span-2">Decl. {props.card.dec} — Gndr. {props.card.gnd} — Num. {props.card.num}</p>
                <p className="declension-case">Nominative</p><p className="declension-inflection">{props.card.inf.nom}</p>
                <p className="declension-case">Genitive</p><p className="declension-inflection">{props.card.inf.gen}</p>
                <p className="declension-case">Dative</p><p className="declension-inflection">{props.card.inf.dat}</p>
                <p className="declension-case">Accusative</p><p className="declension-inflection">{props.card.inf.acc}</p>
                <p className="declension-case">Ablative</p><p className="declension-inflection">{props.card.inf.abl}</p>
                <p className="declension-case">Vocative</p><p className="declension-inflection">{props.card.inf.voc}</p>
                <p className="declension-case">Locative</p><p className="declension-inflection">{props.card.inf.loc || "—"}</p>
            </section>
        </div>
    );
}