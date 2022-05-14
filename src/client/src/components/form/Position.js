import React from "react";

function Position(props) {
    const position = props.queens.length - props.index;
    const points = Math.pow(2, props.index);
    const message = props.message ? props.message : position + 'e place';
    return <div className="mb-3">
        <label htmlFor={'place' + position} className="form-label">{message} <span className="sub-text">{'(' + points + ' points)'}</span></label>
        <select name={'place-' + position} id={'place' + position} className="form-select" required value={props.value} onChange={props.onChange}>
            <option disabled value="">Choisissez...</option>
            {props.queens.map(queen => <option key={queen} value={queen}> {queen} </option>)}
        </select>
    </div>

}

export default Position;