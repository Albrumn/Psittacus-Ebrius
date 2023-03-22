import "./Declension.scoped.css";

export default function Declension(props: any) {
    return (
        <div onClick={props.hide}>
            <section className="declension">
                <p className="declension-case">Nominative</p><p className="declension-inflection">{props.term.nom}</p>
                <p className="declension-case">Genitive</p><p className="declension-inflection">{props.term.gen}</p>
                <p className="declension-case">Dative</p><p className="declension-inflection">{props.term.dat}</p>
                <p className="declension-case">Accusative</p><p className="declension-inflection">{props.term.acc}</p>
                <p className="declension-case">Ablative</p><p className="declension-inflection">{props.term.abl}</p>
                <p className="declension-case">Vocative</p><p className="declension-inflection">{props.term.voc}</p>
                <p className="declension-case">Locative</p><p className="declension-inflection">{props.term.loc || "—"}</p>
            </section>
        </div>
    );
}