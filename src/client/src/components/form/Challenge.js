import React from "react";

function Challenge(props) {
    return <div className="mb-3">
        <label htmlFor={props.id} className="form-label">Vainqueur {props.name}<span className="sub-text"></span></label>
        <select name={props.id} id={props.id} className="form-select" value={props.value} onChange={props.onChange}>
            <option disabled value="">Choisissez...</option>
            {props.queens.map(queen => <option key={queen} value={queen}>{queen}</option>)}
        </select>
    </div>
}

export default Challenge;