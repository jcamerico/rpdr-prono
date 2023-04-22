import React, { useState } from "react";

function LipsyncAssassin(props) {
    const position = props.index;
    
    const [input, setInput] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setInput(value);
        props.onUpdate(value);
    }

    return <div className="mb-3">
        <label htmlFor={'lipsync' + position} className="form-label">{'Lipsync Assassin #' + (position + 1)}</label>
        <input type="text" id={'lipsync' + position} className="form-control" name={'lipsync-' + position} value={input} onChange={handleChange}></input>
    </div>
}

export default LipsyncAssassin;