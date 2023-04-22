import React, { useState } from "react";

function Challenge(props) {

    const [input, setInput] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setInput(value);
        props.onUpdate(value);
    }

    return <div className="mb-3">
        <label htmlFor={props.id} className="form-label">Vainqueur {props.name}<span className="sub-text"></span></label>
        <select name={props.id} id={props.id} className="form-select" value={input} onChange={handleChange}>
            <option disabled value="">Choisissez...</option>
            {props.queens.map(queen => <option key={queen} value={queen}>{queen}</option>)}
        </select>
    </div>
}

export default Challenge;