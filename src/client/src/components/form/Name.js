import React, { useState } from "react";

function Name(props) {

    const [name, setName] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setName(value);
        props.onUpdate(value);
    }

    return <div className="mb-5">
        <label htmlFor="name" className="form-label h4">Prénom</label>
        <input type="text" className="form-control" id="name" name="name" placeholder="Ton petit prénom" required onChange={handleChange} value={name}/>
    </div>;
}

export default Name;